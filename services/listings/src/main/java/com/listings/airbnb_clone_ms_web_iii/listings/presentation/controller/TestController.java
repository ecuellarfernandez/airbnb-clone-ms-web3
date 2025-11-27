package com.listings.airbnb_clone_ms_web_iii.listings.presentation.controller;

import an.awesome.pipelinr.Pipeline;
import com.listings.airbnb_clone_ms_web_iii.listings.application.pipelinr.test.commands.SendKafkaEventCommand;
import com.listings.airbnb_clone_ms_web_iii.listings.domain.classifiers.kafka.producible.ProducibleEvents;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

}
