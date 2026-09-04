package com.exam.system.controller;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.exam.system.model.User;
import com.exam.system.repository.UserRepository;
import com.exam.system.security.JwtUtil;
import com.exam.system.service.OtpService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {
    
    private final OtpService otpService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    
    public AuthController(OtpService otpService,
                      UserRepository userRepository,
                      PasswordEncoder passwordEncoder){
    this.otpService = otpService;
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
}

    // SEND OTP
   @PostMapping("/send-otp")
public ResponseEntity<?> sendOtp(@RequestBody Map<String, String> request) {

    String email = request.get("email");

    if (email == null || email.trim().isEmpty()) {
        return ResponseEntity.badRequest().body("Email is required");
    }

    Optional<User> existingUser = userRepository.findByEmail(email);

    if (existingUser.isPresent()) {
        return ResponseEntity.badRequest().body("User already exists. Please login.");
    }

    otpService.sendOtp(email);

    return ResponseEntity.ok("OTP sent");
}
    // VERIFY OTP
    @PostMapping("/verify-otp")
public ResponseEntity<?> verifyOtp(@RequestBody Map<String,String> body){

    String email = body.get("email");
    String otp = body.get("otp");

    if(email == null || otp == null){
        return ResponseEntity.badRequest().body("Email or OTP missing");
    }

    boolean valid = otpService.verifyOtp(email,otp);

    if(valid){
        return ResponseEntity.ok("OTP Verified");
    }

    return ResponseEntity.badRequest().body("Invalid OTP");
}

    // REGISTER USER
@PostMapping("/register")
public ResponseEntity<?> register(@RequestBody User user){

    Optional<User> existingUser = userRepository.findByEmail(user.getEmail());

    if(existingUser.isPresent()){
        return ResponseEntity.badRequest().body("User already exists");
    }

    // default role
    if(user.getRole() == null){
        user.setRole("STUDENT");
    }

    // convert to uppercase
    user.setRole(user.getRole().toUpperCase());

    // encrypt password
    user.setPassword(passwordEncoder.encode(user.getPassword()));

    userRepository.save(user);

    return ResponseEntity.ok("Account created successfully");
}


    // LOGIN
@PostMapping("/login")
public ResponseEntity<?> login(@RequestBody Map<String,String> request){

    String email = request.get("email");
    String password = request.get("password");

    Optional<User> user = userRepository.findByEmail(email);

    if(user.isPresent() &&
       passwordEncoder.matches(password,user.get().getPassword())){

       String token = JwtUtil.generateToken(
        user.get().getEmail(),
        user.get().getRole()
);

        Map<String,String> response = new HashMap<>();

        response.put("token", token);
        response.put("role", user.get().getRole());

        return ResponseEntity.ok(response);
    }

    return ResponseEntity.status(401).body("Invalid email or password");
}
}