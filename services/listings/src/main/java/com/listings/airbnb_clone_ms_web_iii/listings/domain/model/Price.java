package com.listings.airbnb_clone_ms_web_iii.listings.domain.model;

import jakarta.persistence.Embeddable;

import java.math.BigDecimal;

@Embeddable
public class Price {
    private BigDecimal amount;
    private String currency = "USD";

    public Price (){}

    public Price(BigDecimal amount, String currency) {
        this.amount = amount;
        this.currency = currency;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }
}
