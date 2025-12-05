package com.listings.airbnb_clone_ms_web_iii.listings.application.dto.response;

import java.math.BigDecimal;

public class ListingSummaryDTO {
    private String id;
    private String title;
    private String city;
    private String country;
    private BigDecimal priceAmount;
    private String priceCurrency;
    private Integer capacity;
    private String primaryImageUrl;
    private Boolean isActive;

    public ListingSummaryDTO() {
    }

    public ListingSummaryDTO(String id, String title, String city, String country, BigDecimal priceAmount, String priceCurrency, Integer capacity, String primaryImageUrl, Boolean isActive) {
        this.id = id;
        this.title = title;
        this.city = city;
        this.country = country;
        this.priceAmount = priceAmount;
        this.priceCurrency = priceCurrency;
        this.capacity = capacity;
        this.primaryImageUrl = primaryImageUrl;
        this.isActive = isActive;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
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

    public BigDecimal getPriceAmount() {
        return priceAmount;
    }

    public void setPriceAmount(BigDecimal priceAmount) {
        this.priceAmount = priceAmount;
    }

    public String getPriceCurrency() {
        return priceCurrency;
    }

    public void setPriceCurrency(String priceCurrency) {
        this.priceCurrency = priceCurrency;
    }

    public Integer getCapacity() {
        return capacity;
    }

    public void setCapacity(Integer capacity) {
        this.capacity = capacity;
    }

    public String getPrimaryImageUrl() {
        return primaryImageUrl;
    }

    public void setPrimaryImageUrl(String primaryImageUrl) {
        this.primaryImageUrl = primaryImageUrl;
    }

    public Boolean getActive() {
        return isActive;
    }

    public void setActive(Boolean active) {
        isActive = active;
    }
}
