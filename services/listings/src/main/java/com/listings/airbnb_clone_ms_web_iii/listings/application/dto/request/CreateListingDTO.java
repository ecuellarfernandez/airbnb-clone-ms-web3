package com.listings.airbnb_clone_ms_web_iii.listings.application.dto.request;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateListingDTO {

    @NotNull(message = "Host ID is required")
    private UUID hostId;

    @NotBlank(message = "Title is required")
    @Size(min = 10, max = 100, message = "Title must be between 10 and 100 characters")
    private String title;

    @NotBlank(message = "Description is required")
    @Size(min = 50, max = 1000, message = "Description must be between 50 and 1000 characters")
    private String description;

    @Valid
    @NotNull(message = "Location is required")
    private LocationDTO location;

    @NotNull(message = "Price is required")
    @DecimalMin(value = "0.01", message = "Price must be greater than 0")
    private BigDecimal priceAmount;

    private String priceCurrency = "USD";

    @NotNull(message = "Capacity is required")
    @Min(value = 1, message = "Capacity must be at least 1")
    @Max(value = 50, message = "Capacity cannot exceed 50")
    private Integer capacity;

    @Min(value = 0, message = "Bedrooms cannot be negative")
    private Integer bedrooms = 0;

    @Min(value = 0, message = "Bathrooms cannot be negative")
    private Integer bathrooms = 0;

    @NotEmpty(message = "At least one category is required")
    private Set<UUID> categoryIds;

    private Set<UUID> amenityIds;

    @NotEmpty(message = "At least one image is required")
    private List<CreateListingImageDTO> images;
}
