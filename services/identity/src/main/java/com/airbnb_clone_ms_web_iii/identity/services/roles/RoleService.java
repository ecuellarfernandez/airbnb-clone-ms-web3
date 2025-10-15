package com.airbnb_clone_ms_web_iii.identity.services.roles;

import com.airbnb_clone_ms_web_iii.identity.models.roles.Claim;
import com.airbnb_clone_ms_web_iii.identity.models.roles.Role;
import com.airbnb_clone_ms_web_iii.identity.repositories.roles.ClaimRepository;
import com.airbnb_clone_ms_web_iii.identity.repositories.roles.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoleService {

    private final RoleRepository roleRepository;
    private final ClaimRepository claimRepository;

    @Autowired
    public RoleService(RoleRepository roleRepository, ClaimRepository claimRepository) {
        this.roleRepository = roleRepository;
        this.claimRepository = claimRepository;
    }

    public Role findByName(String name) {
        Role.RoleName roleName;
        try {
            roleName = Role.RoleName.valueOf(name.toUpperCase());
        } catch (IllegalArgumentException ex) {
            throw new IllegalArgumentException("Invalid role name");
        }
        return roleRepository.findByName(roleName);
    }

    public Optional<Role> findById(Long id) {
        return roleRepository.findById(id);
    }

    public List<Role> findAll() {
        return roleRepository.findAll();
    }

    public Page<Role> findAll(Pageable pageable) {
        return roleRepository.findAll(pageable);
    }

    public Role addClaimToRole(Long roleId, Long claimId) {
        Role role = roleRepository.findById(roleId).orElseThrow();
        Claim claim = claimRepository.findById(claimId).orElseThrow();
        if (!role.getClaims().contains(claim)) {
            role.getClaims().add(claim);
            roleRepository.save(role);
        }
        return role;
    }

    public Role removeClaimFromRole(Long roleId, Long claimId) {
        Role role = roleRepository.findById(roleId).orElseThrow();
        Claim claim = claimRepository.findById(claimId).orElseThrow();
        if (role.getClaims().contains(claim)) {
            role.getClaims().remove(claim);
            roleRepository.save(role);
        }
        return role;
    }

}
