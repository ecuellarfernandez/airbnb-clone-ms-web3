package com.airbnb_clone_ms_web_iii.identity.controllers;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/test")
public class TestController {

    @GetMapping("/echo-headers")
    public ResponseEntity<Map<String, String>> getDiagnosticInfo(
            @RequestHeader(name = "X-User-ID", required = false) String userIdHeader,
            @RequestHeader(name = "X-User-Roles", required = false) String rolesHeader,
            HttpServletRequest request) {

        // When anonymous: 'userIdHeader' will be null or empty.
        boolean isAuthenticated = userIdHeader != null && !userIdHeader.isEmpty();

        Map<String, String> diagnostics = new HashMap<>();

        // --- APISIX JWT/HEADER INJECTION CHECK ---
        diagnostics.put("status", isAuthenticated ? "SUCCESS: CLAIMS INJECTED" : "SUCCESS: ANONYMOUS ACCESS");
        diagnostics.put("userId", Optional.ofNullable(userIdHeader).orElse("ANONYMOUS"));
        diagnostics.put("userRoles", Optional.ofNullable(rolesHeader).orElse("NONE"));

        // --- APISIX URI REWRITE CHECK ---
        // This shows the actual URL path the Spring Boot service received *after* APISIX finished processing it.
        diagnostics.put("received_uri", request.getRequestURI());

        // --- DEBUGGING ---
        diagnostics.put("proxy_rewrite_check", "SUCCESS");
        diagnostics.put("expected_call", "/api/identity/diagnostic/echo-headers");
        diagnostics.put("service_target", "/api/diagnostic/echo-headers");


        return ResponseEntity.ok(diagnostics);
    }

}
