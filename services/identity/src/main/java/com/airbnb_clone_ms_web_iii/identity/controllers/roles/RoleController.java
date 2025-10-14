package com.airbnb_clone_ms_web_iii.identity.controllers.roles;

import com.airbnb_clone_ms_web_iii.identity.dtos.pojos.PagedResponse;
import com.airbnb_clone_ms_web_iii.identity.dtos.roles.RoleDTO;
import com.airbnb_clone_ms_web_iii.identity.dtos.pojos.StandardResult;
import com.airbnb_clone_ms_web_iii.identity.models.roles.Role;
import com.airbnb_clone_ms_web_iii.identity.services.roles.RoleService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/roles")
public class RoleController {
    private final RoleService roleService;

    @Autowired
    public RoleController(RoleService roleService) {
        this.roleService = roleService;
    }

    @GetMapping("/{id}")
    public StandardResult<RoleDTO> getById(@PathVariable Long id) {
        Optional<Role> role = roleService.findById(id);
        if (role.isPresent()) {
            return new StandardResult<>(true, "", RoleDTO.fromEntity(role.get()));
        } else {
            return new StandardResult<>(false, "Role not found", null);
        }
    }

    @GetMapping
    public PagedResponse<RoleDTO> getAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Role> rolePage = roleService.findAll(pageable);
        PagedResponse<RoleDTO> response = new PagedResponse<>();
        response.setContent(rolePage.getContent().stream().map(RoleDTO::fromEntity).collect(Collectors.toList()));
        response.setPageNumber(rolePage.getNumber());
        response.setPageSize(rolePage.getSize());
        response.setTotalElements(rolePage.getTotalElements());
        response.setTotalPages(rolePage.getTotalPages());
        response.setLast(rolePage.isLast());
        response.setSuccess(true);
        response.setErrorMessage("");
        return response;
    }

    @Operation(summary = "Add claim to role", description = "Add a claim to a role by their IDs")
    @PostMapping("/{roleId}/claims/{claimId}")
    public StandardResult<RoleDTO> addClaimToRole(@PathVariable Long roleId, @PathVariable Long claimId) {
        try {
            Role updated = roleService.addClaimToRole(roleId, claimId);
            return new StandardResult<>(true, "", RoleDTO.fromEntity(updated));
        } catch (Exception e) {
            return new StandardResult<>(false, e.getMessage(), null);
        }
    }

    @Operation(summary = "Remove Claim from Role", description = "Remove a claim from a role by their IDs")
    @DeleteMapping("/{roleId}/claims/{claimId}")
    public StandardResult<RoleDTO> removeClaimFromRole(@PathVariable Long roleId, @PathVariable Long claimId) {
        try {
            Role updated = roleService.removeClaimFromRole(roleId, claimId);
            return new StandardResult<>(true, "", RoleDTO.fromEntity(updated));
        } catch (Exception e) {
            return new StandardResult<>(false, e.getMessage(), null);
        }
    }
}
