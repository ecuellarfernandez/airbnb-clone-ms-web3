package com.listings.airbnb_clone_ms_web_iii.listings.presentation.controller;

import an.awesome.pipelinr.Pipeline;
import com.listings.airbnb_clone_ms_web_iii.listings.application.dto.common.PagedResult;
import com.listings.airbnb_clone_ms_web_iii.listings.application.dto.common.StandardResult;
import com.listings.airbnb_clone_ms_web_iii.listings.application.dto.request.CreateBookingDTO;
import com.listings.airbnb_clone_ms_web_iii.listings.application.dto.response.BookingDetailDTO;
import com.listings.airbnb_clone_ms_web_iii.listings.application.dto.response.BookingSummaryDTO;
import com.listings.airbnb_clone_ms_web_iii.listings.application.pipelinr.booking.commands.CancelBookingCommand;
import com.listings.airbnb_clone_ms_web_iii.listings.application.pipelinr.booking.commands.CreateBookingCommand;
import com.listings.airbnb_clone_ms_web_iii.listings.application.pipelinr.booking.queries.GetBookingByIdQuery;
import com.listings.airbnb_clone_ms_web_iii.listings.application.pipelinr.booking.queries.GetBookingsByGuestQuery;
import com.listings.airbnb_clone_ms_web_iii.listings.application.pipelinr.booking.queries.GetBookingsByHostQuery;
import com.listings.airbnb_clone_ms_web_iii.listings.application.pipelinr.booking.queries.GetBookingsByListingQuery;
import com.listings.airbnb_clone_ms_web_iii.listings.infrastructure.config.PaginationConfig;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.logging.Logger;

@RestController
@RequestMapping("/api/reservations")
@Tag(name = "Bookings", description = "API para gestión de reservas")
@CrossOrigin(origins = "*")
public class BookingController {

    private static final Logger logger = Logger.getLogger(BookingController.class.getName());
    private final Pipeline pipeline;
    private final PaginationConfig paginationConfig;

    public BookingController(Pipeline pipeline, PaginationConfig paginationConfig)
    {
        this.pipeline = pipeline;
        this.paginationConfig = paginationConfig;
    }

    @PostMapping
    @Operation(summary = "Crear reserva (solicitud de reservar)")
    public ResponseEntity<StandardResult<BookingDetailDTO>> create(
            @RequestHeader("X-User-Id") Integer guestId,
            @Valid @RequestBody CreateBookingDTO dto
    ) {
        logger.info("Creating booking for listing " + dto.getListingId() + " by guest " + guestId);

        CreateBookingCommand command = new CreateBookingCommand(guestId, dto);
        BookingDetailDTO booking = pipeline.send(command);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(StandardResult.success(booking, "Booking created successfully"));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener reserva por ID")
    public ResponseEntity<StandardResult<BookingDetailDTO>> getById(@PathVariable UUID id) {
        GetBookingByIdQuery query = new GetBookingByIdQuery(id);
        BookingDetailDTO booking = pipeline.send(query);
        return ResponseEntity.ok(StandardResult.success(booking));
    }

    @GetMapping("/me")
    @Operation(summary = "Obtener reservas del huésped autenticado")
    public ResponseEntity<StandardResult<List<BookingSummaryDTO>>> getMyBookings(
            @RequestHeader("X-User-Id") Integer guestId
    ) {
        GetBookingsByGuestQuery query = new GetBookingsByGuestQuery(guestId);
        List<BookingSummaryDTO> bookings = pipeline.send(query);
        return ResponseEntity.ok(StandardResult.success(bookings));
    }

    @GetMapping("/listing/{listingId}")
    @Operation(summary = "Obtener reservas por listing")
    public ResponseEntity<StandardResult<List<BookingSummaryDTO>>> getByListing(
            @PathVariable UUID listingId
    ) {
        GetBookingsByListingQuery query = new GetBookingsByListingQuery(listingId);
        List<BookingSummaryDTO> bookings = pipeline.send(query);
        return ResponseEntity.ok(StandardResult.success(bookings));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Cancelar reserva")
    public ResponseEntity<StandardResult<Void>> cancel(
            @PathVariable UUID id,
            @RequestHeader("X-User-Id") Integer guestId
    ) {
        CancelBookingCommand command = new CancelBookingCommand(id, guestId);
        pipeline.send(command);

        return ResponseEntity.ok(StandardResult.success(null, "Booking cancelled successfully"));
    }

    @GetMapping("/host/{hostId}")
    @Operation(summary = "Obtener reservas por host")
    public ResponseEntity<PagedResult<BookingSummaryDTO>> getByHost(
            @PathVariable Integer hostId,
            @Parameter(description = "Número de página (0-based)")
            @RequestParam(defaultValue = "0")
            @Min(value = 0, message = "Page number must be >= 0")
            int page,
            @Parameter(description = "Tamaño de página (máximo configurado)")
            @RequestParam(defaultValue = "10")
            @Min(value = 1, message = "Page size must be >= 1")
            int size
    ) {

        // Aplicar límite máximo de tamaño de página usando config central
        int validatedSize = clampPageSize(size);

        logger.info("Getting listings by host: " + hostId + ", page: " + page + ", size: " + validatedSize);

        Pageable pageable = PageRequest.of(page, validatedSize);

        GetBookingsByHostQuery query = new GetBookingsByHostQuery(hostId, pageable);
        PagedResult<BookingSummaryDTO> pagedResult = pipeline.send(query);

        return ResponseEntity.ok(pagedResult);
    }

    private int clampPageSize(int requestedSize) {
        int max = paginationConfig.getMaxPageSize();
        int size = Math.max(1, requestedSize);
        if (size > max) {
            logger.warning("Page size " + requestedSize + " exceeds maximum, using " + max);
            size = max;
        }
        return size;
    }


}
