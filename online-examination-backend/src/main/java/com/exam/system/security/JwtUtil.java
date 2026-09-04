package com.exam.system.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import javax.crypto.SecretKey;
import java.util.Date;

public class JwtUtil {

    // 🔑 secret key (must be at least 32 characters for HS256)
    private static final String SECRET = "exam-system-super-secret-key-123456";

    private static final SecretKey KEY = Keys.hmacShaKeyFor(SECRET.getBytes());

   public static String generateToken(String email, String role){

    return Jwts.builder()
            .setSubject(email)
            .claim("role", role)
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + 86400000))
            .signWith(KEY)
            .compact();
}
public static String extractEmail(String token){

    Claims claims = Jwts.parserBuilder()
            .setSigningKey(KEY)
            .build()
            .parseClaimsJws(token)
            .getBody();

    return claims.getSubject();
}
    public static String extractRole(String token){

    Claims claims = Jwts.parserBuilder()
            .setSigningKey(KEY)
            .build()
            .parseClaimsJws(token)
            .getBody();

    return claims.get("role", String.class);
}
}