package com.listings.airbnb_clone_ms_web_iii.listings.application.mapper;

import com.listings.airbnb_clone_ms_web_iii.listings.application.dto.response.AmenityDTO;
import com.listings.airbnb_clone_ms_web_iii.listings.domain.model.Amenity;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.WARN)
public interface AmenityMapper {

    AmenityDTO toDTO(Amenity amenity);
    List<AmenityDTO> toDTOList(List<Amenity> amenities);

}
