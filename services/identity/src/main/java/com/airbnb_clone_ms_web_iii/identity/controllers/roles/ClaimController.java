package com.airbnb_clone_ms_web_iii.identity.controllers.roles;

import com.airbnb_clone_ms_web_iii.identity.dtos.roles.ClaimCreateDTO;
import com.airbnb_clone_ms_web_iii.identity.dtos.roles.ClaimDTO;
import com.airbnb_clone_ms_web_iii.identity.dtos.pojos.PagedResponse;
import com.airbnb_clone_ms_web_iii.identity.dtos.pojos.StandardResult;
import com.airbnb_clone_ms_web_iii.identity.models.roles.Claim;
import com.airbnb_clone_ms_web_iii.identity.services.roles.ClaimService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/claims")
public class ClaimController {
    private final ClaimService claimService;

    @Autowired
    public ClaimController(ClaimService claimService) {
        this.claimService = claimService;
    }

    @PostMapping
    public StandardResult<ClaimDTO> create(@RequestBody ClaimCreateDTO claimDTO) {
        try {
            Claim claim = ClaimCreateDTO.toEntity(claimDTO);
            Claim saved = claimService.create(claim);
            return new StandardResult<>(true, "", ClaimDTO.fromEntity(saved));
        } catch (Exception e) {
            return new StandardResult<>(false, e.getMessage(), null);
        }
    }

    @GetMapping
    public PagedResponse<ClaimDTO> getAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Claim> claimPage = claimService.findAll(pageable);
        PagedResponse<ClaimDTO> response = new PagedResponse<>();
        response.setContent(claimPage.getContent().stream().map(ClaimDTO::fromEntity).collect(Collectors.toList()));
        response.setPageNumber(claimPage.getNumber());
        response.setPageSize(claimPage.getSize());
        response.setTotalElements(claimPage.getTotalElements());
        response.setTotalPages(claimPage.getTotalPages());
        response.setLast(claimPage.isLast());
        response.setSuccess(true);
        response.setErrorMessage("");
        return response;
    }

    @GetMapping("/{id}")
    public StandardResult<ClaimDTO> getById(@PathVariable Long id) {
        Optional<Claim> claim = claimService.findById(id);
        if (claim.isPresent()) {
            return new StandardResult<>(true, "", ClaimDTO.fromEntity(claim.get()));
        } else {
            return new StandardResult<>(false, "Claim not found", null);
        }
    }

    @PutMapping("/{id}")
    public StandardResult<ClaimDTO> update(@PathVariable Long id, @RequestBody ClaimDTO claimDTO) {
        try {
            Claim updated = claimService.update(id, ClaimDTO.toEntity(claimDTO));
            return new StandardResult<>(true, "", ClaimDTO.fromEntity(updated));
        } catch (Exception e) {
            return new StandardResult<>(false, e.getMessage(), null);
        }
    }

    @DeleteMapping("/{id}")
    public StandardResult<Void> delete(@PathVariable Long id) {
        try {
            claimService.delete(id);
            return new StandardResult<>(true, "", null);
        } catch (Exception e) {
            return new StandardResult<>(false, e.getMessage(), null);
        }
    }
}
