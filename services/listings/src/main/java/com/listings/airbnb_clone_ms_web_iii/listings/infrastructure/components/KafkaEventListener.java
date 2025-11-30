package com.listings.airbnb_clone_ms_web_iii.listings.infrastructure.components;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;
import com.fasterxml.jackson.databind.JsonNode; // 🔑 The key class
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component
public class KafkaEventListener {

    private static final Logger log = LoggerFactory.getLogger(KafkaEventListener.class);

    @KafkaListener(
            topics = {"payment_events"},
            groupId = "${spring.kafka.consumer.group-id}"
    )
    public void handleRawEvent(String rawEventMessage) {

        log.info("📢 Received RAW event message. Printing for inspection:");
        log.info("-------------------------------------------------------");
        log.info("RAW Payload: {}", rawEventMessage);
        log.info("-------------------------------------------------------");

        // When you're ready to deserialize again, you can manually parse it here:
        // JsonNode jsonNode = new ObjectMapper().readTree(rawEventMessage);
    }
}