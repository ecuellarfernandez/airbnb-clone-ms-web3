package com.listings.airbnb_clone_ms_web_iii.listings.domain.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;

// Value Object
@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Location {

    @Column(length = 100)
    private String city;

    @Column(length = 100)
    private String country;

    @Column(length = 255)
    private String address;

    @Column(precision = 10, scale = 8)
    private BigDecimal latitude;

    @Column(precision = 11, scale = 8)
    private BigDecimal longitude;
}
