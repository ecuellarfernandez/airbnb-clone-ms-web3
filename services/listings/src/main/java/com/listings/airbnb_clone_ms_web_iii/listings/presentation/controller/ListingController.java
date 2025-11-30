package com.listings.airbnb_clone_ms_web_iii.listings.presentation.controller;

import an.awesome.pipelinr.Pipeline;
import an.awesome.pipelinr.Pipelinr;
import com.listings.airbnb_clone_ms_web_iii.listings.application.dto.common.StandardResult;
import com.listings.airbnb_clone_ms_web_iii.listings.application.dto.request.CreateListingDTO;
import com.listings.airbnb_clone_ms_web_iii.listings.application.dto.request.UpdateListingDTO;
import com.listings.airbnb_clone_ms_web_iii.listings.application.dto.response.ListingDetailDTO;
import com.listings.airbnb_clone_ms_web_iii.listings.application.dto.response.ListingSummaryDTO;
import com.listings.airbnb_clone_ms_web_iii.listings.application.pipelinr.listing.commands.CreateListingCommand;
import com.listings.airbnb_clone_ms_web_iii.listings.application.port.ListingServicePort;
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
    private final ListingServicePort listingService;
    private final Pipeline pipeline;

    public ListingController(ListingServicePort listingService, Pipeline pipeline) {
        this.listingService = listingService;
        this.pipeline = pipeline;
    }

    // CREATE
    @PostMapping
    @Operation(summary = "Crear listing")
    public ResponseEntity<StandardResult<ListingDetailDTO>> create(
            @Valid @RequestBody CreateListingDTO dto
    ) {
        try {
            logger.info("Creating listing: " + dto.getTitle());

            CreateListingCommand command = new CreateListingCommand(dto);
            ListingDetailDTO created = command.execute(pipeline);

            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(StandardResult.success(created, "Listing created successfully"));

        } catch (IllegalArgumentException e) {
            logger.warning("Invalid argument: " + e.getMessage());
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(StandardResult.error(e.getMessage(), "INVALID_INPUT"));

        } catch (Exception e) {
            logger.severe("Error creating listing: " + e.getMessage());
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(StandardResult.error("Failed to create listing", "INTERNAL_ERROR"));
        }
    }

    // READ

    @GetMapping("/{id}")
    @Operation(summary = "Obtener listing por ID")
    public ResponseEntity<StandardResult<ListingDetailDTO>> getById(@PathVariable UUID id) {
        try {
            logger.info("Getting listing: " + id);

            ListingDetailDTO listing = listingService.findById(id);

            return ResponseEntity.ok(StandardResult.success(listing));

        } catch (RuntimeException e) {
            logger.warning("Listing not found: " + id);
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(StandardResult.error("Listing not found", "NOT_FOUND"));

        } catch (Exception e) {
            logger.severe("Error getting listing: " + e.getMessage());
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(StandardResult.error("Failed to get listing", "INTERNAL_ERROR"));
        }
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
        try {
            logger.info("Searching listings - city: " + city);

            List<ListingSummaryDTO> listings;

            if (city == null && minPrice == null && maxPrice == null && capacity == null && categoryId == null) {
                listings = listingService.findAllActive();
            } else {
                listings = listingService.findByFilters(city, minPrice, maxPrice, capacity, categoryId);
            }

            String message = listings.size() + " listings found";
            return ResponseEntity.ok(StandardResult.success(listings, message));

        } catch (Exception e) {
            logger.severe("Error searching listings: " + e.getMessage());
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(StandardResult.error("Failed to search listings", "INTERNAL_ERROR"));
        }
    }

    @GetMapping("/host/{hostId}")
    @Operation(summary = "Obtener listings de un anfitrión")
    public ResponseEntity<StandardResult<List<ListingSummaryDTO>>> getByHost(@PathVariable UUID hostId) {
        try {
            logger.info("Getting listings by host: " + hostId);

            List<ListingSummaryDTO> listings = listingService.findByHostId(hostId);

            return ResponseEntity.ok(StandardResult.success(listings));

        } catch (Exception e) {
            logger.severe("Error getting listings by host: " + e.getMessage());
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(StandardResult.error("Failed to get host listings", "INTERNAL_ERROR"));
        }
    }

    // UPDATE

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar listing")
    public ResponseEntity<StandardResult<ListingDetailDTO>> update(
            @PathVariable UUID id,
            @Valid @RequestBody UpdateListingDTO dto
    ) {
        try {
            logger.info("Updating listing: " + id);

            ListingDetailDTO updated = listingService.update(id, dto);

            return ResponseEntity.ok(StandardResult.success(updated, "Listing updated successfully"));

        } catch (RuntimeException e) {
            logger.warning("Listing not found: " + id);
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(StandardResult.error("Listing not found", "NOT_FOUND"));

        } catch (Exception e) {
            logger.severe("Error updating listing: " + e.getMessage());
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(StandardResult.error("Failed to update listing", "INTERNAL_ERROR"));
        }
    }

    @PatchMapping("/{id}/publish")
    @Operation(summary = "Publicar listing")
    public ResponseEntity<StandardResult<Void>> publish(@PathVariable UUID id) {
        try {
            logger.info("Publishing listing: " + id);

            listingService.activate(id);

            return ResponseEntity.ok(StandardResult.success(null, "Listing published successfully"));

        } catch (IllegalStateException e) {
            logger.warning("Cannot publish listing: " + e.getMessage());
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(StandardResult.error(e.getMessage(), "VALIDATION_ERROR"));

        } catch (RuntimeException e) {
            logger.warning("Listing not found: " + id);
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(StandardResult.error("Listing not found", "NOT_FOUND"));

        } catch (Exception e) {
            logger.severe("Error publishing listing: " + e.getMessage());
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(StandardResult.error("Failed to publish listing", "INTERNAL_ERROR"));
        }
    }

    @PatchMapping("/{id}/unpublish")
    @Operation(summary = "Despublicar listing")
    public ResponseEntity<StandardResult<Void>> unpublish(@PathVariable UUID id) {
        try {
            logger.info("Unpublishing listing: " + id);

            listingService.deactivate(id);

            return ResponseEntity.ok(StandardResult.success(null, "Listing unpublished successfully"));

        } catch (RuntimeException e) {
            logger.warning("Listing not found: " + id);
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(StandardResult.error("Listing not found", "NOT_FOUND"));

        } catch (Exception e) {
            logger.severe("Error unpublishing listing: " + e.getMessage());
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(StandardResult.error("Failed to unpublish listing", "INTERNAL_ERROR"));
        }
    }

    // DELETE

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar listing")
    public ResponseEntity<StandardResult<Void>> delete(@PathVariable UUID id) {
        try {
            logger.info("Deleting listing: " + id);

            listingService.delete(id);

            return ResponseEntity.ok(StandardResult.success(null, "Listing deleted successfully"));

        } catch (RuntimeException e) {
            logger.warning("Listing not found: " + id);
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(StandardResult.error("Listing not found", "NOT_FOUND"));

        } catch (Exception e) {
            logger.severe("Error deleting listing: " + e.getMessage());
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(StandardResult.error("Failed to delete listing", "INTERNAL_ERROR"));
        }
    }
}
