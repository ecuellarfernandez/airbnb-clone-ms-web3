package com.listings.airbnb_clone_ms_web_iii.listings.domain.services;

import com.listings.airbnb_clone_ms_web_iii.listings.domain.model.Category;
import com.listings.airbnb_clone_ms_web_iii.listings.domain.model.Listing;

import java.math.BigDecimal;
import java.util.List;

public interface ListingDomainServiceInt {

    void validateListingForActivation(Listing listing);
    BigDecimal calculateTotalPrice(BigDecimal pricePerNight, int numberOfNights);
    boolean shouldBeFeatured(Listing listing);
    void validateCategoryCompatibility(List<Category> categories);

}
