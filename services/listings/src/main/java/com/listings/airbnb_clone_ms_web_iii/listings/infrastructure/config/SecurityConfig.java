package com.listings.airbnb_clone_ms_web_iii.listings.infrastructure.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> cors.configure(http))  // Enable CORS
                .csrf(csrf -> csrf.disable())  // disable CSRF
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS) // stateless
                )
                .authorizeHttpRequests(auth -> auth
                        .anyRequest().permitAll() // Allow all requests for now
                );

        // Add JWT filter if you have one
        // http.addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

}
