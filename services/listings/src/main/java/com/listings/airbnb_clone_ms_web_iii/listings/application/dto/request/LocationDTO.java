package com.listings.airbnb_clone_ms_web_iii.listings.application.dto.request;

import jakarta.validation.constraints.NotBlank;

import java.math.BigDecimal;

public class LocationDTO {

    @NotBlank(message = "City is required")
    private String city;

    @NotBlank(message = "Country is required")
    private String country;

    private String address;

    private BigDecimal latitude;

    private BigDecimal longitude;

    public LocationDTO() {
    }

    public LocationDTO(String city, String country, String address, BigDecimal latitude, BigDecimal longitude) {
        this.city = city;
        this.country = country;
        this.address = address;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public BigDecimal getLatitude() {
        return latitude;
    }

    public void setLatitude(BigDecimal latitude) {
        this.latitude = latitude;
    }

    public BigDecimal getLongitude() {
        return longitude;
    }

    public void setLongitude(BigDecimal longitude) {
        this.longitude = longitude;
    }
}
