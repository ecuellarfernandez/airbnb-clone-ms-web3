package com.airbnb_clone_ms_web_iii.identity.services.roles;

import com.airbnb_clone_ms_web_iii.identity.models.roles.Claim;
import com.airbnb_clone_ms_web_iii.identity.repositories.roles.ClaimRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ClaimService {
    private final ClaimRepository claimRepository;

    @Autowired
    public ClaimService(ClaimRepository claimRepository) {
        this.claimRepository = claimRepository;
    }

    public Claim create(Claim claim) {
        return claimRepository.save(claim);
    }

    public Page<Claim> findAll(Pageable pageable) {
        return claimRepository.findAll(pageable);
    }

    public Optional<Claim> findById(Long id) {
        return claimRepository.findById(id);
    }

    public Claim update(Long id, Claim claimDetails) {
        Claim claim = claimRepository.findById(id).orElseThrow();
        claim.setName(claimDetails.getName());
        claim.setDescription(claimDetails.getDescription());
        claim.setActive(claimDetails.isActive());
        return claimRepository.save(claim);
    }

    public void delete(Long id) {
        claimRepository.deleteById(id);
    }
}

