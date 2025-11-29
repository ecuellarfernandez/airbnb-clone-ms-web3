package com.listings.airbnb_clone_ms_web_iii.listings.presentation.controller;

import an.awesome.pipelinr.Pipeline;
import com.listings.airbnb_clone_ms_web_iii.listings.application.pipelinr.test.commands.SendKafkaEventCommand;
import com.listings.airbnb_clone_ms_web_iii.listings.domain.classifiers.kafka.producible.ProducibleEvents;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.logging.Logger;

@RestController
@RequestMapping("/api/test")
@Tag(name = "Tests Controller", description = "Controller for testing purposes")
@CrossOrigin(origins = "*")
public class TestController {

    private static final Logger logger = Logger.getLogger(ListingController.class.getName());
    private final Pipeline pipeline;

    public TestController(Pipeline pipeline) {
        this.pipeline = pipeline;
    }

    @GetMapping("/kafka-test")
    public ResponseEntity<String> kafkaTest(){
        SendKafkaEventCommand command = new SendKafkaEventCommand(ProducibleEvents.TEST_EVENT, "This is a test event from Listings MS to Kafka");
        String response = pipeline.send(command);
        logger.info("Kafka test event sent with response: " + response);
        return ResponseEntity.ok("Kafka test event sent successfully with response: " + response);
    }

    @GetMapping("/health")
    public ResponseEntity<String> healthCheck() {
        return ResponseEntity.ok("Listings Service is up and running!");
    }

    @GetMapping("/echo-headers")
    public ResponseEntity<Map<String, String>> getDiagnosticInfo(
            @RequestHeader(name = "X-User-Id", required = false) String userIdHeader,
            @RequestHeader(name = "X-User-Roles", required = false) String rolesHeader,
            @RequestHeader(name = "X-User-Token", required = false) String userToken,
            @RequestHeader(name = "X-Identity-Key", required = false) String identityKeyHeader,
            HttpServletRequest request) {

        Map<String, String> diagnostics = new HashMap<>();

        // We expect the subject ("admin") to appear here
        diagnostics.put("userId", Optional.ofNullable(userIdHeader).orElse("ANONYMOUS"));
        diagnostics.put("userRoles", Optional.ofNullable(rolesHeader).orElse("NONE"));
        diagnostics.put("userToken", Optional.ofNullable(userToken).orElse("NONE"));

        // --- APISIX URI REWRITE CHECK ---
        diagnostics.put("received_uri", request.getRequestURI());

        diagnostics.put("identityKey", Optional.ofNullable(identityKeyHeader).orElse("NONE"));

        return ResponseEntity.ok(diagnostics);
    }

}
