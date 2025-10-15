package com.airbnb_clone_ms_web_iii.identity.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class HomeController {

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
}
