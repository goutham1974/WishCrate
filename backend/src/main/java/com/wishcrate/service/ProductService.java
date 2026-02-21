package com.wishcrate.service;

import com.wishcrate.dto.ProductDTO;
import com.wishcrate.model.Category;
import com.wishcrate.model.Product;
import com.wishcrate.repository.CategoryRepository;
import com.wishcrate.repository.ProductRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {
    
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    
    public ProductService(ProductRepository productRepository, CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }
    
    public Page<ProductDTO> getAllProducts(Pageable pageable) {
        return productRepository.findByActiveTrue(pageable)
                .map(this::convertToDTO);
    }
    
    public Page<ProductDTO> getProductsByCategory(Long categoryId, Pageable pageable) {
        return productRepository.findByCategoryIdAndActiveTrue(categoryId, pageable)
                .map(this::convertToDTO);
    }
    
    public Page<ProductDTO> searchProducts(String keyword, Pageable pageable) {
        return productRepository.searchProducts(keyword, pageable)
                .map(this::convertToDTO);
    }
    
    public Page<ProductDTO> getProductsByPriceRange(BigDecimal minPrice, BigDecimal maxPrice, Pageable pageable) {
        return productRepository.findByPriceRange(minPrice, maxPrice, pageable)
                .map(this::convertToDTO);
    }
    
    public List<ProductDTO> getFeaturedProducts() {
        return productRepository.findByFeaturedTrueAndActiveTrue()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public ProductDTO getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        return convertToDTO(product);
    }
    
    @Transactional
    public ProductDTO createProduct(ProductDTO productDTO) {
        Category category = categoryRepository.findById(productDTO.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));
        
        Product product = Product.builder()
                .name(productDTO.getName())
                .description(productDTO.getDescription())
                .price(productDTO.getPrice())
                .discountPrice(productDTO.getDiscountPrice())
                .stockQuantity(productDTO.getStockQuantity())
                .brand(productDTO.getBrand())
                .images(productDTO.getImages())
                .category(category)
                .sku(productDTO.getSku())
                .specifications(productDTO.getSpecifications())
                .featured(productDTO.isFeatured())
                .active(true)
                .build();
        
        Product savedProduct = productRepository.save(product);
        return convertToDTO(savedProduct);
    }
    
    @Transactional
    public ProductDTO updateProduct(Long id, ProductDTO productDTO) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        
        if (productDTO.getCategoryId() != null) {
            Category category = categoryRepository.findById(productDTO.getCategoryId())
                    .orElseThrow(() -> new RuntimeException("Category not found"));
            product.setCategory(category);
        }
        
        product.setName(productDTO.getName());
        product.setDescription(productDTO.getDescription());
        product.setPrice(productDTO.getPrice());
        product.setDiscountPrice(productDTO.getDiscountPrice());
        product.setStockQuantity(productDTO.getStockQuantity());
        product.setBrand(productDTO.getBrand());
        product.setImages(productDTO.getImages());
        product.setSku(productDTO.getSku());
        product.setSpecifications(productDTO.getSpecifications());
        product.setFeatured(productDTO.isFeatured());
        
        Product updatedProduct = productRepository.save(product);
        return convertToDTO(updatedProduct);
    }
    
    @Transactional
    public void deleteProduct(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        product.setActive(false);
        productRepository.save(product);
    }
    
    private ProductDTO convertToDTO(Product product) {
        return ProductDTO.builder()
                .id(product.getId())
                .name(product.getName())
                .description(product.getDescription())
                .price(product.getPrice())
                .discountPrice(product.getDiscountPrice())
                .stockQuantity(product.getStockQuantity())
                .brand(product.getBrand())
                .images(product.getImages())
                .categoryId(product.getCategory() != null ? product.getCategory().getId() : null)
                .categoryName(product.getCategory() != null ? product.getCategory().getName() : null)
                .averageRating(product.getAverageRating())
                .totalReviews(product.getTotalReviews())
                .sku(product.getSku())
                .specifications(product.getSpecifications())
                .featured(product.isFeatured())
                .active(product.isActive())
                .build();
    }
}
