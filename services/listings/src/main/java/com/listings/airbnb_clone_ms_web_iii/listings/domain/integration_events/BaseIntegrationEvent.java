package com.listings.airbnb_clone_ms_web_iii.listings.domain.integration_events;

public class BaseIntegrationEvent<T> {
    public String userId;
    public String eventType;
    public String timestamp;
    public T data;

    public BaseIntegrationEvent(T data, String userId, String eventType) {
        this.userId = userId;
        this.eventType = eventType;
        this.timestamp = String.valueOf(System.currentTimeMillis());
        this.data = data;
    }
}
