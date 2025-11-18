package com.listings.airbnb_clone_ms_web_iii.listings.application.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ListingSummaryDTO {

    private UUID id;
    private String title;
    private String city;
    private String country;
    private BigDecimal priceAmount;
    private String priceCurrency;
    private Integer capacity;
    private String primaryImageUrl;
    private Boolean isActive;
}
