package com.airbnb_clone_ms_web_iii.identity.dtos.events.users;

import com.airbnb_clone_ms_web_iii.identity.dtos.events.BaseEvent;
import com.airbnb_clone_ms_web_iii.identity.dtos.events.EventType;
import com.airbnb_clone_ms_web_iii.identity.models.users.User;
import lombok.Data;

@Data
public class UserCreatedEvent extends BaseEvent<User> {
    public UserCreatedEvent(User data) {
        this.userId = "0";
        this.eventType = "USER_CREATED";
        this.timestamp = String.valueOf(System.currentTimeMillis());
        this.data = data;
    }
}
