package com.wishcrate.dto;

public class AdminStatsDTO {
    private long totalProducts;
    private long totalOrders;
    private long totalUsers;
    private long totalCategories;
    private long activeProducts;
    private long pendingOrders;
    
    public AdminStatsDTO() {
    }
    
    public AdminStatsDTO(long totalProducts, long totalOrders, long totalUsers, long totalCategories, long activeProducts, long pendingOrders) {
        this.totalProducts = totalProducts;
        this.totalOrders = totalOrders;
        this.totalUsers = totalUsers;
        this.totalCategories = totalCategories;
        this.activeProducts = activeProducts;
        this.pendingOrders = pendingOrders;
    }
    
    public long getTotalProducts() {
        return totalProducts;
    }
    
    public void setTotalProducts(long totalProducts) {
        this.totalProducts = totalProducts;
    }
    
    public long getTotalOrders() {
        return totalOrders;
    }
    
    public void setTotalOrders(long totalOrders) {
        this.totalOrders = totalOrders;
    }
    
    public long getTotalUsers() {
        return totalUsers;
    }
    
    public void setTotalUsers(long totalUsers) {
        this.totalUsers = totalUsers;
    }
    
    public long getTotalCategories() {
        return totalCategories;
    }
    
    public void setTotalCategories(long totalCategories) {
        this.totalCategories = totalCategories;
    }
    
    public long getActiveProducts() {
        return activeProducts;
    }
    
    public void setActiveProducts(long activeProducts) {
        this.activeProducts = activeProducts;
    }
    
    public long getPendingOrders() {
        return pendingOrders;
    }
    
    public void setPendingOrders(long pendingOrders) {
        this.pendingOrders = pendingOrders;
    }
}
