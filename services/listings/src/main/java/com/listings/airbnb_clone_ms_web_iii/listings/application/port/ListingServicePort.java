package com.listings.airbnb_clone_ms_web_iii.listings.application.port;

import com.listings.airbnb_clone_ms_web_iii.listings.application.dto.common.PagedResult;
import com.listings.airbnb_clone_ms_web_iii.listings.application.dto.request.CreateListingDTO;
import com.listings.airbnb_clone_ms_web_iii.listings.application.dto.request.UpdateListingDTO;
import com.listings.airbnb_clone_ms_web_iii.listings.application.dto.response.ListingDetailDTO;
import com.listings.airbnb_clone_ms_web_iii.listings.application.dto.response.ListingSummaryDTO;
import org.springframework.data.domain.Pageable;

import java.math.BigDecimal;
import java.util.UUID;

/**
 * Puerto de entrada para casos de uso de Listings.
 * Define el contrato de operaciones disponibles desde el exterior.
 */
public interface ListingServicePort {

    // ========== CREATE ==========

    /**
     * Crea un nuevo listing.
     */
    ListingDetailDTO create(CreateListingDTO dto);

    // ========== READ ==========

    /**
     * Obtiene todos los listings activos con paginación.
     */
    PagedResult<ListingSummaryDTO> findAllActive(Pageable pageable);

    /**
     * Obtiene un listing por ID.
     */
    ListingDetailDTO findById(UUID id);

    /**
     * Obtiene listings de un anfitrión con paginación.
     */
    PagedResult<ListingSummaryDTO> findByHostId(Integer hostId, Pageable pageable);

    /**
     * Busca listings con filtros y paginación.
     */
    PagedResult<ListingSummaryDTO> findByFilters(
            String city,
            BigDecimal minPrice,
            BigDecimal maxPrice,
            Integer minCapacity,
            UUID categoryId,
            Pageable pageable
    );

    // ========== UPDATE ==========

    /**
     * Actualiza un listing.
     */
    ListingDetailDTO update(UUID id, UpdateListingDTO dto);

    /**
     * Establece imagen principal.
     */
    void setPrimaryImage(UUID listingId, UUID imageId);

    // ========== DELETE ==========

    /**
     * Elimina un listing.
     */
    void delete(UUID id);

    // ========== ACTIVATION ==========

    /**
     * Activa un listing.
     */
    void activate(UUID id);

    /**
     * Desactiva un listing.
     */
    void deactivate(UUID id);

}
