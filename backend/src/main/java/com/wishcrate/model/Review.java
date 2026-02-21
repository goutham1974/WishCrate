package com.wishcrate.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "reviews")
@EntityListeners(AuditingEntityListener.class)
public class Review {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private Product product;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
    
    @Column(nullable = false)
    private Integer rating; // 1-5 stars
    
    @Column(length = 1000)
    private String comment;
    
    @ElementCollection
    private List<String> images = new ArrayList<>();
    
    private boolean verified = false; // Verified purchase
    
    private Integer helpfulCount = 0;
    
    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime createdAt;
    
    // Constructors
    public Review() {
        this.images = new ArrayList<>();
        this.verified = false;
        this.helpfulCount = 0;
    }
    
    public Review(Long id, Product product, User user, Integer rating, String comment,
                 List<String> images, boolean verified, Integer helpfulCount, LocalDateTime createdAt) {
        this.id = id;
        this.product = product;
        this.user = user;
        this.rating = rating;
        this.comment = comment;
        this.images = images != null ? images : new ArrayList<>();
        this.verified = verified;
        this.helpfulCount = helpfulCount != null ? helpfulCount : 0;
        this.createdAt = createdAt;
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public Product getProduct() { return product; }
    public void setProduct(Product product) { this.product = product; }
    
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    
    public Integer getRating() { return rating; }
    public void setRating(Integer rating) { this.rating = rating; }
    
    public String getComment() { return comment; }
    public void setComment(String comment) { this.comment = comment; }
    
    public List<String> getImages() { return images; }
    public void setImages(List<String> images) { this.images = images; }
    
    public boolean isVerified() { return verified; }
    public void setVerified(boolean verified) { this.verified = verified; }
    
    public Integer getHelpfulCount() { return helpfulCount; }
    public void setHelpfulCount(Integer helpfulCount) { this.helpfulCount = helpfulCount; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    // Builder Pattern
    public static ReviewBuilder builder() {
        return new ReviewBuilder();
    }
    
    public static class ReviewBuilder {
        private Long id;
        private Product product;
        private User user;
        private Integer rating;
        private String comment;
        private List<String> images = new ArrayList<>();
        private boolean verified = false;
        private Integer helpfulCount = 0;
        private LocalDateTime createdAt;
        
        public ReviewBuilder id(Long id) { this.id = id; return this; }
        public ReviewBuilder product(Product product) { this.product = product; return this; }
        public ReviewBuilder user(User user) { this.user = user; return this; }
        public ReviewBuilder rating(Integer rating) { this.rating = rating; return this; }
        public ReviewBuilder comment(String comment) { this.comment = comment; return this; }
        public ReviewBuilder images(List<String> images) { this.images = images; return this; }
        public ReviewBuilder verified(boolean verified) { this.verified = verified; return this; }
        public ReviewBuilder helpfulCount(Integer helpfulCount) { this.helpfulCount = helpfulCount; return this; }
        public ReviewBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }
        
        public Review build() {
            return new Review(id, product, user, rating, comment, images, verified, helpfulCount, createdAt);
        }
    }
}
