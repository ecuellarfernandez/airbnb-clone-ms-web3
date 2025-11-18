package com.listings.airbnb_clone_ms_web_iii.listings.application.service;

import com.listings.airbnb_clone_ms_web_iii.listings.application.dto.request.CreateListingDTO;
import com.listings.airbnb_clone_ms_web_iii.listings.application.dto.request.UpdateListingDTO;
import com.listings.airbnb_clone_ms_web_iii.listings.application.dto.response.ListingDetailDTO;
import com.listings.airbnb_clone_ms_web_iii.listings.application.dto.response.ListingSummaryDTO;
import com.listings.airbnb_clone_ms_web_iii.listings.application.mapper.ListingMapper;
import com.listings.airbnb_clone_ms_web_iii.listings.application.port.ListingServicePort;
import com.listings.airbnb_clone_ms_web_iii.listings.domain.model.*;
import com.listings.airbnb_clone_ms_web_iii.listings.domain.repository.AmenityRepository;
import com.listings.airbnb_clone_ms_web_iii.listings.domain.repository.CategoryRepository;
import com.listings.airbnb_clone_ms_web_iii.listings.domain.repository.ListingRepository;
import com.listings.airbnb_clone_ms_web_iii.listings.domain.service.ListingDomainService;
import com.listings.airbnb_clone_ms_web_iii.listings.presentation.exception.ListingNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.UUID;

/**
 * Application Service para Listings.
 * Orquesta casos de uso, coordina entre repositorios, domain services y mappers.
 */
@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class ListingApplicationService implements ListingServicePort {

    private final ListingRepository listingRepository;
    private final CategoryRepository categoryRepository;
    private final AmenityRepository amenityRepository;
    private final ListingDomainService listingDomainService;
    private final ListingMapper listingMapper;

    // ========================================
    // CREATE
    // ========================================

    /**
     * Crea un nuevo listing.
     *
     * @param dto Datos del listing a crear
     * @return Listing creado con todos sus detalles
     */
    @Override
    public ListingDetailDTO create(CreateListingDTO dto) {
        log.info("Creating listing with title: {}", dto.getTitle());

        Listing listing = listingMapper.toEntity(dto);

        dto.getImages().forEach(imageDto -> {
            ListingImage image = ListingImage.builder()
                    .mediaId(imageDto.getMediaId())
                    .mediaUrl(imageDto.getMediaUrl())
                    .isPrimary(imageDto.getIsPrimary())
                    .displayOrder(imageDto.getDisplayOrder())
                    .build();
            listing.addImage(image);
        });

        Set<Category> categories = categoryRepository.findAllByIds(dto.getCategoryIds());
        if (categories.isEmpty()) {
            throw new IllegalArgumentException("Invalid category IDs provided");
        }

        List<Category> categoryList = new ArrayList<>(categories);
        listingDomainService.validateCategoryCompatibility(categoryList);

        categories.forEach(listing::addCategory);

        if (dto.getAmenityIds() != null && !dto.getAmenityIds().isEmpty()) {
            Set<Amenity> amenities = amenityRepository.findAllByIds(dto.getAmenityIds());
            amenities.forEach(listing::addAmenity);
        }

        Listing saved = listingRepository.save(listing);

        log.info("Listing created successfully with ID: {}", saved.getId());

        return listingMapper.toDetailDTO(saved);
    }

    // ========================================
    // READ
    // ========================================

    /**
     * Obtiene todos los listings activos.
     *
     * @return Lista de listings en formato summary
     */
    @Override
    @Transactional(readOnly = true)
    public List<ListingSummaryDTO> findAllActive() {
        log.info("Finding all active listings");

        List<Listing> listings = listingRepository.findAllActive();

        log.info("Found {} active listings", listings.size());

        return listingMapper.toSummaryDTOList(listings);
    }

    /**
     * Obtiene un listing por su ID con todos sus detalles.
     *
     * @param id ID del listing
     * @return Listing con todos sus detalles
     * @throws ListingNotFoundException si no se encuentra
     */
    @Override
    @Transactional(readOnly = true)
    public ListingDetailDTO findById(UUID id) {
        log.info("Finding listing by ID: {}", id);

        Listing listing = listingRepository.findByIdWithRelations(id)
                .orElseThrow(() -> new ListingNotFoundException("Listing not found with id: " + id));

        return listingMapper.toDetailDTO(listing);
    }

    /**
     * Obtiene todos los listings de un anfitrión específico.
     *
     * @param hostId ID del anfitrión
     * @return Lista de listings del anfitrión
     */
    @Override
    @Transactional(readOnly = true)
    public List<ListingSummaryDTO> findByHostId(UUID hostId) {
        log.info("Finding listings by host ID: {}", hostId);

        List<Listing> listings = listingRepository.findByHostId(hostId);

        log.info("Found {} listings for host {}", listings.size(), hostId);

        return listingMapper.toSummaryDTOList(listings);
    }

    /**
     * Busca listings aplicando filtros múltiples.
     *
     * @param city Ciudad (opcional)
     * @param minPrice Precio mínimo (opcional)
     * @param maxPrice Precio máximo (opcional)
     * @param minCapacity Capacidad mínima (opcional)
     * @param categoryId ID de categoría (opcional)
     * @return Lista de listings que cumplen con los filtros
     */
    @Override
    @Transactional(readOnly = true)
    public List<ListingSummaryDTO> findByFilters(
            String city,
            BigDecimal minPrice,
            BigDecimal maxPrice,
            Integer minCapacity,
            UUID categoryId
    ) {
        log.info("Finding listings with filters - city: {}, minPrice: {}, maxPrice: {}, capacity: {}, category: {}",
                city, minPrice, maxPrice, minCapacity, categoryId);

        List<Listing> listings = listingRepository.findByFilters(
                city, minPrice, maxPrice, minCapacity, categoryId
        );

        log.info("Found {} listings matching filters", listings.size());

        return listingMapper.toSummaryDTOList(listings);
    }

    // ========================================
    // UPDATE
    // ========================================

    /**
     * Actualiza un listing existente.
     *
     * @param id ID del listing a actualizar
     * @param dto Datos actualizados
     * @return Listing actualizado
     * @throws ListingNotFoundException si no se encuentra
     */
    @Override
    public ListingDetailDTO update(UUID id, UpdateListingDTO dto) {
        log.info("Updating listing with ID: {}", id);

        Listing listing = listingRepository.findByIdWithRelations(id)
                .orElseThrow(() -> new ListingNotFoundException("Listing not found with id: " + id));

        if (dto.getTitle() != null) {
            listing.setTitle(dto.getTitle());
        }

        if (dto.getDescription() != null) {
            listing.setDescription(dto.getDescription());
        }

        if (dto.getCapacity() != null) {
            listing.setCapacity(dto.getCapacity());
        }

        if (dto.getBedrooms() != null) {
            listing.setBedrooms(dto.getBedrooms());
        }

        if (dto.getBathrooms() != null) {
            listing.setBathrooms(dto.getBathrooms());
        }

        if (dto.getLocation() != null) {
            listing.setLocation(listingMapper.toLocation(dto.getLocation()));
        }

        if (dto.getPriceAmount() != null) {
            Price price = listing.getPrice();
            if (price == null) {
                price = new Price();
                listing.setPrice(price);
            }
            price.setAmount(dto.getPriceAmount());

            if (dto.getPriceCurrency() != null) {
                price.setCurrency(dto.getPriceCurrency());
            }
        }

        if (dto.getCategoryIds() != null && !dto.getCategoryIds().isEmpty()) {
            listing.getCategories().clear();

            Set<Category> categories = categoryRepository.findAllByIds(dto.getCategoryIds());
            if (categories.isEmpty()) {
                throw new IllegalArgumentException("Invalid category IDs provided");
            }

            // Validar compatibilidad
            List<Category> categoryList = new ArrayList<>(categories);
            listingDomainService.validateCategoryCompatibility(categoryList);

            categories.forEach(listing::addCategory);
        }

        if (dto.getAmenityIds() != null) {
            listing.getAmenities().clear();

            if (!dto.getAmenityIds().isEmpty()) {
                Set<Amenity> amenities = amenityRepository.findAllByIds(dto.getAmenityIds());
                amenities.forEach(listing::addAmenity);
            }
        }

        if (dto.getImages() != null && !dto.getImages().isEmpty()) {
            listing.getImages().clear();

            dto.getImages().forEach(imageDto -> {
                ListingImage image = ListingImage.builder()
                        .mediaId(imageDto.getMediaId())
                        .mediaUrl(imageDto.getMediaUrl())
                        .isPrimary(imageDto.getIsPrimary())
                        .displayOrder(imageDto.getDisplayOrder())
                        .build();
                listing.addImage(image);
            });
        }

        if (dto.getIsActive() != null) {
            if (dto.getIsActive()) {
                // Validar antes de activar
                listingDomainService.validateListingForActivation(listing);
                listing.activate();
            } else {
                listing.deactivate();
            }
        }

        Listing updated = listingRepository.save(listing);

        log.info("Listing updated successfully with ID: {}", updated.getId());

        return listingMapper.toDetailDTO(updated);
    }

    /**
     * Establece una imagen como principal para un listing.
     *
     * @param listingId ID del listing
     * @param imageId ID de la imagen a marcar como principal
     */
    @Override
    public void setPrimaryImage(UUID listingId, UUID imageId) {
        log.info("Setting primary image {} for listing {}", imageId, listingId);

        Listing listing = listingRepository.findByIdWithRelations(listingId)
                .orElseThrow(() -> new ListingNotFoundException("Listing not found with id: " + listingId));

        // Validar que la imagen pertenezca al listing
        boolean imageExists = listing.getImages().stream()
                .anyMatch(img -> img.getId().equals(imageId));

        if (!imageExists) {
            throw new IllegalArgumentException("Image does not belong to this listing");
        }

        listing.setPrimaryImage(imageId);
        listingRepository.save(listing);

        log.info("Primary image set successfully for listing {}", listingId);
    }

    // ========================================
    // DELETE
    // ========================================

    /**
     * Elimina un listing.
     *
     * @param id ID del listing a eliminar
     * @throws ListingNotFoundException si no se encuentra
     */
    @Override
    public void delete(UUID id) {
        log.info("Deleting listing with ID: {}", id);

        if (!listingRepository.existsById(id)) {
            throw new ListingNotFoundException("Listing not found with id: " + id);
        }

        listingRepository.deleteById(id);

        log.info("Listing deleted successfully with ID: {}", id);
    }

    // ========================================
    // ACTIVATION / DEACTIVATION
    // ========================================

    /**
     * Activa un listing (lo publica).
     * Valida que cumpla con todos los requisitos antes de activarlo.
     *
     * @param id ID del listing
     * @throws ListingNotFoundException si no se encuentra
     * @throws IllegalStateException si no cumple con los requisitos
     */
    @Override
    public void activate(UUID id) {
        log.info("Activating listing with ID: {}", id);

        Listing listing = listingRepository.findByIdWithRelations(id)
                .orElseThrow(() -> new ListingNotFoundException("Listing not found with id: " + id));

        // Validar con Domain Service
        listingDomainService.validateListingForActivation(listing);

        // Activar (metodo de la entidad)
        listing.activate();

        listingRepository.save(listing);

        log.info("Listing activated successfully with ID: {}", id);
    }

    /**
     * Desactiva un listing (lo despublica).
     *
     * @param id ID del listing
     * @throws ListingNotFoundException si no se encuentra
     */
    @Override
    public void deactivate(UUID id) {
        log.info("Deactivating listing with ID: {}", id);

        Listing listing = listingRepository.findById(id)
                .orElseThrow(() -> new ListingNotFoundException("Listing not found with id: " + id));

        listing.deactivate();

        listingRepository.save(listing);

        log.info("Listing deactivated successfully with ID: {}", id);
    }

}
