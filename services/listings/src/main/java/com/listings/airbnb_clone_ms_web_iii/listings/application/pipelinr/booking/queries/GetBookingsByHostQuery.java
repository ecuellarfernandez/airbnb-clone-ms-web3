package com.listings.airbnb_clone_ms_web_iii.listings.application.pipelinr.booking.queries;

import an.awesome.pipelinr.Command;
import com.listings.airbnb_clone_ms_web_iii.listings.application.dto.common.PagedResult;
import com.listings.airbnb_clone_ms_web_iii.listings.application.dto.response.BookingSummaryDTO;
import org.springframework.data.domain.Pageable;

public class GetBookingsByHostQuery implements Command<PagedResult<BookingSummaryDTO>> {
    public final Integer hostId;
    public final Pageable pageable;

    public GetBookingsByHostQuery(Integer hostId, Pageable pageable) {
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
