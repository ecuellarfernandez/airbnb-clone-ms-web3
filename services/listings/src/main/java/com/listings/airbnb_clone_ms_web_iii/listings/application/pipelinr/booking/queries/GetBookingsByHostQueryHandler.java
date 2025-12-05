package com.listings.airbnb_clone_ms_web_iii.listings.application.pipelinr.booking.queries;

import an.awesome.pipelinr.Command;
import com.listings.airbnb_clone_ms_web_iii.listings.application.dto.common.PagedResult;
import com.listings.airbnb_clone_ms_web_iii.listings.application.dto.response.BookingSummaryDTO;
import com.listings.airbnb_clone_ms_web_iii.listings.application.port.BookingServicePort;
import com.listings.airbnb_clone_ms_web_iii.listings.application.service.BookingApplicationService;
import com.listings.airbnb_clone_ms_web_iii.listings.domain.repository.BookingRepository;
import org.springframework.stereotype.Component;

@Component
public class GetBookingsByHostQueryHandler implements Command.Handler<GetBookingsByHostQuery, PagedResult<BookingSummaryDTO>> {

    private final BookingServicePort bookingRepository;

    public GetBookingsByHostQueryHandler(BookingServicePort bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    @Override
    public PagedResult<BookingSummaryDTO> handle(GetBookingsByHostQuery command) {
        return bookingRepository.findByHostId(command.getHostId(), command.getPageable());
    }
}
