package com.listings.airbnb_clone_ms_web_iii.listings.application.pipelinr.listing.queries;

import an.awesome.pipelinr.Command;
import com.listings.airbnb_clone_ms_web_iii.listings.application.dto.response.ListingSummaryDTO;
import com.listings.airbnb_clone_ms_web_iii.listings.application.port.ListingServicePort;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class GetListingsByHostQueryHandler implements Command.Handler<GetListingsByHostQuery, List<ListingSummaryDTO>> {

    private final ListingServicePort listingService;

    public GetListingsByHostQueryHandler(ListingServicePort listingService) {
        this.listingService = listingService;
    }

    @Override
    public List<ListingSummaryDTO> handle(GetListingsByHostQuery query) {
        return listingService.findByHostId(query.getHostId());
    }
}

