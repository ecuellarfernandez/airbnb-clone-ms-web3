package com.airbnb_clone_ms_web_iii.identity.controllers;

import com.airbnb_clone_ms_web_iii.identity.services.security.JwtService;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class HomeController {

    private final JwtService jwtService;

    public HomeController(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    @GetMapping("/")
    public Map<String, String> home() {
        return Map.of(
                "message", "Welcome to the Identity Service API",
                "documentation", "/api/docs",
                "health", "/api/health"
        );
    }

    @GetMapping("/health")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public void health() {
        // Just return 204 No Content to indicate the service is healthy
    }

    @GetMapping("/get-jwt-payload")
    public Map<String, String> getJwtPayload(@RequestParam String token) {
        String username = jwtService.extractUsername(token) + "";
        String userId = jwtService.extractUserId(token).toString();
        List<String> roles = jwtService.extractRoles(token);
        return Map.of(
                "userId", userId,
                "username", username,
                "roles", String.join(";", roles)
        );
    }
}
