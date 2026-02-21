package com.wishcrate.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.CollectionTable;
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
import jakarta.persistence.MapKeyColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "products")
@EntityListeners(AuditingEntityListener.class)
public class Product {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    @Column(length = 2000)
    private String description;
    
    @Column(nullable = false)
    private BigDecimal price;
    
    private BigDecimal discountPrice;
    
    @Column(nullable = false)
    private Integer stockQuantity;
    
    private String brand;
    
    @ElementCollection
    private List<String> images = new ArrayList<>();
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;
    
    @JsonIgnore
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    private List<Review> reviews = new ArrayList<>();
    
    @Column(nullable = false)
    private Double averageRating = 0.0;
    
    @Column(nullable = false)
    private Integer totalReviews = 0;
    
    private String sku;
    
    @ElementCollection
    @CollectionTable(name = "product_specifications", joinColumns = @JoinColumn(name = "product_id"))
    @MapKeyColumn(name = "spec_key")
    @Column(name = "spec_value")
    private java.util.Map<String, String> specifications = new java.util.HashMap<>();
    
    private boolean featured = false;
    
    private boolean active = true;

    private String imageUrl;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seller_id")
    private User seller;
    
    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime createdAt;
    
    @LastModifiedDate
    private LocalDateTime updatedAt;
    
    // Constructors
    public Product() {
        this.images = new ArrayList<>();
        this.reviews = new ArrayList<>();
        this.averageRating = 0.0;
        this.totalReviews = 0;
        this.specifications = new java.util.HashMap<>();
        this.featured = false;
        this.active = true;
    }
    
    public Product(Long id, String name, String description, BigDecimal price, BigDecimal discountPrice,
                   Integer stockQuantity, String brand, List<String> images, Category category,
                   List<Review> reviews, Double averageRating, Integer totalReviews, String sku,
                   java.util.Map<String, String> specifications, boolean featured, boolean active,
                   User seller, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.discountPrice = discountPrice;
        this.stockQuantity = stockQuantity;
        this.brand = brand;
        this.images = images != null ? images : new ArrayList<>();
        this.category = category;
        this.reviews = reviews != null ? reviews : new ArrayList<>();
        this.averageRating = averageRating != null ? averageRating : 0.0;
        this.totalReviews = totalReviews != null ? totalReviews : 0;
        this.sku = sku;
        this.specifications = specifications != null ? specifications : new java.util.HashMap<>();
        this.featured = featured;
        this.active = active;
        this.seller = seller;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }
    
    public BigDecimal getDiscountPrice() { return discountPrice; }
    public void setDiscountPrice(BigDecimal discountPrice) { this.discountPrice = discountPrice; }
    
    public Integer getStockQuantity() { return stockQuantity; }
    public void setStockQuantity(Integer stockQuantity) { this.stockQuantity = stockQuantity; }
    
    public String getBrand() { return brand; }
    public void setBrand(String brand) { this.brand = brand; }
    
    public List<String> getImages() { return images; }
    public void setImages(List<String> images) { this.images = images; }
    
    public Category getCategory() { return category; }
    public void setCategory(Category category) { this.category = category; }
    
    public List<Review> getReviews() { return reviews; }
    public void setReviews(List<Review> reviews) { this.reviews = reviews; }
    
    public Double getAverageRating() { return averageRating; }
    public void setAverageRating(Double averageRating) { this.averageRating = averageRating; }
    
    public Integer getTotalReviews() { return totalReviews; }
    public void setTotalReviews(Integer totalReviews) { this.totalReviews = totalReviews; }
    
    public String getSku() { return sku; }
    public void setSku(String sku) { this.sku = sku; }
    
    public java.util.Map<String, String> getSpecifications() { return specifications; }
    public void setSpecifications(java.util.Map<String, String> specifications) { this.specifications = specifications; }
    
    public boolean isFeatured() { return featured; }
    public void setFeatured(boolean featured) { this.featured = featured; }
    
    public boolean isActive() { return active; }
    public void setActive(boolean active) { this.active = active; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    
    public User getSeller() { return seller; }
    public void setSeller(User seller) { this.seller = seller; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
    
    // Builder Pattern
    public static ProductBuilder builder() {
        return new ProductBuilder();
    }
    
    public static class ProductBuilder {
        private Long id;
        private String name;
        private String description;
        private BigDecimal price;
        private BigDecimal discountPrice;
        private Integer stockQuantity;
        private String brand;
        private List<String> images = new ArrayList<>();
        private Category category;
        private List<Review> reviews = new ArrayList<>();
        private Double averageRating = 0.0;
        private Integer totalReviews = 0;
        private String sku;
        private java.util.Map<String, String> specifications = new java.util.HashMap<>();
        private boolean featured = false;
        private boolean active = true;
        private String imageUrl;
        private User seller;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;
        
        public ProductBuilder id(Long id) { this.id = id; return this; }
        public ProductBuilder name(String name) { this.name = name; return this; }
        public ProductBuilder description(String description) { this.description = description; return this; }
        public ProductBuilder price(BigDecimal price) { this.price = price; return this; }
        public ProductBuilder discountPrice(BigDecimal discountPrice) { this.discountPrice = discountPrice; return this; }
        public ProductBuilder stockQuantity(Integer stockQuantity) { this.stockQuantity = stockQuantity; return this; }
        public ProductBuilder brand(String brand) { this.brand = brand; return this; }
        public ProductBuilder images(List<String> images) { this.images = images; return this; }
        public ProductBuilder category(Category category) { this.category = category; return this; }
        public ProductBuilder reviews(List<Review> reviews) { this.reviews = reviews; return this; }
        public ProductBuilder averageRating(Double averageRating) { this.averageRating = averageRating; return this; }
        public ProductBuilder totalReviews(Integer totalReviews) { this.totalReviews = totalReviews; return this; }
        public ProductBuilder sku(String sku) { this.sku = sku; return this; }
        public ProductBuilder specifications(java.util.Map<String, String> specifications) { this.specifications = specifications; return this; }
        public ProductBuilder featured(boolean featured) { this.featured = featured; return this; }
        public ProductBuilder active(boolean active) { this.active = active; return this; }
        public ProductBuilder imageUrl(String imageUrl) { this.imageUrl = imageUrl; return this; }
        public ProductBuilder seller(User seller) { this.seller = seller; return this; }
        public ProductBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }
        public ProductBuilder updatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; return this; }
        
        public Product build() {
            Product p = new Product(id, name, description, price, discountPrice, stockQuantity, brand,
                             images, category, reviews, averageRating, totalReviews, sku,
                             specifications, featured, active, seller, createdAt, updatedAt);
            p.setImageUrl(imageUrl);
            return p;
        }
    }
}
