package com.listings.airbnb_clone_ms_web_iii.listings.application.mapper;

import com.listings.airbnb_clone_ms_web_iii.listings.application.dto.response.BookingDetailDTO;
import com.listings.airbnb_clone_ms_web_iii.listings.application.dto.response.BookingSummaryDTO;
import com.listings.airbnb_clone_ms_web_iii.listings.domain.model.Booking;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.WARN)
public interface BookingMapper {

    BookingDetailDTO toDetailDTO(Booking booking);

    BookingSummaryDTO toSummaryDTO(Booking booking);

    List<BookingSummaryDTO> toSummaryDTOList(List<Booking> bookings);

}
