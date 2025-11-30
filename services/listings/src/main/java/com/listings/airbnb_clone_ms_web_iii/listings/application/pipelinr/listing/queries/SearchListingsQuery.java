package com.listings.airbnb_clone_ms_web_iii.listings.application.pipelinr.listing.queries;

import an.awesome.pipelinr.Command;
import com.listings.airbnb_clone_ms_web_iii.listings.application.dto.response.ListingSummaryDTO;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

public class SearchListingsQuery implements Command<List<ListingSummaryDTO>> {

    private final String city;
    private final BigDecimal minPrice;
    private final BigDecimal maxPrice;
    private final Integer capacity;
    private final UUID categoryId;

    public SearchListingsQuery(String city, BigDecimal minPrice, BigDecimal maxPrice, Integer capacity, UUID categoryId) {
        this.city = city;
        this.minPrice = minPrice;
        this.maxPrice = maxPrice;
        this.capacity = capacity;
        this.categoryId = categoryId;
    }

    public String getCity() {
        return city;
    }

    public BigDecimal getMinPrice() {
        return minPrice;
    }

    public BigDecimal getMaxPrice() {
        return maxPrice;
    }

    public Integer getCapacity() {
        return capacity;
    }

    public UUID getCategoryId() {
        return categoryId;
    }

    public boolean hasFilters() {
        return city != null || minPrice != null || maxPrice != null || capacity != null || categoryId != null;
    }
}

