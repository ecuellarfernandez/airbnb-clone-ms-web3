package com.airbnb_clone_ms_web_iii.identity.dtos.roles;

import com.airbnb_clone_ms_web_iii.identity.models.roles.Claim;
import lombok.Data;
import java.util.List;

@Data
public class RoleDTO {
    private Long id;
    private String name;
    private String description;
    private boolean active;
    private List<String> claims;

    public static RoleDTO fromEntity(com.airbnb_clone_ms_web_iii.identity.models.roles.Role role) {
        RoleDTO dto = new RoleDTO();
        dto.setId(role.getId());
        dto.setName(role.getName().name());
        dto.setDescription(role.getDescription());
        dto.setActive(role.isActive());
        dto.setClaims(role.getClaims().stream().map(Claim::getName).toList());
        return dto;
    }
}
