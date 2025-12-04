package com.listings.airbnb_clone_ms_web_iii.listings.application.pipelinr.listing.commands;

import an.awesome.pipelinr.Command;
import an.awesome.pipelinr.Voidy;

import java.util.UUID;

public class DeactivateListingCommand implements Command<Voidy> {

    private final UUID listingId;
    public Integer userId = 0;

    public DeactivateListingCommand(UUID listingId, Integer userId) {
        this.listingId = listingId;
        this.userId = userId;
    }

    public UUID getListingId() {
        return listingId;
    }
}

