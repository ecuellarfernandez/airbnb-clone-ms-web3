package com.listings.airbnb_clone_ms_web_iii.listings.listing.repository;

import com.listings.airbnb_clone_ms_web_iii.listings.listing.model.Listing;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ListingRepository extends JpaRepository<Listing, UUID> {
}
