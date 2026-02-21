package com.wishcrate.service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.wishcrate.model.Cart;
import com.wishcrate.model.CartItem;
import com.wishcrate.model.Order;
import com.wishcrate.model.OrderItem;
import com.wishcrate.model.Product;
import com.wishcrate.model.ShippingAddress;
import com.wishcrate.model.User;
import com.wishcrate.repository.AddressRepository;
import com.wishcrate.repository.CartRepository;
import com.wishcrate.repository.OrderRepository;
import com.wishcrate.repository.ProductRepository;
import com.wishcrate.repository.UserRepository;

@Service
public class OrderService {
    
    private final OrderRepository orderRepository;
    private final CartRepository cartRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final AddressRepository addressRepository;
    
    public OrderService(OrderRepository orderRepository, CartRepository cartRepository, 
                       ProductRepository productRepository, UserRepository userRepository, 
                       AddressRepository addressRepository) {
        this.orderRepository = orderRepository;
        this.cartRepository = cartRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
        this.addressRepository = addressRepository;
    }
    
    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
    
    @Transactional
    public Order createOrder(Map<String, String> shippingData, Order.PaymentMethod paymentMethod) {
        User user = getCurrentUser();
        Cart cart = cartRepository.findByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException("Cart not found"));
        
        if (cart.getItems().isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }
        
        // Build shipping address directly from provided data
        ShippingAddress shippingAddress = new ShippingAddress();
        shippingAddress.setFullName(shippingData.getOrDefault("fullName", ""));
        shippingAddress.setPhoneNumber(shippingData.getOrDefault("phoneNumber", ""));
        shippingAddress.setAddressLine1(shippingData.getOrDefault("addressLine1", ""));
        shippingAddress.setAddressLine2(shippingData.getOrDefault("addressLine2", ""));
        shippingAddress.setCity(shippingData.getOrDefault("city", ""));
        shippingAddress.setState(shippingData.getOrDefault("state", ""));
        shippingAddress.setCountry(shippingData.getOrDefault("country", ""));
        shippingAddress.setZipCode(shippingData.getOrDefault("zipCode", ""));
        
        // Calculate totals
        BigDecimal subtotal = BigDecimal.ZERO;
        List<OrderItem> orderItems = new ArrayList<>();
        
        for (CartItem cartItem : cart.getItems()) {
            Product product = cartItem.getProduct();
            
            if (product.getStockQuantity() < cartItem.getQuantity()) {
                throw new RuntimeException("Insufficient stock for product: " + product.getName());
            }
            
            BigDecimal itemSubtotal = cartItem.getPrice().multiply(new BigDecimal(cartItem.getQuantity()));
            subtotal = subtotal.add(itemSubtotal);
            
            OrderItem orderItem = OrderItem.builder()
                    .product(product)
                    .quantity(cartItem.getQuantity())
                    .price(cartItem.getPrice())
                    .subtotal(itemSubtotal)
                    .build();
            orderItems.add(orderItem);
            
            // Update stock
            product.setStockQuantity(product.getStockQuantity() - cartItem.getQuantity());
            productRepository.save(product);
        }
        
        BigDecimal tax = subtotal.multiply(new BigDecimal("0.1")); // 10% tax
        BigDecimal shippingCost = new BigDecimal("10.00");
        BigDecimal totalAmount = subtotal.add(tax).add(shippingCost);
        
        // Create order
        Order order = Order.builder()
                .orderNumber(generateOrderNumber())
                .user(user)
                .subtotal(subtotal)
                .tax(tax)
                .shippingCost(shippingCost)
                .totalAmount(totalAmount)
                .status(Order.OrderStatus.PENDING)
                .paymentStatus(Order.PaymentStatus.PENDING)
                .paymentMethod(paymentMethod)
                .shippingAddress(shippingAddress)
                .billingAddress(shippingAddress)
                .estimatedDeliveryDate(LocalDateTime.now().plusDays(7))
                .build();
        
        Order savedOrder = orderRepository.save(order);
        
        // Add order items
        for (OrderItem orderItem : orderItems) {
            orderItem.setOrder(savedOrder);
        }
        savedOrder.setOrderItems(orderItems);
        orderRepository.save(savedOrder);
        
        // Clear cart
        cart.getItems().clear();
        cartRepository.save(cart);
        
        return savedOrder;
    }
    
    public Page<Order> getUserOrders(Pageable pageable) {
        User user = getCurrentUser();
        return orderRepository.findByUserId(user.getId(), pageable);
    }
    
    public Order getOrderById(Long orderId) {
        User user = getCurrentUser();
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        
        if (!order.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized access to order");
        }
        
        return order;
    }
    
    @Transactional
    public Order updateOrderStatus(Long orderId, Order.OrderStatus status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        
        order.setStatus(status);
        
        if (status == Order.OrderStatus.DELIVERED) {
            order.setDeliveredDate(LocalDateTime.now());
        }
        
        return orderRepository.save(order);
    }
    
    @Transactional
    public Order cancelOrder(Long orderId) {
        User user = getCurrentUser();
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        
        if (!order.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized access to order");
        }
        
        if (order.getStatus() != Order.OrderStatus.PENDING && 
            order.getStatus() != Order.OrderStatus.CONFIRMED) {
            throw new RuntimeException("Cannot cancel order in current status");
        }
        
        order.setStatus(Order.OrderStatus.CANCELLED);
        
        // Restore stock
        for (OrderItem item : order.getOrderItems()) {
            Product product = item.getProduct();
            product.setStockQuantity(product.getStockQuantity() + item.getQuantity());
            productRepository.save(product);
        }
        
        return orderRepository.save(order);
    }
    
    private String generateOrderNumber() {
        return "WC" + System.currentTimeMillis() + "-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }
}
