package com.listings.airbnb_clone_ms_web_iii.listings.application.port;

import com.listings.airbnb_clone_ms_web_iii.listings.application.dto.common.PagedResult;
import com.listings.airbnb_clone_ms_web_iii.listings.application.dto.request.CreateBookingDTO;
import com.listings.airbnb_clone_ms_web_iii.listings.application.dto.response.BookingDetailDTO;
import com.listings.airbnb_clone_ms_web_iii.listings.application.dto.response.BookingSummaryDTO;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public interface BookingServicePort {

    BookingDetailDTO create(Integer guestId, CreateBookingDTO dto);

    BookingDetailDTO findById(UUID id);

    List<BookingSummaryDTO> findByGuestId(Integer guestId);

    List<BookingSummaryDTO> findByListingId(UUID listingId);

    PagedResult<BookingSummaryDTO> findByHostId(Integer hostId, Pageable pageable);

    void cancel(UUID bookingId, Integer guestId);

    // Opcional: list bookings for a listing + date range
    List<BookingSummaryDTO> findByListingAndRange(UUID listingId, LocalDate start, LocalDate end);

    // estoy añadiendo esto recién
    void confirm(UUID bookingId);
}
