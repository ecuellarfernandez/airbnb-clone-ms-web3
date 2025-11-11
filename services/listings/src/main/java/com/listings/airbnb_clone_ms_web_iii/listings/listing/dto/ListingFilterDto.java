package com.listings.airbnb_clone_ms_web_iii.listings.listing.dto;

import jakarta.validation.constraints.Min;

public class ListingFilterDto {
    private String categoryName;
    private String categoryType;
    @Min(1) private Integer capacity;
}
