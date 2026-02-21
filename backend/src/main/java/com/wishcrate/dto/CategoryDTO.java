package com.wishcrate.dto;

public class CategoryDTO {
    private Long id;
    private String name;
    private String description;
    private String imageUrl;
    private Long parentId;
    private String parentName;
    
    public CategoryDTO() {
    }
    
    public CategoryDTO(Long id, String name, String description, String imageUrl, Long parentId, String parentName) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
        this.parentId = parentId;
        this.parentName = parentName;
    }
    
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public String getImageUrl() {
        return imageUrl;
    }
    
    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
    
    public Long getParentId() {
        return parentId;
    }
    
    public void setParentId(Long parentId) {
        this.parentId = parentId;
    }
    
    public String getParentName() {
        return parentName;
    }
    
    public void setParentName(String parentName) {
        this.parentName = parentName;
    }
}
