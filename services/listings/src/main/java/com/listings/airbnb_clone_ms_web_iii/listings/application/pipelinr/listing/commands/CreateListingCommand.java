package com.listings.airbnb_clone_ms_web_iii.listings.application.pipelinr.listing.commands;

import an.awesome.pipelinr.Command;
import com.listings.airbnb_clone_ms_web_iii.listings.application.dto.request.CreateListingDTO;
import com.listings.airbnb_clone_ms_web_iii.listings.application.dto.response.ListingDetailDTO;
import com.listings.airbnb_clone_ms_web_iii.listings.domain.model.Listing;

public class CreateListingCommand implements Command<ListingDetailDTO> {

    public CreateListingDTO createListingDTO;

    public CreateListingCommand(CreateListingDTO createListingDTO) {
        this.createListingDTO = createListingDTO;
    }
}
