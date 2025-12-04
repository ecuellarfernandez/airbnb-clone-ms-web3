package com.listings.airbnb_clone_ms_web_iii.listings.application.service;

import com.listings.airbnb_clone_ms_web_iii.listings.application.dto.response.AmenityDTO;
import com.listings.airbnb_clone_ms_web_iii.listings.application.mapper.AmenityMapper;
import com.listings.airbnb_clone_ms_web_iii.listings.application.port.AmenityServicePort;
import com.listings.airbnb_clone_ms_web_iii.listings.domain.repository.AmenityRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class AmenityApplicationService implements AmenityServicePort {

    private final AmenityRepository amenityRepository;
    private final AmenityMapper amenityMapper;

    public AmenityApplicationService(AmenityRepository amenityRepository,
                                     AmenityMapper amenityMapper) {
        this.amenityRepository = amenityRepository;
        this.amenityMapper = amenityMapper;
    }


    @Override
    @Transactional(readOnly = true)
    public List<AmenityDTO> getAllAmenities() {
        return amenityMapper.toDTOList(amenityRepository.findAll());
    }
}
