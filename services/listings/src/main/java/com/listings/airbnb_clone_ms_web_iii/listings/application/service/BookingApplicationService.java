package com.listings.airbnb_clone_ms_web_iii.listings.application.service;

import com.listings.airbnb_clone_ms_web_iii.listings.application.dto.common.PagedResult;
import com.listings.airbnb_clone_ms_web_iii.listings.application.dto.request.CreateBookingDTO;
import com.listings.airbnb_clone_ms_web_iii.listings.application.dto.response.BookingDetailDTO;
import com.listings.airbnb_clone_ms_web_iii.listings.application.dto.response.BookingSummaryDTO;
import com.listings.airbnb_clone_ms_web_iii.listings.application.mapper.BookingMapper;
import com.listings.airbnb_clone_ms_web_iii.listings.application.port.BookingServicePort;
import com.listings.airbnb_clone_ms_web_iii.listings.domain.domain_services.ListingDomainService;
import com.listings.airbnb_clone_ms_web_iii.listings.domain.model.Booking;
import com.listings.airbnb_clone_ms_web_iii.listings.domain.model.BookingStatus;
import com.listings.airbnb_clone_ms_web_iii.listings.domain.model.Listing;
import com.listings.airbnb_clone_ms_web_iii.listings.domain.repository.BookingRepository;
import com.listings.airbnb_clone_ms_web_iii.listings.domain.repository.ListingImageRepository;
import com.listings.airbnb_clone_ms_web_iii.listings.domain.repository.ListingRepository;
import com.listings.airbnb_clone_ms_web_iii.listings.presentation.exception.ListingNotFoundException;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.UUID;

@Service
@Transactional
public class BookingApplicationService implements BookingServicePort {

    private final BookingRepository bookingRepository;
    private final ListingRepository listingRepository;
    private final ListingDomainService listingDomainService;
    private final BookingMapper bookingMapper;

    public BookingApplicationService(BookingRepository bookingRepository,
                                     ListingRepository listingRepository,
                                     ListingDomainService listingDomainService,
                                     BookingMapper bookingMapper) {
        this.bookingRepository = bookingRepository;
        this.listingRepository = listingRepository;
        this.listingDomainService = listingDomainService;
        this.bookingMapper = bookingMapper;
    }

    @Override
    public BookingDetailDTO create(Integer guestId, CreateBookingDTO dto) {


        Listing listing = listingRepository.findByIdWithRelations(dto.getListingId())
                .orElseThrow(() -> new ListingNotFoundException(
                        "Listing not found with id: " + dto.getListingId()
                ));

        // Validación para que el listing esté activo
        if (!Boolean.TRUE.equals(listing.getActive())) {
            throw new IllegalStateException("Listing must be active to create a booking");
        }

        LocalDate checkIn = dto.getCheckIn();
        LocalDate checkOut = dto.getCheckOut();

        if (!checkOut.isAfter(checkIn)) {
            throw new IllegalArgumentException("Check-out must be after check-in");
        }

        int nights = (int) ChronoUnit.DAYS.between(checkIn, checkOut);
        BigDecimal pricePerNight = listing.getPrice().getAmount();
        BigDecimal totalPrice = listingDomainService.calculateTotalPrice(pricePerNight, nights);

        // En aqui se validaque no haya reservas activas que se crucen en ese rango de fechas
        if (!bookingRepository
                .findActiveBookingsByListingAndRange(listing.getId(), checkIn, checkOut)
                .isEmpty()) {
            throw new IllegalStateException("Listing is already booked in the selected dates");
        }

        // booking se crea con estado PENDING mis inginieros
        Booking booking = new Booking();
        booking.setListingId(listing.getId());
        booking.setGuestId(guestId);
        booking.setCheckIn(checkIn);
        booking.setCheckOut(checkOut);
        booking.setNights(nights);
        booking.setPricePerNight(pricePerNight);
        booking.setTotalPrice(totalPrice);
        booking.setCurrency(listing.getPrice().getCurrency());
        booking.setStatus(BookingStatus.PENDING);

        Booking saved = bookingRepository.save(booking);

        return bookingMapper.toDetailDTO(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public BookingDetailDTO findById(UUID id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Booking not found with id: " + id));
        return bookingMapper.toDetailDTO(booking);
    }

    @Override
    @Transactional(readOnly = true)
    public List<BookingSummaryDTO> findByGuestId(Integer guestId) {
        return bookingMapper.toSummaryDTOList(bookingRepository.findByGuestId(guestId));
    }

    @Override
    @Transactional(readOnly = true)
    public List<BookingSummaryDTO> findByListingId(UUID listingId) {
        return bookingMapper.toSummaryDTOList(bookingRepository.findByListingId(listingId));
    }

    @Override
    public void cancel(UUID bookingId, Integer guestId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new IllegalArgumentException("Booking not found with id: " + bookingId));

        // Si viene de UI (guestId != null), valido que el usuario sea el dueño
        if (guestId != null && !booking.getGuestId().equals(guestId)) {
            throw new IllegalStateException("Only booking owner can cancel this booking");
        }

        booking.cancel();
        bookingRepository.save(booking);
    }

    @Override
    public  void confirm(UUID bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new IllegalArgumentException("Booking not found with id: " + bookingId));

        if (booking.getStatus() != BookingStatus.PENDING) {
            throw new IllegalStateException("Only pending bookings can be confirmed");
        }

        booking.confirm();
        bookingRepository.save(booking);
    }

    @Override
    @Transactional(readOnly = true)
    public List<BookingSummaryDTO> findByListingAndRange(UUID listingId, LocalDate start, LocalDate end) {
        return bookingMapper.toSummaryDTOList(
                bookingRepository.findActiveBookingsByListingAndRange(listingId, start, end)
        );
    }

    @Override
    @Transactional(readOnly = true)
    public PagedResult<BookingSummaryDTO> findByHostId(Integer hostId, Pageable pageable) {
        var bookingsPage = bookingRepository.findByHostId(hostId, pageable);

        var bookingDTOs = bookingMapper.toSummaryDTOList(bookingsPage.getContent());

        PagedResult<BookingSummaryDTO> pagedResult = new PagedResult<>();
        pagedResult.setContent(bookingDTOs);
        pagedResult.setPageNumber(bookingsPage.getNumber());
        pagedResult.setPageSize(bookingsPage.getSize());
        pagedResult.setTotalElements(bookingsPage.getTotalElements());
        pagedResult.setTotalPages(bookingsPage.getTotalPages());
        pagedResult.setLast(bookingsPage.isLast());
        return pagedResult;

    }

}
