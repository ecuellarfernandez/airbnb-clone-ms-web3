package com.listings.airbnb_clone_ms_web_iii.listings.domain.services.integration_events;

public interface IntegrationEventConsumerInt {
    void handle(String eventJson);
}
