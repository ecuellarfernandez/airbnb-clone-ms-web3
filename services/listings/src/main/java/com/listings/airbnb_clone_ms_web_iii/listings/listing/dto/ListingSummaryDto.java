package com.listings.airbnb_clone_ms_web_iii.listings.listing.dto;

import com.listings.airbnb_clone_ms_web_iii.listings.category.dto.CategorySummaryDto;

import java.util.List;

public class ListingSummaryDto {
    private String id;
    private String title;
    private String description;
    private String mainPhotoUrl;
    private List<CategorySummaryDto> categories;
}
