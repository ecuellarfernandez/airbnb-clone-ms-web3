package com.listings.airbnb_clone_ms_web_iii.listings.listing.dto;

import com.listings.airbnb_clone_ms_web_iii.listings.amenity.dto.AmenitySummaryDto;
import com.listings.airbnb_clone_ms_web_iii.listings.category.dto.CategorySummaryDto;

import java.util.List;

public class ListingDetailDto {
    private String id;
    private String title;
    private String description;
    private List<String> photos;
    private List<CategorySummaryDto> categories;
    private List<AmenitySummaryDto> amenities;
}
