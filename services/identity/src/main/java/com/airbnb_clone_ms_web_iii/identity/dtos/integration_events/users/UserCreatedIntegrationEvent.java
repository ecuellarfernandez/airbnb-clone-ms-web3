package com.airbnb_clone_ms_web_iii.identity.dtos.integration_events.users;

import com.airbnb_clone_ms_web_iii.identity.dtos.integration_events.BaseIntegrationEvent;
import com.airbnb_clone_ms_web_iii.identity.models.users.User;
import lombok.Data;

@Data
public class UserCreatedIntegrationEvent extends BaseIntegrationEvent<User> {
    public UserCreatedIntegrationEvent(User data) {
        this.userId = "0";
        this.eventType = "USER_CREATED";
        this.timestamp = String.valueOf(System.currentTimeMillis());
        this.data = data;
    }
}
