package com.listings.airbnb_clone_ms_web_iii.listings.infrastructure.persistence.jpa;

import com.listings.airbnb_clone_ms_web_iii.listings.domain.model.Booking;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public interface JpaBookingRepository extends JpaRepository<Booking, UUID> {

    List<Booking> findByGuestId(Integer guestId);

    List<Booking> findByListingId(UUID listingId);

    // NUEVO: devuelve reservas activas que se cruzan en el rango dado
    @Query("""
        SELECT b FROM Booking b
        WHERE b.listingId = :listingId
          AND b.status <> 'CANCELLED'
          AND (b.checkIn < :endDate AND b.checkOut > :startDate)
    """)
    List<Booking> findActiveBookingsByListingAndRange(
            @Param("listingId") UUID listingId,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate
    );

    @Query("""
               SELECT b FROM Booking b
                JOIN Listing l ON b.listingId = l.id
                WHERE l.hostId = :hostId
            """)
    Page<Booking> findByHostId(Integer hostId , Pageable pageable);


}
