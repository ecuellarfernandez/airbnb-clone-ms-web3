package com.listings.airbnb_clone_ms_web_iii.listings.application.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ListingDetailDTO {

    private UUID id;
    private UUID hostId;
    private String title;
    private String description;

    // Location
    private String city;
    private String country;
    private String address;
    private BigDecimal latitude;
    private BigDecimal longitude;

    // Price
    private BigDecimal priceAmount;
    private String priceCurrency;

    // Details
    private Integer capacity;
    private Integer bedrooms;
    private Integer bathrooms;

    // Relationships
    private List<ListingImageDTO> images;
    private Set<CategoryDTO> categories;
    private Set<AmenityDTO> amenities;

    // Status
    private Boolean isActive;

    // Audit
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
