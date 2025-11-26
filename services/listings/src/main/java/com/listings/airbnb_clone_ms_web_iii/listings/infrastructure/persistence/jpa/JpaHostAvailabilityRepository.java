package com.listings.airbnb_clone_ms_web_iii.listings.infrastructure.persistence.jpa;

import com.listings.airbnb_clone_ms_web_iii.listings.domain.model.HostAvailability;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface JpaHostAvailabilityRepository extends JpaRepository<HostAvailability, UUID> {

    Optional<HostAvailability> findByListingIdAndDate(UUID listingId, LocalDate date);

    @Query("""
        SELECT ha FROM HostAvailability ha 
        WHERE ha.listingId = :listingId 
        AND ha.date BETWEEN :startDate AND :endDate
        ORDER BY ha.date
    """)
    List<HostAvailability> findByListingIdAndDateRange(
            @Param("listingId") UUID listingId,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate
    );

    @Query("""
        SELECT ha FROM HostAvailability ha 
        WHERE ha.listingId = :listingId 
        AND ha.date BETWEEN :startDate AND :endDate
        AND ha.isBlockedByHost = true
    """)
    List<HostAvailability> findBlockedDatesByListingAndRange(
            @Param("listingId") UUID listingId,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate
    );
}
