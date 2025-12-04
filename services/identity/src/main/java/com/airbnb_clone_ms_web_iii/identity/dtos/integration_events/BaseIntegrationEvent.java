package com.airbnb_clone_ms_web_iii.identity.dtos.integration_events;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.Date;

import static com.fasterxml.jackson.databind.type.LogicalType.DateTime;

@Data
public class BaseIntegrationEvent<T> {
    public String userId;
    public String eventType;
    public String timestamp;
    public T data;

    public BaseIntegrationEvent() {
    }

    public BaseIntegrationEvent(String userId, String eventType, T data) {
        this.userId = userId;
        this.eventType = eventType;
        this.timestamp = String.valueOf(LocalDateTime.now().toString());
        this.data = data;
    }

    public BaseIntegrationEvent(T data){
        this.timestamp = String.valueOf(LocalDateTime.now().toString());
        this.data = data;
    }
}


