package com.wishcrate.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wishcrate.model.Address;
import com.wishcrate.model.User;
import com.wishcrate.repository.AddressRepository;
import com.wishcrate.repository.UserRepository;

@RestController
@RequestMapping("/api/addresses")
public class AddressController {

    private final AddressRepository addressRepository;
    private final UserRepository userRepository;

    public AddressController(AddressRepository addressRepository, UserRepository userRepository) {
        this.addressRepository = addressRepository;
        this.userRepository = userRepository;
    }

    private User getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return userRepository.findByEmail(auth.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @GetMapping
    public ResponseEntity<List<Address>> getUserAddresses() {
        User user = getCurrentUser();
        return ResponseEntity.ok(addressRepository.findByUserId(user.getId()));
    }

    @PostMapping
    public ResponseEntity<Address> saveAddress(@RequestBody Map<String, String> body) {
        User user = getCurrentUser();

        Address address = Address.builder()
                .fullName(body.get("fullName"))
                .phoneNumber(body.getOrDefault("phoneNumber", ""))
                .addressLine1(body.get("addressLine1"))
                .addressLine2(body.getOrDefault("addressLine2", ""))
                .city(body.get("city"))
                .state(body.getOrDefault("state", ""))
                .country(body.getOrDefault("country", "India"))
                .zipCode(body.getOrDefault("zipCode", ""))
                .user(user)
                .build();

        return ResponseEntity.ok(addressRepository.save(address));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAddress(@PathVariable Long id) {
        User user = getCurrentUser();
        Address address = addressRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Address not found"));
        if (!address.getUser().getId().equals(user.getId())) {
            return ResponseEntity.status(403).build();
        }
        addressRepository.delete(address);
        return ResponseEntity.noContent().build();
    }
}
