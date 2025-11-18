package com.listings.airbnb_clone_ms_web_iii.listings.application.dto.request;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Data
public class UpdateListingDTO {

    @Size(min = 10, max = 100)
    private String title;

    @Size(min = 50, max = 1000)
    private String description;

    @Valid
    private LocationDTO location;

    @DecimalMin(value = "0.01")
    private BigDecimal priceAmount;

    private String priceCurrency;

    @Min(value = 1)
    @Max(value = 50)
    private Integer capacity;

    @Min(value = 0)
    private Integer bedrooms;

    @Min(value = 0)
    private Integer bathrooms;

    private Set<UUID> categoryIds;

    private Set<UUID> amenityIds;

    private List<CreateListingImageDTO> images;

    private Boolean isActive;
}
