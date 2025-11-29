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
            @RequestHeader(name = "X-User-Id", required = false) String userIdHeader,
            @RequestHeader(name = "X-User-Roles", required = false) String rolesHeader,
            @RequestHeader(name = "X-Identity-Key", required = false) String identityKeyHeader,
            HttpServletRequest request) {

        Map<String, String> diagnostics = new HashMap<>();

        // We expect the subject ("admin") to appear here
        diagnostics.put("userId", Optional.ofNullable(userIdHeader).orElse("ANONYMOUS"));
        diagnostics.put("userRoles", Optional.ofNullable(rolesHeader).orElse("NONE"));

        // --- APISIX URI REWRITE CHECK ---
        diagnostics.put("received_uri", request.getRequestURI());

        diagnostics.put("identityKey", Optional.ofNullable(identityKeyHeader).orElse("NONE"));

        return ResponseEntity.ok(diagnostics);
    }

}
