package com.listings.airbnb_clone_ms_web_iii.listings.application.pipelinr.listing.queries;

import an.awesome.pipelinr.Command;
import com.listings.airbnb_clone_ms_web_iii.listings.application.dto.common.PagedResult;
import com.listings.airbnb_clone_ms_web_iii.listings.application.dto.response.ListingSummaryDTO;
import com.listings.airbnb_clone_ms_web_iii.listings.application.port.ListingServicePort;
import org.springframework.stereotype.Component;

@Component
public class SearchListingsForAdminQueryHandler implements Command.Handler<SearchListingsForAdminQuery, PagedResult<ListingSummaryDTO>>{

    private final ListingServicePort listingService;

    public SearchListingsForAdminQueryHandler(ListingServicePort listingService) {
        this.listingService = listingService;
    }

    @Override
    public PagedResult<ListingSummaryDTO> handle(SearchListingsForAdminQuery searchListingsQuery) {
        return listingService.findAllForAdmin(
                searchListingsQuery.getCity(),
                searchListingsQuery.getMinPrice(),
                searchListingsQuery.getMaxPrice(),
                searchListingsQuery.getCapacity(),
                searchListingsQuery.getCategoryId(),
                searchListingsQuery.getPageable()
        );
    }
}
