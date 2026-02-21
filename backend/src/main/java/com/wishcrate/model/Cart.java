package com.wishcrate.model;

import jakarta.persistence.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "carts")
@EntityListeners(AuditingEntityListener.class)
public class Cart {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
    
    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CartItem> items = new ArrayList<>();
    
    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime createdAt;
    
    @LastModifiedDate
    private LocalDateTime updatedAt;
    
    // Constructors
    public Cart() {
        this.items = new ArrayList<>();
    }
    
    public Cart(Long id, User user, List<CartItem> items, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.user = user;
        this.items = items != null ? items : new ArrayList<>();
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    
    public List<CartItem> getItems() { return items; }
    public void setItems(List<CartItem> items) { this.items = items; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
    
    // Builder Pattern
    public static CartBuilder builder() {
        return new CartBuilder();
    }
    
    public static class CartBuilder {
        private Long id;
        private User user;
        private List<CartItem> items = new ArrayList<>();
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;
        
        public CartBuilder id(Long id) { this.id = id; return this; }
        public CartBuilder user(User user) { this.user = user; return this; }
        public CartBuilder items(List<CartItem> items) { this.items = items; return this; }
        public CartBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }
        public CartBuilder updatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; return this; }
        
        public Cart build() {
            return new Cart(id, user, items, createdAt, updatedAt);
        }
    }
}
