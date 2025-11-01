package com.airbnb_clone_ms_web_iii.identity.dtos.events.roles;

import com.airbnb_clone_ms_web_iii.identity.dtos.events.BaseEvent;
import com.airbnb_clone_ms_web_iii.identity.models.roles.Claim;

public class ClaimAddedEvent extends BaseEvent<Claim> {

    private String roleId;

    public ClaimAddedEvent(Long userId, Claim data, Long roleId) {
        this.userId = userId.toString();
        this.roleId = roleId.toString();
        this.eventType = "CLAIM_ADDED";
        this.timestamp = String.valueOf(System.currentTimeMillis());
        this.data = data;
    }

}
