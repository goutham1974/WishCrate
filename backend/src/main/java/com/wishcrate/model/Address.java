package com.wishcrate.model;

import jakarta.persistence.*;

@Entity
@Table(name = "addresses")
public class Address {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String fullName;
    
    @Column(nullable = false)
    private String phoneNumber;
    
    @Column(nullable = false)
    private String addressLine1;
    
    private String addressLine2;
    
    @Column(nullable = false)
    private String city;
    
    @Column(nullable = false)
    private String state;
    
    @Column(nullable = false)
    private String country;
    
    @Column(nullable = false)
    private String zipCode;
    
    private boolean isDefault = false;
    
    @Enumerated(EnumType.STRING)
    private AddressType type = AddressType.HOME;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
    
    // Constructors
    public Address() {}
    
    public Address(Long id, String fullName, String phoneNumber, String addressLine1, String addressLine2,
                  String city, String state, String country, String zipCode, boolean isDefault, 
                  AddressType type, User user) {
        this.id = id;
        this.fullName = fullName;
        this.phoneNumber = phoneNumber;
        this.addressLine1 = addressLine1;
        this.addressLine2 = addressLine2;
        this.city = city;
        this.state = state;
        this.country = country;
        this.zipCode = zipCode;
        this.isDefault = isDefault;
        this.type = type != null ? type : AddressType.HOME;
        this.user = user;
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    
    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }
    
    public String getAddressLine1() { return addressLine1; }
    public void setAddressLine1(String addressLine1) { this.addressLine1 = addressLine1; }
    
    public String getAddressLine2() { return addressLine2; }
    public void setAddressLine2(String addressLine2) { this.addressLine2 = addressLine2; }
    
    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }
    
    public String getState() { return state; }
    public void setState(String state) { this.state = state; }
    
    public String getCountry() { return country; }
    public void setCountry(String country) { this.country = country; }
    
    public String getZipCode() { return zipCode; }
    public void setZipCode(String zipCode) { this.zipCode = zipCode; }
    
    public boolean isDefault() { return isDefault; }
    public void setDefault(boolean isDefault) { this.isDefault = isDefault; }
    
    public AddressType getType() { return type; }
    public void setType(AddressType type) { this.type = type; }
    
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    
    // Builder Pattern
    public static AddressBuilder builder() {
        return new AddressBuilder();
    }
    
    public static class AddressBuilder {
        private Long id;
        private String fullName;
        private String phoneNumber;
        private String addressLine1;
        private String addressLine2;
        private String city;
        private String state;
        private String country;
        private String zipCode;
        private boolean isDefault = false;
        private AddressType type = AddressType.HOME;
        private User user;
        
        public AddressBuilder id(Long id) { this.id = id; return this; }
        public AddressBuilder fullName(String fullName) { this.fullName = fullName; return this; }
        public AddressBuilder phoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; return this; }
        public AddressBuilder addressLine1(String addressLine1) { this.addressLine1 = addressLine1; return this; }
        public AddressBuilder addressLine2(String addressLine2) { this.addressLine2 = addressLine2; return this; }
        public AddressBuilder city(String city) { this.city = city; return this; }
        public AddressBuilder state(String state) { this.state = state; return this; }
        public AddressBuilder country(String country) { this.country = country; return this; }
        public AddressBuilder zipCode(String zipCode) { this.zipCode = zipCode; return this; }
        public AddressBuilder isDefault(boolean isDefault) { this.isDefault = isDefault; return this; }
        public AddressBuilder type(AddressType type) { this.type = type; return this; }
        public AddressBuilder user(User user) { this.user = user; return this; }
        
        public Address build() {
            return new Address(id, fullName, phoneNumber, addressLine1, addressLine2, city, state, 
                             country, zipCode, isDefault, type, user);
        }
    }
    
    public enum AddressType {
        HOME, WORK, OTHER
    }
}
