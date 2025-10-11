package com.airbnb_clone_ms_web_iii.identity.services.roles;

import com.airbnb_clone_ms_web_iii.identity.models.roles.Role;
import com.airbnb_clone_ms_web_iii.identity.repositories.roles.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RoleService {

    private final RoleRepository roleRepository;

    @Autowired
    public RoleService(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
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

}
