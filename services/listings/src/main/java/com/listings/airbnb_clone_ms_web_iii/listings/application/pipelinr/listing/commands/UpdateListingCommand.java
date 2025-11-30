package com.listings.airbnb_clone_ms_web_iii.listings.application.pipelinr.listing.commands;

import an.awesome.pipelinr.Command;
import com.listings.airbnb_clone_ms_web_iii.listings.application.dto.request.UpdateListingDTO;
import com.listings.airbnb_clone_ms_web_iii.listings.application.dto.response.ListingDetailDTO;

import java.util.UUID;

public class UpdateListingCommand implements Command<ListingDetailDTO> {

    private final UUID listingId;
    private final UpdateListingDTO updateListingDTO;

    public UpdateListingCommand(UUID listingId, UpdateListingDTO updateListingDTO) {
        this.listingId = listingId;
        this.updateListingDTO = updateListingDTO;
    }

    public UUID getListingId() {
        return listingId;
    }

    public UpdateListingDTO getUpdateListingDTO() {
        return updateListingDTO;
    }
}

