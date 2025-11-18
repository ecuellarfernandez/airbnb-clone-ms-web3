package com.listings.airbnb_clone_ms_web_iii.listings.presentation.controller;

import com.listings.airbnb_clone_ms_web_iii.listings.application.dto.request.CreateListingDTO;
import com.listings.airbnb_clone_ms_web_iii.listings.application.dto.request.UpdateListingDTO;
import com.listings.airbnb_clone_ms_web_iii.listings.application.dto.response.ListingDetailDTO;
import com.listings.airbnb_clone_ms_web_iii.listings.application.dto.response.ListingSummaryDTO;
import com.listings.airbnb_clone_ms_web_iii.listings.application.port.ListingServicePort;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

/**
 * REST Controller para gestión de Listings.
 * Adaptador de entrada en arquitectura hexagonal.
 */
@RestController
@RequestMapping("/api/listings")
@Tag(name = "Listings", description = "Endpoints para gestion de alojamientos")
public class ListingController {

    private final ListingServicePort listingService;

    public ListingController(ListingServicePort listingService) {
        this.listingService = listingService;
    }

    // ========================================
    // CREATE - Solo para anfitriones autenticados
    // ========================================

    @PostMapping
    @Operation(summary = "Crear un nuevo listing", description = "Solo anfitriones pueden crear listings")
    public ResponseEntity<ListingDetailDTO> createListing(
            @Valid @RequestBody CreateListingDTO dto
    ) {
        ListingDetailDTO created = listingService.create(dto);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(created);
    }

    // ========================================
    // READ - Publicos
    // ========================================

    @GetMapping("/{id}")
    @Operation(summary = "Obtener detalle de un listing", description = "Información completa del alojamiento")
    public ResponseEntity<ListingDetailDTO> getListingById(
            @Parameter(description = "ID del listing")
            @PathVariable UUID id
    ) {
        ListingDetailDTO listing = listingService.findById(id);

        return ResponseEntity.ok(listing);
    }

    @GetMapping
    @Operation(
            summary = "Buscar listings con filtros",
            description = "Busca alojamientos por ciudad, fechas y otros filtros. La URL es compartible."
    )
    public ResponseEntity<List<ListingSummaryDTO>> searchListings(
            @Parameter(description = "Ciudad (ej: Santa Cruz, La Paz)")
            @RequestParam(required = false) String city,

            @Parameter(description = "Precio mínimo por noche")
            @RequestParam(required = false) BigDecimal minPrice,

            @Parameter(description = "Precio máximo por noche")
            @RequestParam(required = false) BigDecimal maxPrice,

            @Parameter(description = "Número mínimo de huéspedes")
            @RequestParam(required = false) Integer capacity,

            @Parameter(description = "ID de categoría para filtrar")
            @RequestParam(required = false) UUID categoryId
    ) {
        // Si no hay filtros, devolver todos los activos
        if (city == null && minPrice == null && maxPrice == null && capacity == null && categoryId == null) {
            List<ListingSummaryDTO> listings = listingService.findAllActive();
            return ResponseEntity.ok(listings);
        }

        // Aplicar filtros
        List<ListingSummaryDTO> listings = listingService.findByFilters(
                city, minPrice, maxPrice, capacity, categoryId
        );
        return ResponseEntity.ok(listings);
    }

    @GetMapping("/host/{hostId}")
    @Operation(
            summary = "Obtener mis listings como anfitrión",
            description = "Lista todos los listings (activos e inactivos) del anfitrión autenticado"
    )
    public ResponseEntity<List<ListingSummaryDTO>> getMyListings(
            @Parameter(description = "ID del anfitrión")
            @PathVariable UUID hostId
            // FALTA: Validar que hostId == usuario autenticado (Security)
    ) {
        List<ListingSummaryDTO> listings = listingService.findByHostId(hostId);
        return ResponseEntity.ok(listings);
    }

    // ========================================
    // UPDATE - Solo el propietario o admin
    // ========================================

    @PutMapping("/{id}")
    @Operation(
            summary = "Actualizar un listing",
            description = "Solo el anfitrión propietario puede actualizar su listing"
    )
    public ResponseEntity<ListingDetailDTO> updateListing(
            @Parameter(description = "ID del listing")
            @PathVariable UUID id,

            @Valid @RequestBody UpdateListingDTO dto
            // FALTA: Validar que el listing pertenece al usuario autenticado
    ) {
        ListingDetailDTO updated = listingService.update(id, dto);
        return ResponseEntity.ok(updated);
    }

    // ========================================
    // PUBLISH / UNPUBLISH - Solo el propietario
    // ========================================

    @PatchMapping("/{id}/publish")
    @Operation(
            summary = "Publicar un listing",
            description = "Activa el listing para que sea visible en búsquedas. Valida que tenga información completa."
    )
    public ResponseEntity<Void> publishListing(
            @Parameter(description = "ID del listing")
            @PathVariable UUID id
            // FALTA: Validar que el listing pertenece al usuario autenticado
    ) {
        listingService.activate(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/unpublish")
    @PreAuthorize("hasRole('HOST') or hasRole('ADMIN')")
    @Operation(
            summary = "Despublicar un listing",
            description = "Desactiva el listing (deja de mostrarse en búsquedas)"
    )
    public ResponseEntity<Void> unpublishListing(
            @Parameter(description = "ID del listing")
            @PathVariable UUID id
            // FALTA: Validar que el listing pertenece al usuario autenticado
    ) {
        listingService.deactivate(id);
        return ResponseEntity.noContent().build();
    }

    // ========================================
    // DELETE - Solo el propietario o admin
    // ========================================

    @DeleteMapping("/{id}")
    @Operation(
            summary = "Eliminar un listing",
            description = "Elimina permanentemente el listing. Solo el propietario o admin."
    )
    public ResponseEntity<Void> deleteListing(
            @Parameter(description = "ID del listing")
            @PathVariable UUID id
            // FALTA: Validar que el listing pertenece al usuario autenticado
    ) {
        listingService.delete(id);

        return ResponseEntity.noContent().build();
    }
}
