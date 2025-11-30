package com.listings.airbnb_clone_ms_web_iii.listings.presentation.controller;

import an.awesome.pipelinr.Pipeline;
import com.listings.airbnb_clone_ms_web_iii.listings.application.dto.common.StandardResult;
import com.listings.airbnb_clone_ms_web_iii.listings.application.dto.request.CreateListingDTO;
import com.listings.airbnb_clone_ms_web_iii.listings.application.dto.request.UpdateListingDTO;
import com.listings.airbnb_clone_ms_web_iii.listings.application.dto.response.ListingDetailDTO;
import com.listings.airbnb_clone_ms_web_iii.listings.application.dto.response.ListingSummaryDTO;
import com.listings.airbnb_clone_ms_web_iii.listings.application.pipelinr.listing.commands.*;
import com.listings.airbnb_clone_ms_web_iii.listings.application.pipelinr.listing.queries.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;
import java.util.logging.Logger;

@RestController
@RequestMapping("/api/listings")
@Tag(name = "Listings", description = "API para gestión de alojamientos")
@CrossOrigin(origins = "*")
public class ListingController {

    private static final Logger logger = Logger.getLogger(ListingController.class.getName());
    private final Pipeline pipeline;

    public ListingController(Pipeline pipeline) {
        this.pipeline = pipeline;
    }

    // CREATE
    @PostMapping
    @Operation(summary = "Crear listing")
    public ResponseEntity<StandardResult<ListingDetailDTO>> create(@Valid @RequestBody CreateListingDTO dto) {
        logger.info("Creating listing: " + dto.getTitle());

        CreateListingCommand command = new CreateListingCommand(dto);
        ListingDetailDTO created = pipeline.send(command);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(StandardResult.success(created, "Listing created successfully"));
    }

    // READ

    @GetMapping("/{id}")
    @Operation(summary = "Obtener listing por ID")
    public ResponseEntity<StandardResult<ListingDetailDTO>> getById(@PathVariable UUID id) {
        logger.info("Getting listing: " + id);

        GetListingByIdQuery query = new GetListingByIdQuery(id);
        ListingDetailDTO listing = pipeline.send(query);

        return ResponseEntity.ok(StandardResult.success(listing));
    }

    @GetMapping
    @Operation(summary = "Buscar listings con filtros")
    public ResponseEntity<StandardResult<List<ListingSummaryDTO>>> search(
            @Parameter(description = "Ciudad") @RequestParam(required = false) String city,
            @Parameter(description = "Precio mínimo") @RequestParam(required = false) BigDecimal minPrice,
            @Parameter(description = "Precio máximo") @RequestParam(required = false) BigDecimal maxPrice,
            @Parameter(description = "Capacidad mínima") @RequestParam(required = false) Integer capacity,
            @Parameter(description = "ID de categoría") @RequestParam(required = false) UUID categoryId
    ) {
        logger.info("Searching listings - city: " + city);

        SearchListingsQuery query = new SearchListingsQuery(city, minPrice, maxPrice, capacity, categoryId);
        List<ListingSummaryDTO> listings = pipeline.send(query);

        String message = listings.size() + " listings found";
        return ResponseEntity.ok(StandardResult.success(listings, message));
    }

    @GetMapping("/host/{hostId}")
    @Operation(summary = "Obtener listings de un anfitrión")
    public ResponseEntity<StandardResult<List<ListingSummaryDTO>>> getByHost(@PathVariable UUID hostId) {
        logger.info("Getting listings by host: " + hostId);

        GetListingsByHostQuery query = new GetListingsByHostQuery(hostId);
        List<ListingSummaryDTO> listings = pipeline.send(query);

        return ResponseEntity.ok(StandardResult.success(listings));
    }

    // UPDATE

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar listing")
    public ResponseEntity<StandardResult<ListingDetailDTO>> update(
            @PathVariable UUID id,
            @Valid @RequestBody UpdateListingDTO dto
    ) {
        logger.info("Updating listing: " + id);

        UpdateListingCommand command = new UpdateListingCommand(id, dto);
        ListingDetailDTO updated = pipeline.send(command);

        return ResponseEntity.ok(StandardResult.success(updated, "Listing updated successfully"));
    }

    @PatchMapping("/{id}/publish")
    @Operation(summary = "Publicar listing")
    public ResponseEntity<StandardResult<Void>> publish(@PathVariable UUID id) {
        logger.info("Publishing listing: " + id);

        ActivateListingCommand command = new ActivateListingCommand(id);
        pipeline.send(command);

        return ResponseEntity.ok(StandardResult.success(null, "Listing published successfully"));
    }

    @PatchMapping("/{id}/unpublish")
    @Operation(summary = "Despublicar listing")
    public ResponseEntity<StandardResult<Void>> unpublish(@PathVariable UUID id) {
        logger.info("Unpublishing listing: " + id);

        DeactivateListingCommand command = new DeactivateListingCommand(id);
        pipeline.send(command);

        return ResponseEntity.ok(StandardResult.success(null, "Listing unpublished successfully"));
    }

    // DELETE

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar listing")
    public ResponseEntity<StandardResult<Void>> delete(@PathVariable UUID id) {
        logger.info("Deleting listing: " + id);

        DeleteListingCommand command = new DeleteListingCommand(id);
        pipeline.send(command);

        return ResponseEntity.ok(StandardResult.success(null, "Listing deleted successfully"));
    }
}
