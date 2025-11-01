package com.airbnb_clone_ms_web_iii.identity.dtos.roles;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ClaimCreateDTO {
    public String name;
    public String description;
    public boolean active;

    public static com.airbnb_clone_ms_web_iii.identity.models.roles.Claim toEntity(ClaimCreateDTO claimCreateDTO) {
        com.airbnb_clone_ms_web_iii.identity.models.roles.Claim claim = new com.airbnb_clone_ms_web_iii.identity.models.roles.Claim();
        claim.setName(claimCreateDTO.getName());
        claim.setDescription(claimCreateDTO.getDescription());
        claim.setActive(claimCreateDTO.isActive());
        return claim;
    }

}
