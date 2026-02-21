package com.wishcrate.service;

import com.wishcrate.dto.CartDTO;
import com.wishcrate.dto.CartItemDTO;
import com.wishcrate.model.Cart;
import com.wishcrate.model.CartItem;
import com.wishcrate.model.Product;
import com.wishcrate.model.User;
import com.wishcrate.repository.CartRepository;
import com.wishcrate.repository.ProductRepository;
import com.wishcrate.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CartService {
    
    private final CartRepository cartRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    
    public CartService(CartRepository cartRepository, ProductRepository productRepository, UserRepository userRepository) {
        this.cartRepository = cartRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }
    
    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
    
    public CartDTO getCart() {
        User user = getCurrentUser();
        Cart cart = cartRepository.findByUserId(user.getId())
                .orElseGet(() -> {
                    Cart newCart = Cart.builder().user(user).build();
                    return cartRepository.save(newCart);
                });
        return convertToDTO(cart);
    }
    
    @Transactional
    public CartDTO addToCart(Long productId, Integer quantity) {
        User user = getCurrentUser();
        Cart cart = cartRepository.findByUserId(user.getId())
                .orElseGet(() -> {
                    Cart newCart = Cart.builder().user(user).build();
                    return cartRepository.save(newCart);
                });
        
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        
        if (product.getStockQuantity() < quantity) {
            throw new RuntimeException("Insufficient stock");
        }
        
        // Check if product already in cart
        CartItem existingItem = cart.getItems().stream()
                .filter(item -> item.getProduct().getId().equals(productId))
                .findFirst()
                .orElse(null);
        
        if (existingItem != null) {
            existingItem.setQuantity(existingItem.getQuantity() + quantity);
        } else {
            BigDecimal price = product.getDiscountPrice() != null ? 
                    product.getDiscountPrice() : product.getPrice();
            
            CartItem newItem = CartItem.builder()
                    .cart(cart)
                    .product(product)
                    .quantity(quantity)
                    .price(price)
                    .build();
            cart.getItems().add(newItem);
        }
        
        Cart savedCart = cartRepository.save(cart);
        return convertToDTO(savedCart);
    }
    
    @Transactional
    public CartDTO updateCartItem(Long cartItemId, Integer quantity) {
        User user = getCurrentUser();
        Cart cart = cartRepository.findByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException("Cart not found"));
        
        CartItem cartItem = cart.getItems().stream()
                .filter(item -> item.getId().equals(cartItemId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Cart item not found"));
        
        if (quantity <= 0) {
            cart.getItems().remove(cartItem);
        } else {
            if (cartItem.getProduct().getStockQuantity() < quantity) {
                throw new RuntimeException("Insufficient stock");
            }
            cartItem.setQuantity(quantity);
        }
        
        Cart savedCart = cartRepository.save(cart);
        return convertToDTO(savedCart);
    }
    
    @Transactional
    public void removeFromCart(Long cartItemId) {
        User user = getCurrentUser();
        Cart cart = cartRepository.findByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException("Cart not found"));
        
        cart.getItems().removeIf(item -> item.getId().equals(cartItemId));
        cartRepository.save(cart);
    }
    
    @Transactional
    public void clearCart() {
        User user = getCurrentUser();
        Cart cart = cartRepository.findByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException("Cart not found"));
        
        cart.getItems().clear();
        cartRepository.save(cart);
    }
    
    private CartDTO convertToDTO(Cart cart) {
        List<CartItemDTO> itemDTOs = cart.getItems().stream()
                .map(this::convertItemToDTO)
                .collect(Collectors.toList());
        
        BigDecimal totalAmount = itemDTOs.stream()
                .map(CartItemDTO::getSubtotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        
        Integer totalItems = itemDTOs.stream()
                .mapToInt(CartItemDTO::getQuantity)
                .sum();
        
        return CartDTO.builder()
                .id(cart.getId())
                .items(itemDTOs)
                .totalAmount(totalAmount)
                .totalItems(totalItems)
                .build();
    }
    
    private CartItemDTO convertItemToDTO(CartItem item) {
        BigDecimal subtotal = item.getPrice().multiply(new BigDecimal(item.getQuantity()));
        
        return CartItemDTO.builder()
                .id(item.getId())
                .productId(item.getProduct().getId())
                .productName(item.getProduct().getName())
                .productImage(item.getProduct().getImages().isEmpty() ? null : item.getProduct().getImages().get(0))
                .price(item.getPrice())
                .quantity(item.getQuantity())
                .subtotal(subtotal)
                .build();
    }
}
