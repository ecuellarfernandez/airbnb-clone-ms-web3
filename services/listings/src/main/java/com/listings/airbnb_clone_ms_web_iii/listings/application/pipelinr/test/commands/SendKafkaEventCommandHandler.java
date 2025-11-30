package com.listings.airbnb_clone_ms_web_iii.listings.application.pipelinr.test.commands;

import an.awesome.pipelinr.Command;
import com.listings.airbnb_clone_ms_web_iii.listings.domain.classifiers.kafka.producible.ProducibleEvents;
import com.listings.airbnb_clone_ms_web_iii.listings.domain.classifiers.kafka.producible.ProducibleTopics;
import com.listings.airbnb_clone_ms_web_iii.listings.domain.integration_events.BaseIntegrationEvent;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
public class SendKafkaEventCommandHandler implements Command.Handler<SendKafkaEventCommand, String> {
    private final KafkaTemplate<String, Object> kafkaTemplate;

    public SendKafkaEventCommandHandler(KafkaTemplate<String, Object> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    @Override
    public String handle(SendKafkaEventCommand sendKafkaEventCommand) {
        BaseIntegrationEvent<String> event = new BaseIntegrationEvent<>(sendKafkaEventCommand.eventData, "0", sendKafkaEventCommand.eventType);
        kafkaTemplate.send(ProducibleTopics.TEST_TOPIC, event);
        return event.data;
    }
}
