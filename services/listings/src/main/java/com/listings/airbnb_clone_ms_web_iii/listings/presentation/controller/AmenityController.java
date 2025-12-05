package com.listings.airbnb_clone_ms_web_iii.listings.presentation.controller;

import an.awesome.pipelinr.Pipeline;
import com.listings.airbnb_clone_ms_web_iii.listings.application.dto.common.PagedResult;
import com.listings.airbnb_clone_ms_web_iii.listings.application.dto.common.StandardResult;
import com.listings.airbnb_clone_ms_web_iii.listings.application.dto.response.AmenityDTO;
import com.listings.airbnb_clone_ms_web_iii.listings.application.dto.response.ListingSummaryDTO;
import com.listings.airbnb_clone_ms_web_iii.listings.application.pipelinr.amenity.queries.GetAllAmenitiesQuery;
import com.listings.airbnb_clone_ms_web_iii.listings.application.pipelinr.listing.queries.SearchListingsQuery;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.logging.Logger;

@RestController
@RequestMapping("/api/amenity")
@Tag(name = "Amenity", description = "API para Amenities")
@CrossOrigin(origins = "*")
public class AmenityController {

    private static final Logger logger = Logger.getLogger(BookingController.class.getName());
    private final Pipeline pipeline;

    public AmenityController(Pipeline pipeline) {
        this.pipeline = pipeline;
    }

    @GetMapping
    public ResponseEntity<PagedResult<AmenityDTO>> getAmenities() {

        GetAllAmenitiesQuery query = new GetAllAmenitiesQuery();
        List<AmenityDTO> result = pipeline.send(query);

        String message = result.isEmpty() ? "No amenities found" : "Amenities retrieved successfully";
        PagedResult<AmenityDTO> pagedResult = new PagedResult<>(result, 0, result.size(), result.size());
        pagedResult.setMessage(message);

        return ResponseEntity.ok(pagedResult);
    }

}
