package com.listings.airbnb_clone_ms_web_iii.listings.application.mapper;

import com.listings.airbnb_clone_ms_web_iii.listings.application.dto.request.CreateListingDTO;
import com.listings.airbnb_clone_ms_web_iii.listings.application.dto.request.LocationDTO;
import com.listings.airbnb_clone_ms_web_iii.listings.application.dto.response.CategoryDTO;
import com.listings.airbnb_clone_ms_web_iii.listings.application.dto.response.ListingDetailDTO;
import com.listings.airbnb_clone_ms_web_iii.listings.application.dto.response.ListingImageDTO;
import com.listings.airbnb_clone_ms_web_iii.listings.application.dto.response.ListingSummaryDTO;
import com.listings.airbnb_clone_ms_web_iii.listings.domain.model.*;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import java.util.List;
import java.util.UUID;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.WARN)
public interface ListingMapper {

    // Helper method para convertir UUID a String
    default String map(UUID value) {
        return value == null ? null : value.toString();
    }

    // Helper method para convertir String a UUID
    default UUID map(String value) {
        if (value == null || value.trim().isEmpty()) {
            return null;
        }
        try {
            return UUID.fromString(value);
        } catch (IllegalArgumentException e) {
            // Si el String no es un UUID válido, retorna null o genera nuevo UUID
            return null;
        }
    }

    // ==== To entity
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "images", ignore = true)
    @Mapping(target = "categories", ignore = true)
    @Mapping(target = "amenities", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "isActive", constant = "false")
    @Mapping(source = "price.amount", target = "price.amount")
    @Mapping(source = "price.currency", target = "price.currency")
    Listing toEntity(CreateListingDTO dto);

    Location toLocation(LocationDTO dto);

    // ==== To DTO
    @Mapping(source = "location.city", target = "city")
    @Mapping(source = "location.country", target = "country")
    @Mapping(source = "price.amount", target = "priceAmount")
    @Mapping(source = "price.currency", target = "priceCurrency")
    @Mapping(source = "primaryImageUrl", target = "primaryImageUrl")
    ListingSummaryDTO toSummaryDTO(Listing listing);
    List<ListingSummaryDTO> toSummaryDTOList(List<Listing> listing);

    @Mapping(source = "location.city", target = "city")
    @Mapping(source = "location.country", target = "country")
    @Mapping(source = "location.address", target = "address")
    @Mapping(source = "location.latitude", target = "latitude")
    @Mapping(source = "location.longitude", target = "longitude")
    @Mapping(source = "price.amount", target = "priceAmount")
    @Mapping(source = "price.currency", target = "priceCurrency")
    ListingDetailDTO toDetailDTO(Listing listing);

    // ==== entidades anidadas
    @Mapping(target = "mediaId", ignore = true)
    ListingImageDTO toImageDTO(ListingImage image);
    List<ListingImageDTO> toImageDTOList(List<ListingImage> images);

    @Mapping(source = "categoryType.name", target = "categoryTypeName")
    CategoryDTO toCategoryDTO(Category category);

    Amenity toAmenityDTO(Amenity amenity);
}
