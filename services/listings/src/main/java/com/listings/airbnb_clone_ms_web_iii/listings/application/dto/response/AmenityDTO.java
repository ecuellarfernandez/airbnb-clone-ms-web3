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
public class AmenityDTO {
    private UUID id;
    private String title;
    private String description;
    private String icon;
}
