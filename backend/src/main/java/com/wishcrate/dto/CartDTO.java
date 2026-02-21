package com.wishcrate.dto;

import java.math.BigDecimal;
import java.util.List;

public class CartDTO {
    private Long id;
    private List<CartItemDTO> items;
    private BigDecimal totalAmount;
    private Integer totalItems;

    public CartDTO() {}

    public static CartDTOBuilder builder() {
        return new CartDTOBuilder();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public List<CartItemDTO> getItems() { return items; }
    public void setItems(List<CartItemDTO> items) { this.items = items; }

    public BigDecimal getTotalAmount() { return totalAmount; }
    public void setTotalAmount(BigDecimal totalAmount) { this.totalAmount = totalAmount; }

    public Integer getTotalItems() { return totalItems; }
    public void setTotalItems(Integer totalItems) { this.totalItems = totalItems; }

    public static class CartDTOBuilder {
        private Long id;
        private List<CartItemDTO> items;
        private BigDecimal totalAmount;
        private Integer totalItems;

        public CartDTOBuilder id(Long id) { this.id = id; return this; }
        public CartDTOBuilder items(List<CartItemDTO> items) { this.items = items; return this; }
        public CartDTOBuilder totalAmount(BigDecimal totalAmount) { this.totalAmount = totalAmount; return this; }
        public CartDTOBuilder totalItems(Integer totalItems) { this.totalItems = totalItems; return this; }

        public CartDTO build() {
            CartDTO dto = new CartDTO();
            dto.id = this.id;
            dto.items = this.items;
            dto.totalAmount = this.totalAmount;
            dto.totalItems = this.totalItems;
            return dto;
        }
    }
}
