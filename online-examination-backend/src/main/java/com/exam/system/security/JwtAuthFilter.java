package com.exam.system.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

public class JwtAuthFilter extends OncePerRequestFilter {

   @Override
protected void doFilterInternal(HttpServletRequest request,
                               HttpServletResponse response,
                               FilterChain filterChain)
        throws ServletException, IOException {

    System.out.println("JWT FILTER HIT: " + request.getRequestURI());

    String path = request.getRequestURI();

        // 🔥 SKIP PUBLIC APIs
        if (
    path.startsWith("/api/auth") ||
    path.startsWith("/api/results/submit") ||
    path.startsWith("/api/exams")
) {
    filterChain.doFilter(request, response);
    return;
}

    String header = request.getHeader("Authorization");

    if (header != null && header.startsWith("Bearer ")) {

        String token = header.substring(7);

        try {

            String role = JwtUtil.extractRole(token).toUpperCase();
            String email = JwtUtil.extractEmail(token);

            UsernamePasswordAuthenticationToken auth =
                    new UsernamePasswordAuthenticationToken(
                            email,
                            null,
                            List.of(new SimpleGrantedAuthority(role))
                    );

            SecurityContextHolder.getContext().setAuthentication(auth);

        } catch (Exception e) {
    System.out.println("Invalid JWT");

    // ❌ clear auth (VERY IMPORTANT)
    SecurityContextHolder.clearContext();
}
    }

    filterChain.doFilter(request, response);
}
}