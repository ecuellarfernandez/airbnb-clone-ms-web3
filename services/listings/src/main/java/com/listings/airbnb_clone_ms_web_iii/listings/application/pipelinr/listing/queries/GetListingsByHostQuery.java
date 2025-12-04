package com.listings.airbnb_clone_ms_web_iii.listings.application.pipelinr.listing.queries;

import an.awesome.pipelinr.Command;
import com.listings.airbnb_clone_ms_web_iii.listings.application.dto.common.PagedResult;
import com.listings.airbnb_clone_ms_web_iii.listings.application.dto.response.ListingSummaryDTO;
import org.springframework.data.domain.Pageable;

public class GetListingsByHostQuery implements Command<PagedResult<ListingSummaryDTO>> {

    private final Integer hostId;
    private final Pageable pageable;

    public GetListingsByHostQuery(Integer hostId, Pageable pageable) {
        this.hostId = hostId;
        this.pageable = pageable;
    }

    public Integer getHostId() {
        return hostId;
    }

    public Pageable getPageable() {
        return pageable;
    }
}

