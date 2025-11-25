package com.listings.airbnb_clone_ms_web_iii.listings.domain.model;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "host_availability",
        uniqueConstraints = @UniqueConstraint(columnNames = {"listing_id", "date"}))
public class HostAvailability {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "listing_id", nullable = false)
    private UUID listingId;

    @Column(nullable = false)
    private LocalDate date;

    @Column(name = "is_blocked_by_host", nullable = false)
    private Boolean isBlockedByHost = false;

    @Column(name = "block_reason", length = 255)
    private String blockReason;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    public HostAvailability() {
    }

    public HostAvailability(UUID id, UUID listingId, LocalDate date, Boolean isBlockedByHost, String blockReason, LocalDateTime createdAt) {
        this.id = id;
        this.listingId = listingId;
        this.date = date;
        this.isBlockedByHost = isBlockedByHost != null ? isBlockedByHost : false;
        this.blockReason = blockReason;
        this.createdAt = createdAt;
    }

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    // ===== Logica de dominio

    public void blockDate(String reason) {
        this.isBlockedByHost = true;
        this.blockReason = reason;
    }

    public void unblockDate() {
        this.isBlockedByHost = false;
        this.blockReason = null;
    }

    public boolean isAvailable() {
        return !this.isBlockedByHost;
    }

    public static HostAvailabilityBuilder builder() {
        return new HostAvailabilityBuilder();
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public UUID getListingId() {
        return listingId;
    }

    public void setListingId(UUID listingId) {
        this.listingId = listingId;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Boolean getIsBlockedByHost() {
        return isBlockedByHost;
    }

    public void setIsBlockedByHost(Boolean isBlockedByHost) {
        this.isBlockedByHost = isBlockedByHost;
    }

    public String getBlockReason() {
        return blockReason;
    }

    public void setBlockReason(String blockReason) {
        this.blockReason = blockReason;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public static class HostAvailabilityBuilder {
        private UUID id;
        private UUID listingId;
        private LocalDate date;
        private Boolean isBlockedByHost = false;
        private String blockReason;
        private LocalDateTime createdAt;

        public HostAvailabilityBuilder id(UUID id) {
            this.id = id;
            return this;
        }

        public HostAvailabilityBuilder listingId(UUID listingId) {
            this.listingId = listingId;
            return this;
        }

        public HostAvailabilityBuilder date(LocalDate date) {
            this.date = date;
            return this;
        }

        public HostAvailabilityBuilder isBlockedByHost(Boolean isBlockedByHost) {
            this.isBlockedByHost = isBlockedByHost;
            return this;
        }

        public HostAvailabilityBuilder blockReason(String blockReason) {
            this.blockReason = blockReason;
            return this;
        }

        public HostAvailabilityBuilder createdAt(LocalDateTime createdAt) {
            this.createdAt = createdAt;
            return this;
        }

        public HostAvailability build() {
            return new HostAvailability(id, listingId, date, isBlockedByHost, blockReason, createdAt);
        }
    }
}
