package com.listings.airbnb_clone_ms_web_iii.listings.listing_has_category.repository;

import com.listings.airbnb_clone_ms_web_iii.listings.listing_has_category.model.ListingHasCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ListingHasCategoryRepository extends JpaRepository<ListingHasCategory, UUID> {
}
