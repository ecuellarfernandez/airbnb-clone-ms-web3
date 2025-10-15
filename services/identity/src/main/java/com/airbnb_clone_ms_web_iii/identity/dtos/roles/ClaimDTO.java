package com.airbnb_clone_ms_web_iii.identity.dtos.roles;

import lombok.Data;

@Data
public class ClaimDTO {
    private Long id;
    private String name;
    private String description;
    private boolean active;

    public static ClaimDTO fromEntity(com.airbnb_clone_ms_web_iii.identity.models.roles.Claim claim) {
        ClaimDTO claimDTO = new ClaimDTO();
        claimDTO.setId(claim.getId());
        claimDTO.setName(claim.getName());
        claimDTO.setDescription(claim.getDescription());
        claimDTO.setActive(claim.isActive());
        return claimDTO;
    }

    public static com.airbnb_clone_ms_web_iii.identity.models.roles.Claim toEntity(ClaimDTO claimDTO) {
        com.airbnb_clone_ms_web_iii.identity.models.roles.Claim claim = new com.airbnb_clone_ms_web_iii.identity.models.roles.Claim();
        claim.setId(claimDTO.getId());
        claim.setName(claimDTO.getName());
        claim.setDescription(claimDTO.getDescription());
        claim.setActive(claimDTO.isActive());
        return claim;
    }
}