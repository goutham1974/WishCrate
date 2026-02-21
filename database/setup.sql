-- WishCrate Database Setup Script
-- MySQL Database Schema

-- Create Database
CREATE DATABASE IF NOT EXISTS wishcrate_db;
USE wishcrate_db;

-- Note: The tables will be automatically created by Spring Boot JPA
-- This script is for reference and manual setup if needed

-- Sample Categories
INSERT INTO categories (name, description) VALUES
('Electronics', 'Electronic devices and gadgets'),
('Fashion', 'Clothing and accessories'),
('Home & Garden', 'Home improvement and garden supplies'),
('Sports', 'Sports equipment and fitness'),
('Books', 'Books and educational materials'),
('Toys', 'Toys and games for kids'),
('Beauty', 'Beauty and personal care products'),
('Automotive', 'Car accessories and parts');

-- Sample Admin User
-- Password: Admin123!
-- Note: This will be created through registration endpoint
-- Default role will be USER, needs to be manually updated to ADMIN

-- Sample Products
-- These will be added through the API endpoints or admin panel

-- Useful Queries

-- Get all orders with user details
SELECT o.id, o.order_number, o.total_amount, o.status, 
       u.first_name, u.last_name, u.email
FROM orders o
JOIN users u ON o.user_id = u.id
ORDER BY o.order_date DESC;

-- Get top-selling products
SELECT p.id, p.name, p.brand, COUNT(oi.id) as total_orders, 
       SUM(oi.quantity) as total_quantity_sold
FROM products p
JOIN order_items oi ON p.id = oi.product_id
GROUP BY p.id, p.name, p.brand
ORDER BY total_quantity_sold DESC
LIMIT 10;

-- Get revenue by date
SELECT DATE(order_date) as date, 
       COUNT(*) as total_orders,
       SUM(total_amount) as total_revenue
FROM orders
WHERE status = 'DELIVERED'
GROUP BY DATE(order_date)
ORDER BY date DESC;

-- Get products with low stock
SELECT id, name, stock_quantity, category_id
FROM products
WHERE stock_quantity < 10 AND active = true
ORDER BY stock_quantity ASC;

-- Get user purchase history
SELECT u.email, COUNT(o.id) as total_orders, 
       SUM(o.total_amount) as total_spent
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.email
ORDER BY total_spent DESC;

-- Database Maintenance

-- Reset auto-increment values
ALTER TABLE users AUTO_INCREMENT = 1;
ALTER TABLE products AUTO_INCREMENT = 1;
ALTER TABLE orders AUTO_INCREMENT = 1;
ALTER TABLE categories AUTO_INCREMENT = 1;

-- Backup database
-- mysqldump -u root -p wishcrate_db > wishcrate_backup.sql

-- Restore database
-- mysql -u root -p wishcrate_db < wishcrate_backup.sql

-- Performance Indexes (Optional - JPA creates some automatically)
CREATE INDEX idx_product_category ON products(category_id);
CREATE INDEX idx_order_user ON orders(user_id);
CREATE INDEX idx_order_status ON orders(status);
CREATE INDEX idx_order_date ON orders(order_date);
CREATE INDEX idx_product_active ON products(active);
CREATE INDEX idx_product_price ON products(price);

-- Views for Analytics

-- Daily Sales Summary
CREATE OR REPLACE VIEW daily_sales AS
SELECT 
    DATE(order_date) as sale_date,
    COUNT(*) as total_orders,
    SUM(total_amount) as total_revenue,
    AVG(total_amount) as average_order_value
FROM orders
WHERE status IN ('DELIVERED', 'SHIPPED')
GROUP BY DATE(order_date);

-- Product Performance
CREATE OR REPLACE VIEW product_performance AS
SELECT 
    p.id,
    p.name,
    p.brand,
    p.price,
    p.stock_quantity,
    p.average_rating,
    p.total_reviews,
    COUNT(DISTINCT oi.order_id) as times_ordered,
    SUM(oi.quantity) as total_units_sold,
    SUM(oi.subtotal) as total_revenue
FROM products p
LEFT JOIN order_items oi ON p.id = oi.product_id
GROUP BY p.id;

-- User Engagement
CREATE OR REPLACE VIEW user_engagement AS
SELECT 
    u.id,
    u.email,
    u.first_name,
    u.last_name,
    COUNT(DISTINCT o.id) as total_orders,
    SUM(o.total_amount) as lifetime_value,
    COUNT(DISTINCT r.id) as total_reviews,
    COUNT(DISTINCT w.product_id) as wishlist_items
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
LEFT JOIN reviews r ON u.id = r.user_id
LEFT JOIN user_wishlist w ON u.id = w.user_id
GROUP BY u.id;
