package com.wishcrate.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.wishcrate.dto.AdminStatsDTO;
import com.wishcrate.model.Order;
import com.wishcrate.repository.CategoryRepository;
import com.wishcrate.repository.OrderRepository;
import com.wishcrate.repository.ProductRepository;
import com.wishcrate.repository.UserRepository;

@Service
@Transactional(readOnly = true)
public class AdminService {
    
    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    
    public AdminService(ProductRepository productRepository, 
                       OrderRepository orderRepository,
                       UserRepository userRepository,
                       CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
    }
    
    public AdminStatsDTO getAdminStats() {
        long totalProducts = productRepository.count();
        long totalOrders = orderRepository.count();
        long totalUsers = userRepository.count();
        long totalCategories = categoryRepository.count();
        
        // Count active products
        long activeProducts = productRepository.countByActiveTrue();
        
        // Count pending orders
        long pendingOrders = orderRepository.countByStatus(Order.OrderStatus.PENDING);
        
        return new AdminStatsDTO(
            totalProducts,
            totalOrders,
            totalUsers,
            totalCategories,
            activeProducts,
            pendingOrders
        );
    }
}
