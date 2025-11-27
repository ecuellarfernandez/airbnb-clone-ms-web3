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
import com.listings.airbnb_clone_ms_web_iii.listings.infrastructure.services.ListingDomainService;
import com.listings.airbnb_clone_ms_web_iii.listings.presentation.exception.ListingNotFoundException;
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
public class ListingApplicationService implements ListingServicePort {

    private final ListingRepository listingRepository;
    private final CategoryRepository categoryRepository;
    private final AmenityRepository amenityRepository;
    private final ListingDomainService listingDomainService;
    private final ListingMapper listingMapper;

    public ListingApplicationService(ListingRepository listingRepository,
                                     CategoryRepository categoryRepository,
                                     AmenityRepository amenityRepository,
                                     ListingDomainService listingDomainService,
                                     ListingMapper listingMapper) {
        this.listingRepository = listingRepository;
        this.categoryRepository = categoryRepository;
        this.amenityRepository = amenityRepository;
        this.listingDomainService = listingDomainService;
        this.listingMapper = listingMapper;
    }

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
        List<Listing> listings = listingRepository.findAllActive();

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
        List<Listing> listings = listingRepository.findByHostId(hostId);
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

        List<Listing> listings = listingRepository.findByFilters(
                city, minPrice, maxPrice, minCapacity, categoryId
        );

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
        if (!listingRepository.existsById(id)) {
            throw new ListingNotFoundException("Listing not found with id: " + id);
        }

        listingRepository.deleteById(id);
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
        Listing listing = listingRepository.findByIdWithRelations(id)
                .orElseThrow(() -> new ListingNotFoundException("Listing not found with id: " + id));

        // Validar con Domain Service
        listingDomainService.validateListingForActivation(listing);

        // Activar (metodo de la entidad)
        listing.activate();

        listingRepository.save(listing);
    }

    /**
     * Desactiva un listing (lo despublica).
     *
     * @param id ID del listing
     * @throws ListingNotFoundException si no se encuentra
     */
    @Override
    public void deactivate(UUID id) {
        Listing listing = listingRepository.findById(id)
                .orElseThrow(() -> new ListingNotFoundException("Listing not found with id: " + id));

        listing.deactivate();

        listingRepository.save(listing);
    }

}
