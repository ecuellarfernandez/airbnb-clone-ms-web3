package com.airbnb_clone_ms_web_iii.identity.configurations;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfiguration {

    @Value("${server.port}")
    private String serverPort;

    @Value("${frontend.port}")
    private String frontendPort;

    @Bean
    public WebMvcConfigurer corsConfigurer() {

        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**") // Apply to all paths
                        .allowedOrigins(("http://localhost:" + serverPort), ("http://localhost:" + frontendPort)) // Specify allowed origins
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Specify allowed HTTP methods
                        .allowedHeaders("*") // Allow all headers
                        .allowCredentials(true) // Allow sending of credentials (e.g., cookies, authorization headers)
                        .maxAge(3600); // Cache preflight requests for 1 hour
            }
        };
    }
}
