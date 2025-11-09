package com.listings.airbnb_clone_ms_web_iii.listings.listing_has_amenity;

import com.listings.airbnb_clone_ms_web_iii.listings.amenity.model.Amenity;
import com.listings.airbnb_clone_ms_web_iii.listings.listing.model.Listing;
import jakarta.persistence.*;

import java.util.UUID;

@Entity
public class ListingHasAmenity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="listing_id", nullable = false)
    private Listing listing;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "amenity_id", nullable = false)
    private Amenity amenity;

    public ListingHasAmenity() {}

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public Listing getListing() {
        return listing;
    }

    public void setListing(Listing listing) {
        this.listing = listing;
    }

    public Amenity getAmenity() {
        return amenity;
    }

    public void setAmenity(Amenity amenity) {
        this.amenity = amenity;
    }
}
