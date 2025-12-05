package com.listings.airbnb_clone_ms_web_iii.listings.application.pipelinr.amenity.queries;

import an.awesome.pipelinr.Command;
import com.listings.airbnb_clone_ms_web_iii.listings.application.dto.response.AmenityDTO;
import com.listings.airbnb_clone_ms_web_iii.listings.application.port.AmenityServicePort;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class GetAllAmenitiesQueryHandler implements Command.Handler<GetAllAmenitiesQuery, List<AmenityDTO>> {

    private final AmenityServicePort amenityService;

    public GetAllAmenitiesQueryHandler(AmenityServicePort amenityService) {
        this.amenityService = amenityService;
    }

    @Override
    public List<AmenityDTO> handle(GetAllAmenitiesQuery getAllAmenitiesQuery) {
        return amenityService.getAllAmenities();
    }
}
