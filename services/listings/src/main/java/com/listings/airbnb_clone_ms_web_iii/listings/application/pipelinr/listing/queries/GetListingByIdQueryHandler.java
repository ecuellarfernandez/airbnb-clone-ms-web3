package com.listings.airbnb_clone_ms_web_iii.listings.application.pipelinr.listing.queries;

import an.awesome.pipelinr.Command;
import com.listings.airbnb_clone_ms_web_iii.listings.application.dto.response.ListingDetailDTO;
import com.listings.airbnb_clone_ms_web_iii.listings.application.port.ListingServicePort;
import org.springframework.stereotype.Component;

@Component
public class GetListingByIdQueryHandler implements Command.Handler<GetListingByIdQuery, ListingDetailDTO> {

    private final ListingServicePort listingService;

    public GetListingByIdQueryHandler(ListingServicePort listingService) {
        this.listingService = listingService;
    }

    @Override
    public ListingDetailDTO handle(GetListingByIdQuery query) {
        return listingService.findById(query.getListingId());
    }
}

