package com.listings.airbnb_clone_ms_web_iii.listings.infrastructure.components;

import an.awesome.pipelinr.Pipeline;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.listings.airbnb_clone_ms_web_iii.listings.application.pipelinr.booking.commands.ConfirmBookingFromPaymentCommand;
import com.listings.airbnb_clone_ms_web_iii.listings.application.pipelinr.booking.commands.RejectBookingFromPaymentCommand;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;
import com.fasterxml.jackson.databind.JsonNode; // 🔑 The key class
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.UUID;

@Component
public class KafkaEventListener {

    private static final Logger log = LoggerFactory.getLogger(KafkaEventListener.class);
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final Pipeline pipeline;

    public KafkaEventListener(Pipeline pipeline) {
        this.pipeline = pipeline;
    }

    @KafkaListener(
            topics = {"payment_events"},
            groupId = "${spring.kafka.consumer.group-id}"
    )
    public void handleRawEvent(String rawEventMessage) {

        try {
            JsonNode root = objectMapper.readTree(rawEventMessage);

            String eventName = root.path("event_name").asText(null);

            if (eventName == null) {
                log.error("[KAFKA] event_name is null in message: {}", rawEventMessage);
                return;
            }

            JsonNode eventValue = root.path("event_value");

            if (eventValue.isMissingNode() || eventValue.isNull()) {
                eventValue = root.path("data");
            }

            log.info("➡ Event name: {}", eventName);
            log.info("➡ Event value: {}", eventValue.toString());

            // Example: call domain logic / service
            this.handlePaymentEvent(eventName, eventValue);

        } catch (Exception e) {
            log.error(e.getMessage());
            log.error("[ERROR] Failed to parse Kafka message: {}", rawEventMessage, e);
        }
    }

    private void handlePaymentEvent(String eventName, JsonNode eventValue){
        switch (eventName){
            case "PAYMENT_COMPLETED":
                handlePaymentCompleted(eventValue);
                break;
            case "PAYMENT_REJECTED":
            case "PAYMENT_FAILED":
                handlePaymentFailed(eventValue);
                break;
            case "TEST_EVENT":
                log.info("Received TEST_EVENT with data: {}", eventValue.toString());
                break;
            default:
                log.warn("Unhandled payment event: {}", eventName);
        }
    }

    private void handlePaymentCompleted(JsonNode eventValue) {
        String paymentId = eventValue.path("id").asText();
        String reservationId = eventValue.path("reservation_id").asText(null);

        log.info("Processing PAYMENT_COMPLETED for paymentId={}, reservationId={}", paymentId, reservationId);

        try {
            if (reservationId == null || reservationId.isBlank()) {
                log.error("Missing reservation_id in PAYMENT_COMPLETED event");
                return;
            }

            UUID bookingId = UUID.fromString(reservationId);

            ConfirmBookingFromPaymentCommand command = new ConfirmBookingFromPaymentCommand(bookingId);
            pipeline.send(command);

            log.info("Booking {} confirmed successfully from payment event", bookingId);

        } catch (IllegalArgumentException exception) {
            log.error("Invalid reservation_id UUID in payment event: {}", reservationId, exception);
        }
    }

    private void handlePaymentFailed(JsonNode eventValue) {
        String paymentId = eventValue.path("id").asText();
        String reservationId = eventValue.path("reservation_id").asText(null);

        log.info("Processing PAYMENT_FAILED / PAYMENT_REJECTED for reservation: {}", reservationId);

        try {
            if (reservationId == null || reservationId.isBlank()) {
                log.error("Missing reservation_id in PAYMENT_FAILED event");
                return;
            }

            UUID bookingId = UUID.fromString(reservationId);

            RejectBookingFromPaymentCommand command = new RejectBookingFromPaymentCommand(bookingId);
            pipeline.send(command);

            log.info("Booking {} cancelled successfully from payment failed event", bookingId);

        } catch (IllegalArgumentException exception) {
            log.error("Invalid reservation_id UUID in payment failed event: {}", reservationId, exception);
        }
    }

}