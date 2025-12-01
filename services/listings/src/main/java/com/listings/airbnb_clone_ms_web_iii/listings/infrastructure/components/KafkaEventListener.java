package com.listings.airbnb_clone_ms_web_iii.listings.infrastructure.components;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;
import com.fasterxml.jackson.databind.JsonNode; // 🔑 The key class
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component
public class KafkaEventListener {

    private static final Logger log = LoggerFactory.getLogger(KafkaEventListener.class);
    private final ObjectMapper objectMapper = new ObjectMapper();

    @KafkaListener(
            topics = {"payment_events"},
            groupId = "${spring.kafka.consumer.group-id}"
    )
    public void handleRawEvent(String rawEventMessage) {

        try {
            JsonNode root = objectMapper.readTree(rawEventMessage);

            String eventName = root.path("event_name").asText(null);
            JsonNode eventValue = root.path("event_value");

            log.info("➡ Event name: {}", eventName);

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
                String paymentId = eventValue.path("id").asText();
                String reservationId = eventValue.path("reservation_id").asText();
                log.info("Processing PAYMENT_COMPLETED for paymentId: {}, reservation: {}", paymentId, reservationId);
                //AQUI SE LLAMA AL COMMAND PARA CONFIRMAR LA RESERVA
                break;
            case "PAYMENT_FAILED":
                String failedPaymentId = eventValue.path("id").asText();
                log.info("Processing PAYMENT_FAILED for paymentId: {}", failedPaymentId);
                //AQUI SE LLAMA AL COMMAND PARA CANCELAR LA RESERVA
                break;
            case "TEST_EVENT":
                log.info("Received TEST_EVENT with data: {}", eventValue.toString());
                break;
            default:
                log.warn("Unhandled payment event: {}", eventName);
        }
    }
}