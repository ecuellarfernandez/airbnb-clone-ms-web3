package com.listings.airbnb_clone_ms_web_iii.listings.application.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateListingImageDTO {

    @NotNull(message = "Media ID is required")
    private UUID mediaId;

    @NotNull(message = "Media URL is required")
    private String mediaUrl;

    private Boolean isPrimary = false;

    private Integer displayOrder;
}
