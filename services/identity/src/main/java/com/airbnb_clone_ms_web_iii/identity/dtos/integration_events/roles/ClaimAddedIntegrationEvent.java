package com.airbnb_clone_ms_web_iii.identity.dtos.integration_events.roles;

import com.airbnb_clone_ms_web_iii.identity.dtos.integration_events.BaseIntegrationEvent;
import com.airbnb_clone_ms_web_iii.identity.models.roles.Claim;

public class ClaimAddedIntegrationEvent extends BaseIntegrationEvent<Claim> {

    private String roleId;

    public ClaimAddedIntegrationEvent(Long userId, Claim data, Long roleId) {
        this.userId = userId.toString();
        this.roleId = roleId.toString();
        this.eventType = "CLAIM_ADDED";
        this.timestamp = String.valueOf(System.currentTimeMillis());
        this.data = data;
    }

}
