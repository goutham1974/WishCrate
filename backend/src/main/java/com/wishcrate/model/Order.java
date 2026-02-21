package com.wishcrate.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.AttributeOverrides;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "orders")
@EntityListeners(AuditingEntityListener.class)
public class Order {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true, nullable = false)
    private String orderNumber;
    
    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
    
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<OrderItem> orderItems = new ArrayList<>();
    
    @Column(nullable = false)
    private BigDecimal subtotal;
    
    @Column(nullable = false)
    private BigDecimal tax;
    
    @Column(nullable = false)
    private BigDecimal shippingCost;
    
    @Column(nullable = false)
    private BigDecimal totalAmount;
    
    @Enumerated(EnumType.STRING)
    private OrderStatus status = OrderStatus.PENDING;
    
    @Enumerated(EnumType.STRING)
    private PaymentStatus paymentStatus = PaymentStatus.PENDING;
    
    @Enumerated(EnumType.STRING)
    private PaymentMethod paymentMethod;
    
    private String paymentTransactionId;
    
    @Embedded
    private ShippingAddress shippingAddress;
    
    @Embedded
    @AttributeOverrides({
        @AttributeOverride(name = "fullName", column = @Column(name = "billing_full_name")),
        @AttributeOverride(name = "phoneNumber", column = @Column(name = "billing_phone")),
        @AttributeOverride(name = "addressLine1", column = @Column(name = "billing_address_line1")),
        @AttributeOverride(name = "addressLine2", column = @Column(name = "billing_address_line2")),
        @AttributeOverride(name = "city", column = @Column(name = "billing_city")),
        @AttributeOverride(name = "state", column = @Column(name = "billing_state")),
        @AttributeOverride(name = "country", column = @Column(name = "billing_country")),
        @AttributeOverride(name = "zipCode", column = @Column(name = "billing_zip_code"))
    })
    private ShippingAddress billingAddress;
    
    private String trackingNumber;
    
    private LocalDateTime estimatedDeliveryDate;
    
    private LocalDateTime deliveredDate;
    
    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime orderDate;
    
    // Constructors
    public Order() {
        this.orderItems = new ArrayList<>();
        this.status = OrderStatus.PENDING;
        this.paymentStatus = PaymentStatus.PENDING;
    }
    
    public Order(Long id, String orderNumber, User user, List<OrderItem> orderItems, BigDecimal subtotal,
                BigDecimal tax, BigDecimal shippingCost, BigDecimal totalAmount, OrderStatus status,
                PaymentStatus paymentStatus, PaymentMethod paymentMethod, String paymentTransactionId,
                ShippingAddress shippingAddress, ShippingAddress billingAddress, String trackingNumber,
                LocalDateTime estimatedDeliveryDate, LocalDateTime deliveredDate, LocalDateTime orderDate) {
        this.id = id;
        this.orderNumber = orderNumber;
        this.user = user;
        this.orderItems = orderItems != null ? orderItems : new ArrayList<>();
        this.subtotal = subtotal;
        this.tax = tax;
        this.shippingCost = shippingCost;
        this.totalAmount = totalAmount;
        this.status = status != null ? status : OrderStatus.PENDING;
        this.paymentStatus = paymentStatus != null ? paymentStatus : PaymentStatus.PENDING;
        this.paymentMethod = paymentMethod;
        this.paymentTransactionId = paymentTransactionId;
        this.shippingAddress = shippingAddress;
        this.billingAddress = billingAddress;
        this.trackingNumber = trackingNumber;
        this.estimatedDeliveryDate = estimatedDeliveryDate;
        this.deliveredDate = deliveredDate;
        this.orderDate = orderDate;
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getOrderNumber() { return orderNumber; }
    public void setOrderNumber(String orderNumber) { this.orderNumber = orderNumber; }
    
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    
    public List<OrderItem> getOrderItems() { return orderItems; }
    public void setOrderItems(List<OrderItem> orderItems) { this.orderItems = orderItems; }
    
    public BigDecimal getSubtotal() { return subtotal; }
    public void setSubtotal(BigDecimal subtotal) { this.subtotal = subtotal; }
    
    public BigDecimal getTax() { return tax; }
    public void setTax(BigDecimal tax) { this.tax = tax; }
    
    public BigDecimal getShippingCost() { return shippingCost; }
    public void setShippingCost(BigDecimal shippingCost) { this.shippingCost = shippingCost; }
    
    public BigDecimal getTotalAmount() { return totalAmount; }
    public void setTotalAmount(BigDecimal totalAmount) { this.totalAmount = totalAmount; }
    
    public OrderStatus getStatus() { return status; }
    public void setStatus(OrderStatus status) { this.status = status; }
    
    public PaymentStatus getPaymentStatus() { return paymentStatus; }
    public void setPaymentStatus(PaymentStatus paymentStatus) { this.paymentStatus = paymentStatus; }
    
    public PaymentMethod getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(PaymentMethod paymentMethod) { this.paymentMethod = paymentMethod; }
    
    public String getPaymentTransactionId() { return paymentTransactionId; }
    public void setPaymentTransactionId(String paymentTransactionId) { this.paymentTransactionId = paymentTransactionId; }
    
    public ShippingAddress getShippingAddress() { return shippingAddress; }
    public void setShippingAddress(ShippingAddress shippingAddress) { this.shippingAddress = shippingAddress; }
    
    public ShippingAddress getBillingAddress() { return billingAddress; }
    public void setBillingAddress(ShippingAddress billingAddress) { this.billingAddress = billingAddress; }
    
    public String getTrackingNumber() { return trackingNumber; }
    public void setTrackingNumber(String trackingNumber) { this.trackingNumber = trackingNumber; }
    
    public LocalDateTime getEstimatedDeliveryDate() { return estimatedDeliveryDate; }
    public void setEstimatedDeliveryDate(LocalDateTime estimatedDeliveryDate) { this.estimatedDeliveryDate = estimatedDeliveryDate; }
    
    public LocalDateTime getDeliveredDate() { return deliveredDate; }
    public void setDeliveredDate(LocalDateTime deliveredDate) { this.deliveredDate = deliveredDate; }
    
    public LocalDateTime getOrderDate() { return orderDate; }
    public void setOrderDate(LocalDateTime orderDate) { this.orderDate = orderDate; }
    
    // Builder Pattern
    public static OrderBuilder builder() {
        return new OrderBuilder();
    }
    
    public static class OrderBuilder {
        private Long id;
        private String orderNumber;
        private User user;
        private List<OrderItem> orderItems = new ArrayList<>();
        private BigDecimal subtotal;
        private BigDecimal tax;
        private BigDecimal shippingCost;
        private BigDecimal totalAmount;
        private OrderStatus status = OrderStatus.PENDING;
        private PaymentStatus paymentStatus = PaymentStatus.PENDING;
        private PaymentMethod paymentMethod;
        private String paymentTransactionId;
        private ShippingAddress shippingAddress;
        private ShippingAddress billingAddress;
        private String trackingNumber;
        private LocalDateTime estimatedDeliveryDate;
        private LocalDateTime deliveredDate;
        private LocalDateTime orderDate;
        
        public OrderBuilder id(Long id) { this.id = id; return this; }
        public OrderBuilder orderNumber(String orderNumber) { this.orderNumber = orderNumber; return this; }
        public OrderBuilder user(User user) { this.user = user; return this; }
        public OrderBuilder orderItems(List<OrderItem> orderItems) { this.orderItems = orderItems; return this; }
        public OrderBuilder subtotal(BigDecimal subtotal) { this.subtotal = subtotal; return this; }
        public OrderBuilder tax(BigDecimal tax) { this.tax = tax; return this; }
        public OrderBuilder shippingCost(BigDecimal shippingCost) { this.shippingCost = shippingCost; return this; }
        public OrderBuilder totalAmount(BigDecimal totalAmount) { this.totalAmount = totalAmount; return this; }
        public OrderBuilder status(OrderStatus status) { this.status = status; return this; }
        public OrderBuilder paymentStatus(PaymentStatus paymentStatus) { this.paymentStatus = paymentStatus; return this; }
        public OrderBuilder paymentMethod(PaymentMethod paymentMethod) { this.paymentMethod = paymentMethod; return this; }
        public OrderBuilder paymentTransactionId(String paymentTransactionId) { this.paymentTransactionId = paymentTransactionId; return this; }
        public OrderBuilder shippingAddress(ShippingAddress shippingAddress) { this.shippingAddress = shippingAddress; return this; }
        public OrderBuilder billingAddress(ShippingAddress billingAddress) { this.billingAddress = billingAddress; return this; }
        public OrderBuilder trackingNumber(String trackingNumber) { this.trackingNumber = trackingNumber; return this; }
        public OrderBuilder estimatedDeliveryDate(LocalDateTime estimatedDeliveryDate) { this.estimatedDeliveryDate = estimatedDeliveryDate; return this; }
        public OrderBuilder deliveredDate(LocalDateTime deliveredDate) { this.deliveredDate = deliveredDate; return this; }
        public OrderBuilder orderDate(LocalDateTime orderDate) { this.orderDate = orderDate; return this; }
        
        public Order build() {
            return new Order(id, orderNumber, user, orderItems, subtotal, tax, shippingCost, totalAmount,
                           status, paymentStatus, paymentMethod, paymentTransactionId, shippingAddress,
                           billingAddress, trackingNumber, estimatedDeliveryDate, deliveredDate, orderDate);
        }
    }
    
    public enum OrderStatus {
        PENDING, CONFIRMED, PROCESSING, SHIPPED, DELIVERED, CANCELLED, RETURNED
    }
    
    public enum PaymentStatus {
        PENDING, PAID, FAILED, REFUNDED
    }
    
    public enum PaymentMethod {
        CREDIT_CARD, DEBIT_CARD, PAYPAL, STRIPE, COD
    }
}
