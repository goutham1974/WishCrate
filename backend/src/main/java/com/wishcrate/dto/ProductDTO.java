package com.wishcrate.dto;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

public class ProductDTO {
    private Long id;
    private String name;
    private String description;
    private BigDecimal price;
    private BigDecimal discountPrice;
    private Integer stockQuantity;
    private String brand;
    private List<String> images;
    private Long categoryId;
    private String categoryName;
    private Double averageRating;
    private Integer totalReviews;
    private String sku;
    private Map<String, String> specifications;
    private boolean featured;
    private boolean active;
    private String imageUrl;

    public ProductDTO() {}

    public static ProductDTOBuilder builder() {
        return new ProductDTOBuilder();
    }

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

    public Long getCategoryId() { return categoryId; }
    public void setCategoryId(Long categoryId) { this.categoryId = categoryId; }

    public String getCategoryName() { return categoryName; }
    public void setCategoryName(String categoryName) { this.categoryName = categoryName; }

    public Double getAverageRating() { return averageRating; }
    public void setAverageRating(Double averageRating) { this.averageRating = averageRating; }

    public Integer getTotalReviews() { return totalReviews; }
    public void setTotalReviews(Integer totalReviews) { this.totalReviews = totalReviews; }

    public String getSku() { return sku; }
    public void setSku(String sku) { this.sku = sku; }

    public Map<String, String> getSpecifications() { return specifications; }
    public void setSpecifications(Map<String, String> specifications) { this.specifications = specifications; }

    public boolean isFeatured() { return featured; }
    public void setFeatured(boolean featured) { this.featured = featured; }

    public boolean isActive() { return active; }
    public void setActive(boolean active) { this.active = active; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public static class ProductDTOBuilder {
        private Long id;
        private String name;
        private String description;
        private BigDecimal price;
        private BigDecimal discountPrice;
        private Integer stockQuantity;
        private String brand;
        private List<String> images;
        private Long categoryId;
        private String categoryName;
        private Double averageRating;
        private Integer totalReviews;
        private String sku;
        private Map<String, String> specifications;
        private boolean featured;
        private boolean active;
        private String imageUrl;

        public ProductDTOBuilder id(Long id) { this.id = id; return this; }
        public ProductDTOBuilder name(String name) { this.name = name; return this; }
        public ProductDTOBuilder description(String description) { this.description = description; return this; }
        public ProductDTOBuilder price(BigDecimal price) { this.price = price; return this; }
        public ProductDTOBuilder discountPrice(BigDecimal discountPrice) { this.discountPrice = discountPrice; return this; }
        public ProductDTOBuilder stockQuantity(Integer stockQuantity) { this.stockQuantity = stockQuantity; return this; }
        public ProductDTOBuilder brand(String brand) { this.brand = brand; return this; }
        public ProductDTOBuilder images(List<String> images) { this.images = images; return this; }
        public ProductDTOBuilder categoryId(Long categoryId) { this.categoryId = categoryId; return this; }
        public ProductDTOBuilder categoryName(String categoryName) { this.categoryName = categoryName; return this; }
        public ProductDTOBuilder averageRating(Double averageRating) { this.averageRating = averageRating; return this; }
        public ProductDTOBuilder totalReviews(Integer totalReviews) { this.totalReviews = totalReviews; return this; }
        public ProductDTOBuilder sku(String sku) { this.sku = sku; return this; }
        public ProductDTOBuilder specifications(Map<String, String> specifications) { this.specifications = specifications; return this; }
        public ProductDTOBuilder featured(boolean featured) { this.featured = featured; return this; }
        public ProductDTOBuilder active(boolean active) { this.active = active; return this; }
        public ProductDTOBuilder imageUrl(String imageUrl) { this.imageUrl = imageUrl; return this; }

        public ProductDTO build() {
            ProductDTO dto = new ProductDTO();
            dto.id = this.id;
            dto.name = this.name;
            dto.description = this.description;
            dto.price = this.price;
            dto.discountPrice = this.discountPrice;
            dto.stockQuantity = this.stockQuantity;
            dto.brand = this.brand;
            dto.images = this.images;
            dto.categoryId = this.categoryId;
            dto.categoryName = this.categoryName;
            dto.averageRating = this.averageRating;
            dto.totalReviews = this.totalReviews;
            dto.sku = this.sku;
            dto.specifications = this.specifications;
            dto.featured = this.featured;
            dto.active = this.active;
            dto.imageUrl = this.imageUrl;
            return dto;
        }
    }
}
