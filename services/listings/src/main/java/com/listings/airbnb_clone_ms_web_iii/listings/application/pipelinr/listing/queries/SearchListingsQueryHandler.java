package com.listings.airbnb_clone_ms_web_iii.listings.application.pipelinr.listing.queries;

import an.awesome.pipelinr.Command;
import com.listings.airbnb_clone_ms_web_iii.listings.application.dto.response.ListingSummaryDTO;
import com.listings.airbnb_clone_ms_web_iii.listings.application.port.ListingServicePort;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class SearchListingsQueryHandler implements Command.Handler<SearchListingsQuery, List<ListingSummaryDTO>> {

    private final ListingServicePort listingService;

    public SearchListingsQueryHandler(ListingServicePort listingService) {
        this.listingService = listingService;
    }

    @Override
    public List<ListingSummaryDTO> handle(SearchListingsQuery query) {
        if (!query.hasFilters()) {
            return listingService.findAllActive();
        }

        return listingService.findByFilters(
                query.getCity(),
                query.getMinPrice(),
                query.getMaxPrice(),
                query.getCapacity(),
                query.getCategoryId()
        );
    }
}

