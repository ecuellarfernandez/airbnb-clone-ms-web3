package com.listings.airbnb_clone_ms_web_iii.listings.listing_has_amenity;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ListingHasAmenityRepository extends JpaRepository<ListingHasAmenity, UUID> {
}
