package com.listings.airbnb_clone_ms_web_iii.listings.application.pipelinr.listing.commands;

import an.awesome.pipelinr.Command;
import an.awesome.pipelinr.Voidy;

import java.util.UUID;

public class ActivateListingCommand implements Command<Voidy> {

    private final UUID listingId;

    public ActivateListingCommand(UUID listingId) {
        this.listingId = listingId;
    }

    public UUID getListingId() {
        return listingId;
    }
}

