package com.wishcrate.model;

import jakarta.persistence.Embeddable;

@Embeddable
public class ShippingAddress {
    
    private String fullName;
    private String phoneNumber;
    private String addressLine1;
    private String addressLine2;
    private String city;
    private String state;
    private String country;
    private String zipCode;
    
    // Constructors
    public ShippingAddress() {}
    
    public ShippingAddress(String fullName, String phoneNumber, String addressLine1, String addressLine2,
                          String city, String state, String country, String zipCode) {
        this.fullName = fullName;
        this.phoneNumber = phoneNumber;
        this.addressLine1 = addressLine1;
        this.addressLine2 = addressLine2;
        this.city = city;
        this.state = state;
        this.country = country;
        this.zipCode = zipCode;
    }
    
    // Getters and Setters
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
    
    // Builder Pattern
    public static ShippingAddressBuilder builder() {
        return new ShippingAddressBuilder();
    }
    
    public static class ShippingAddressBuilder {
        private String fullName;
        private String phoneNumber;
        private String addressLine1;
        private String addressLine2;
        private String city;
        private String state;
        private String country;
        private String zipCode;
        
        public ShippingAddressBuilder fullName(String fullName) { this.fullName = fullName; return this; }
        public ShippingAddressBuilder phoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; return this; }
        public ShippingAddressBuilder addressLine1(String addressLine1) { this.addressLine1 = addressLine1; return this; }
        public ShippingAddressBuilder addressLine2(String addressLine2) { this.addressLine2 = addressLine2; return this; }
        public ShippingAddressBuilder city(String city) { this.city = city; return this; }
        public ShippingAddressBuilder state(String state) { this.state = state; return this; }
        public ShippingAddressBuilder country(String country) { this.country = country; return this; }
        public ShippingAddressBuilder zipCode(String zipCode) { this.zipCode = zipCode; return this; }
        
        public ShippingAddress build() {
            return new ShippingAddress(fullName, phoneNumber, addressLine1, addressLine2, city, state, country, zipCode);
        }
    }
}
