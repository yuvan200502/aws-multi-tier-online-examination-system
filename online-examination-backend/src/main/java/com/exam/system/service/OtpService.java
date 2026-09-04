package com.exam.system.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@Service
public class OtpService {

    private final JavaMailSender mailSender;

    private Map<String,String> otpStorage = new HashMap<>();

    public OtpService(JavaMailSender mailSender){
        this.mailSender = mailSender;
    }

    public void sendOtp(String email){

    System.out.println("OTP request received for: " + email);

    String otp = String.valueOf(new Random().nextInt(900000)+100000);

    otpStorage.put(email,otp);

    SimpleMailMessage message = new SimpleMailMessage();

    message.setFrom("online.exam.system10@gmail.com");
    message.setTo(email);
    message.setSubject("Exam System OTP Verification");
    message.setText("Your OTP is: "+otp);

    System.out.println("Sending OTP: " + otp);

    try {
    System.out.println("Before sending OTP mail...");
   // mailSender.send(message);
    System.out.println("After sending OTP mail...");
} catch (Exception e) {
    e.printStackTrace();
    throw e;
}

    System.out.println("OTP email sent successfully");
}

    public boolean verifyOtp(String email,String otp){

        String storedOtp = otpStorage.get(email);

        if(storedOtp != null && storedOtp.equals(otp)){
            otpStorage.remove(email);
            return true;
        }

        return false;
    }
}