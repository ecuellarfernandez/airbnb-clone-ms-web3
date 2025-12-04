package com.listings.airbnb_clone_ms_web_iii.listings.application.port;

import com.listings.airbnb_clone_ms_web_iii.listings.application.dto.response.AmenityDTO;

import java.util.List;

public interface AmenityServicePort {

    List<AmenityDTO> getAllAmenities();

}
