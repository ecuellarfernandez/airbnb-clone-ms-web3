package com.listings.airbnb_clone_ms_web_iii.listings.application.pipelinr.listing.queries;

import an.awesome.pipelinr.Command;
import com.listings.airbnb_clone_ms_web_iii.listings.application.dto.response.ListingDetailDTO;

import java.util.UUID;

public class GetListingByIdQuery implements Command<ListingDetailDTO> {

    private final UUID listingId;

    public GetListingByIdQuery(UUID listingId) {
        this.listingId = listingId;
    }

    public UUID getListingId() {
        return listingId;
    }
}

