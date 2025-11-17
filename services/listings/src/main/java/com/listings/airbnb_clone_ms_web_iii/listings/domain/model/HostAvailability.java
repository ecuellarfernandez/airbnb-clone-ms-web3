package com.listings.airbnb_clone_ms_web_iii.listings.domain.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "host_availability",
        uniqueConstraints = @UniqueConstraint(columnNames = {"listing_id", "date"}))
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HostAvailability {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "listing_id", nullable = false)
    private UUID listingId;

    @Column(nullable = false)
    private LocalDate date;

    @Column(name = "is_blocked_by_host", nullable = false)
    @Builder.Default
    private Boolean isBlockedByHost = false;

    @Column(name = "block_reason", length = 255)
    private String blockReason;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

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
}
