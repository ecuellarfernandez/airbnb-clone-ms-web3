package com.listings.airbnb_clone_ms_web_iii.listings.application.pipelinr.listing.queries;

import an.awesome.pipelinr.Command;
import com.listings.airbnb_clone_ms_web_iii.listings.application.dto.response.ListingSummaryDTO;

import java.util.List;
import java.util.UUID;

public class GetListingsByHostQuery implements Command<List<ListingSummaryDTO>> {

    private final UUID hostId;

    public GetListingsByHostQuery(UUID hostId) {
        this.hostId = hostId;
    }

    public UUID getHostId() {
        return hostId;
    }
}

