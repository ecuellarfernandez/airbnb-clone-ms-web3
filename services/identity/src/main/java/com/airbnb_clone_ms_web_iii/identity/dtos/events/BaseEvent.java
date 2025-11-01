package com.airbnb_clone_ms_web_iii.identity.dtos.events;

import lombok.Data;

@Data
public class BaseEvent<T> {
    public String userId;
    public String eventType;
    public String timestamp;
    public T data;
}


