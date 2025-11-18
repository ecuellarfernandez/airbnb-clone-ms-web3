package com.listings.airbnb_clone_ms_web_iii.listings.application.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ListingImageDTO {
    private UUID id;
    private UUID mediaId;
    private String mediaUrl;
    private Boolean isPrimary;
    private Integer displayOrder;
}
