package com.wishcrate.service;

import com.wishcrate.dto.AuthResponse;
import com.wishcrate.dto.LoginRequest;
import com.wishcrate.dto.RegisterRequest;
import com.wishcrate.model.Cart;
import com.wishcrate.model.User;
import com.wishcrate.repository.CartRepository;
import com.wishcrate.repository.UserRepository;
import com.wishcrate.security.JwtTokenProvider;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {
    
    private final UserRepository userRepository;
    private final CartRepository cartRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManager authenticationManager;
    
    public AuthService(UserRepository userRepository, CartRepository cartRepository, 
                      PasswordEncoder passwordEncoder, JwtTokenProvider jwtTokenProvider,
                      AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.cartRepository = cartRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
        this.authenticationManager = authenticationManager;
    }
    
    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }
        
        User user = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .phoneNumber(request.getPhoneNumber())
                .role(User.Role.USER)
                .enabled(true)
                .build();
        
        User savedUser = userRepository.save(user);
        
        // Create cart for new user
        Cart cart = Cart.builder()
                .user(savedUser)
                .build();
        cartRepository.save(cart);
        
        String token = jwtTokenProvider.generateToken(user.getEmail());
        
        return AuthResponse.builder()
                .token(token)
                .email(savedUser.getEmail())
                .firstName(savedUser.getFirstName())
                .lastName(savedUser.getLastName())
                .role(savedUser.getRole().name())
                .build();
    }
    
    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        String token = jwtTokenProvider.generateToken(user.getEmail());
        
        return AuthResponse.builder()
                .token(token)
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .role(user.getRole().name())
                .build();
    }
}
