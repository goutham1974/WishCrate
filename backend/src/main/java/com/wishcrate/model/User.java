package com.wishcrate.model;

import jakarta.persistence.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.*;

@Entity
@Table(name = "users")
@EntityListeners(AuditingEntityListener.class)
public class User implements UserDetails {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String firstName;
    
    @Column(nullable = false)
    private String lastName;
    
    @Column(nullable = false, unique = true)
    private String email;
    
    @Column(nullable = false)
    private String password;
    
    private String phoneNumber;
    
    @Enumerated(EnumType.STRING)
    private Role role = Role.USER;
    
    private boolean enabled = true;
    
    private String profileImage;
    
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Address> addresses = new ArrayList<>();
    
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Order> orders = new ArrayList<>();
    
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Review> reviews = new ArrayList<>();
    
    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private Cart cart;
    
    @ManyToMany
    @JoinTable(
        name = "user_wishlist",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "product_id")
    )
    private Set<Product> wishlist = new HashSet<>();
    
    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime createdAt;
    
    @LastModifiedDate
    private LocalDateTime updatedAt;
    
    // Constructors
    public User() {
        this.role = Role.USER;
        this.enabled = true;
        this.addresses = new ArrayList<>();
        this.orders = new ArrayList<>();
        this.reviews = new ArrayList<>();
        this.wishlist = new HashSet<>();
    }
    
    public User(Long id, String firstName, String lastName, String email, String password, 
                String phoneNumber, Role role, boolean enabled, String profileImage,
                List<Address> addresses, List<Order> orders, List<Review> reviews, 
                Cart cart, Set<Product> wishlist, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.role = role != null ? role : Role.USER;
        this.enabled = enabled;
        this.profileImage = profileImage;
        this.addresses = addresses != null ? addresses : new ArrayList<>();
        this.orders = orders != null ? orders : new ArrayList<>();
        this.reviews = reviews != null ? reviews : new ArrayList<>();
        this.cart = cart;
        this.wishlist = wishlist != null ? wishlist : new HashSet<>();
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }
    
    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public void setPassword(String password) { this.password = password; }
    
    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }
    
    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }
    
    public void setEnabled(boolean enabled) { this.enabled = enabled; }
    
    public String getProfileImage() { return profileImage; }
    public void setProfileImage(String profileImage) { this.profileImage = profileImage; }
    
    public List<Address> getAddresses() { return addresses; }
    public void setAddresses(List<Address> addresses) { this.addresses = addresses; }
    
    public List<Order> getOrders() { return orders; }
    public void setOrders(List<Order> orders) { this.orders = orders; }
    
    public List<Review> getReviews() { return reviews; }
    public void setReviews(List<Review> reviews) { this.reviews = reviews; }
    
    public Cart getCart() { return cart; }
    public void setCart(Cart cart) { this.cart = cart; }
    
    public Set<Product> getWishlist() { return wishlist; }
    public void setWishlist(Set<Product> wishlist) { this.wishlist = wishlist; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
    
    // Builder Pattern
    public static UserBuilder builder() {
        return new UserBuilder();
    }
    
    public static class UserBuilder {
        private Long id;
        private String firstName;
        private String lastName;
        private String email;
        private String password;
        private String phoneNumber;
        private Role role = Role.USER;
        private boolean enabled = true;
        private String profileImage;
        private List<Address> addresses = new ArrayList<>();
        private List<Order> orders = new ArrayList<>();
        private List<Review> reviews = new ArrayList<>();
        private Cart cart;
        private Set<Product> wishlist = new HashSet<>();
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;
        
        public UserBuilder id(Long id) { this.id = id; return this; }
        public UserBuilder firstName(String firstName) { this.firstName = firstName; return this; }
        public UserBuilder lastName(String lastName) { this.lastName = lastName; return this; }
        public UserBuilder email(String email) { this.email = email; return this; }
        public UserBuilder password(String password) { this.password = password; return this; }
        public UserBuilder phoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; return this; }
        public UserBuilder role(Role role) { this.role = role; return this; }
        public UserBuilder enabled(boolean enabled) { this.enabled = enabled; return this; }
        public UserBuilder profileImage(String profileImage) { this.profileImage = profileImage; return this; }
        public UserBuilder addresses(List<Address> addresses) { this.addresses = addresses; return this; }
        public UserBuilder orders(List<Order> orders) { this.orders = orders; return this; }
        public UserBuilder reviews(List<Review> reviews) { this.reviews = reviews; return this; }
        public UserBuilder cart(Cart cart) { this.cart = cart; return this; }
        public UserBuilder wishlist(Set<Product> wishlist) { this.wishlist = wishlist; return this; }
        public UserBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }
        public UserBuilder updatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; return this; }
        
        public User build() {
            return new User(id, firstName, lastName, email, password, phoneNumber, role, 
                          enabled, profileImage, addresses, orders, reviews, cart, 
                          wishlist, createdAt, updatedAt);
        }
    }
    
    // UserDetails Implementation

    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_" + role.name()));
    }
    
    @Override
    public String getPassword() {
        return password;
    }
    
    @Override
    public String getUsername() {
        return email;
    }
    
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }
    
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }
    
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }
    
    @Override
    public boolean isEnabled() {
        return enabled;
    }
    
    public enum Role {
        USER, SELLER, ADMIN
    }
}
