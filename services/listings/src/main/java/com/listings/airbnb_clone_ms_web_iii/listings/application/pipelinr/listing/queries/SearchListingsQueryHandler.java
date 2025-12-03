package com.listings.airbnb_clone_ms_web_iii.listings.application.pipelinr.listing.queries;

import an.awesome.pipelinr.Command;
import com.listings.airbnb_clone_ms_web_iii.listings.application.dto.common.PagedResult;
import com.listings.airbnb_clone_ms_web_iii.listings.application.dto.response.ListingSummaryDTO;
import com.listings.airbnb_clone_ms_web_iii.listings.application.port.ListingServicePort;
import org.springframework.stereotype.Component;

@Component
public class SearchListingsQueryHandler implements Command.Handler<SearchListingsQuery, PagedResult<ListingSummaryDTO>> {

    private final ListingServicePort listingService;

    public SearchListingsQueryHandler(ListingServicePort listingService) {
        this.listingService = listingService;
    }

    @Override
    public PagedResult<ListingSummaryDTO> handle(SearchListingsQuery query) {
        if (!query.hasFilters()) {
            return listingService.findAllActive(query.getPageable());
        }

        return listingService.findByFilters(
                query.getCity(),
                query.getMinPrice(),
                query.getMaxPrice(),
                query.getCapacity(),
                query.getCategoryId(),
                query.getPageable()
        );
    }
}

