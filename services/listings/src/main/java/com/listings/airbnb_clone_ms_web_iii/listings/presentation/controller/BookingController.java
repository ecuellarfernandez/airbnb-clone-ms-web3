package com.listings.airbnb_clone_ms_web_iii.listings.presentation.controller;

import an.awesome.pipelinr.Pipeline;
import com.listings.airbnb_clone_ms_web_iii.listings.application.dto.common.StandardResult;
import com.listings.airbnb_clone_ms_web_iii.listings.application.dto.request.CreateBookingDTO;
import com.listings.airbnb_clone_ms_web_iii.listings.application.dto.response.BookingDetailDTO;
import com.listings.airbnb_clone_ms_web_iii.listings.application.dto.response.BookingSummaryDTO;
import com.listings.airbnb_clone_ms_web_iii.listings.application.pipelinr.booking.commands.CancelBookingCommand;
import com.listings.airbnb_clone_ms_web_iii.listings.application.pipelinr.booking.commands.CreateBookingCommand;
import com.listings.airbnb_clone_ms_web_iii.listings.application.pipelinr.booking.queries.GetBookingByIdQuery;
import com.listings.airbnb_clone_ms_web_iii.listings.application.pipelinr.booking.queries.GetBookingsByGuestQuery;
import com.listings.airbnb_clone_ms_web_iii.listings.application.pipelinr.booking.queries.GetBookingsByListingQuery;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.logging.Logger;

@RestController
@RequestMapping("/api/bookings")
@Tag(name = "Bookings", description = "API para gestión de reservas")
@CrossOrigin(origins = "*")
public class BookingController {

    private static final Logger logger = Logger.getLogger(BookingController.class.getName());
    private final Pipeline pipeline;

    public BookingController(Pipeline pipeline) {
        this.pipeline = pipeline;
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

}
