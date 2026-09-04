package com.exam.system.security;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;


@Configuration
public class SecurityConfig {

    @Bean
    public JwtAuthFilter jwtAuthFilter(){
        return new JwtAuthFilter();
    }

   @Bean
public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

    System.out.println("SECURITY CONFIG LOADED");

    http
    .cors(cors -> {})   // 👈 ADD THIS
    .csrf(csrf -> csrf.disable())
    .httpBasic(httpBasic -> httpBasic.disable())
    .formLogin(form -> form.disable())
    .authorizeHttpRequests(auth -> auth
        .requestMatchers("/**").permitAll()
        .anyRequest().permitAll()
    )
    .addFilterBefore(jwtAuthFilter(),
            UsernamePasswordAuthenticationFilter.class);

    return http.build();
}
}