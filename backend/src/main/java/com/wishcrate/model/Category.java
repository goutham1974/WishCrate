package com.wishcrate.model;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "categories")
public class Category {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, unique = true)
    private String name;
    
    private String description;
    
    private String imageUrl;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    private Category parent;
    
    @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL)
    private List<Category> subCategories = new ArrayList<>();
    
    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
    private List<Product> products = new ArrayList<>();
    
    // Constructors
    public Category() {
        this.subCategories = new ArrayList<>();
        this.products = new ArrayList<>();
    }
    
    public Category(Long id, String name, String description, String imageUrl, 
                   Category parent, List<Category> subCategories, List<Product> products) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
        this.parent = parent;
        this.subCategories = subCategories != null ? subCategories : new ArrayList<>();
        this.products = products != null ? products : new ArrayList<>();
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    
    public Category getParent() { return parent; }
    public void setParent(Category parent) { this.parent = parent; }
    
    public List<Category> getSubCategories() { return subCategories; }
    public void setSubCategories(List<Category> subCategories) { this.subCategories = subCategories; }
    
    public List<Product> getProducts() { return products; }
    public void setProducts(List<Product> products) { this.products = products; }
    
    // Builder Pattern
    public static CategoryBuilder builder() {
        return new CategoryBuilder();
    }
    
    public static class CategoryBuilder {
        private Long id;
        private String name;
        private String description;
        private String imageUrl;
        private Category parent;
        private List<Category> subCategories = new ArrayList<>();
        private List<Product> products = new ArrayList<>();
        
        public CategoryBuilder id(Long id) { this.id = id; return this; }
        public CategoryBuilder name(String name) { this.name = name; return this; }
        public CategoryBuilder description(String description) { this.description = description; return this; }
        public CategoryBuilder imageUrl(String imageUrl) { this.imageUrl = imageUrl; return this; }
        public CategoryBuilder parent(Category parent) { this.parent = parent; return this; }
        public CategoryBuilder subCategories(List<Category> subCategories) { this.subCategories = subCategories; return this; }
        public CategoryBuilder products(List<Product> products) { this.products = products; return this; }
        
        public Category build() {
            return new Category(id, name, description, imageUrl, parent, subCategories, products);
        }
    }
}
