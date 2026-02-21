package com.wishcrate.dto;

import java.math.BigDecimal;

public class CartItemDTO {
    private Long id;
    private Long productId;
    private String productName;
    private String productImage;
    private BigDecimal price;
    private Integer quantity;
    private BigDecimal subtotal;

    public CartItemDTO() {}

    public static CartItemDTOBuilder builder() {
        return new CartItemDTOBuilder();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getProductId() { return productId; }
    public void setProductId(Long productId) { this.productId = productId; }

    public String getProductName() { return productName; }
    public void setProductName(String productName) { this.productName = productName; }

    public String getProductImage() { return productImage; }
    public void setProductImage(String productImage) { this.productImage = productImage; }

    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }

    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }

    public BigDecimal getSubtotal() { return subtotal; }
    public void setSubtotal(BigDecimal subtotal) { this.subtotal = subtotal; }

    public static class CartItemDTOBuilder {
        private Long id;
        private Long productId;
        private String productName;
        private String productImage;
        private BigDecimal price;
        private Integer quantity;
        private BigDecimal subtotal;

        public CartItemDTOBuilder id(Long id) { this.id = id; return this; }
        public CartItemDTOBuilder productId(Long productId) { this.productId = productId; return this; }
        public CartItemDTOBuilder productName(String productName) { this.productName = productName; return this; }
        public CartItemDTOBuilder productImage(String productImage) { this.productImage = productImage; return this; }
        public CartItemDTOBuilder price(BigDecimal price) { this.price = price; return this; }
        public CartItemDTOBuilder quantity(Integer quantity) { this.quantity = quantity; return this; }
        public CartItemDTOBuilder subtotal(BigDecimal subtotal) { this.subtotal = subtotal; return this; }

        public CartItemDTO build() {
            CartItemDTO dto = new CartItemDTO();
            dto.id = this.id;
            dto.productId = this.productId;
            dto.productName = this.productName;
            dto.productImage = this.productImage;
            dto.price = this.price;
            dto.quantity = this.quantity;
            dto.subtotal = this.subtotal;
            return dto;
        }
    }
}
