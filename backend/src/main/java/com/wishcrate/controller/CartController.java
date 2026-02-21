package com.wishcrate.controller;

import com.wishcrate.dto.CartDTO;
import com.wishcrate.service.CartService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
public class CartController {
    
    private final CartService cartService;
    
    public CartController(CartService cartService) {
        this.cartService = cartService;
    }
    
    @GetMapping
    public ResponseEntity<CartDTO> getCart() {
        return ResponseEntity.ok(cartService.getCart());
    }
    
    @PostMapping("/add")
    public ResponseEntity<CartDTO> addToCart(
            @RequestParam Long productId,
            @RequestParam Integer quantity) {
        return ResponseEntity.ok(cartService.addToCart(productId, quantity));
    }
    
    @PutMapping("/update/{cartItemId}")
    public ResponseEntity<CartDTO> updateCartItem(
            @PathVariable Long cartItemId,
            @RequestParam Integer quantity) {
        return ResponseEntity.ok(cartService.updateCartItem(cartItemId, quantity));
    }
    
    @DeleteMapping("/remove/{cartItemId}")
    public ResponseEntity<Void> removeFromCart(@PathVariable Long cartItemId) {
        cartService.removeFromCart(cartItemId);
        return ResponseEntity.ok().build();
    }
    
    @DeleteMapping("/clear")
    public ResponseEntity<Void> clearCart() {
        cartService.clearCart();
        return ResponseEntity.ok().build();
    }
}
