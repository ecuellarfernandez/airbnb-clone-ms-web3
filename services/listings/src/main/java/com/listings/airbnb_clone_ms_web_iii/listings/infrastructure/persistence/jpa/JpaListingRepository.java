package com.listings.airbnb_clone_ms_web_iii.listings.infrastructure.persistence.jpa;

import com.listings.airbnb_clone_ms_web_iii.listings.domain.model.Listing;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * Spring Data JPA Repository.
 * Esta interfaz es especifica de infraestructura.
 * NO debe ser inyectada directamente en servicios de aplicación.
 */
public interface JpaListingRepository extends JpaRepository<Listing, UUID> {

    Page<Listing> findByHostId(Integer hostId, Pageable pageable);

    Page<Listing> findByIsActiveTrue(Pageable pageable);

    @Query("SELECT l FROM Listing l WHERE l.location.city ILIKE %:city% AND l.isActive = true")
    List<Listing> findActiveByCityIgnoreCase(@Param("city") String city);

    @Query("SELECT l FROM Listing l WHERE l.location.country ILIKE %:country% AND l.isActive = true")
    List<Listing> findActiveByCountryIgnoreCase(@Param("country") String country);

    @Query("""
        SELECT DISTINCT l FROM Listing l 
        LEFT JOIN l.categories c 
        LEFT JOIN l.amenities a
        WHERE l.isActive = true
        AND (:city IS NULL OR l.location.city ILIKE %:city%)
        AND (:minPrice IS NULL OR l.price.amount >= :minPrice)
        AND (:maxPrice IS NULL OR l.price.amount <= :maxPrice)
        AND (:minCapacity IS NULL OR l.capacity >= :minCapacity)
        AND (:categoryId IS NULL OR c.id = :categoryId)
    """)
    Page<Listing> findByFilters(
            @Param("city") String city,
            @Param("minPrice") BigDecimal minPrice,
            @Param("maxPrice") BigDecimal maxPrice,
            @Param("minCapacity") Integer minCapacity,
            @Param("categoryId") UUID categoryId,
            Pageable pageable
    );

    @Query("""
        SELECT l FROM Listing l
        LEFT JOIN FETCH l.images
        LEFT JOIN FETCH l.categories c
        LEFT JOIN FETCH c.categoryType
        LEFT JOIN FETCH l.amenities
        WHERE l.id = :id
    """)
    Optional<Listing> findByIdWithRelations(@Param("id") UUID id);
}
