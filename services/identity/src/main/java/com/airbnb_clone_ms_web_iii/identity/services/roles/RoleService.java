package com.airbnb_clone_ms_web_iii.identity.services.roles;

import com.airbnb_clone_ms_web_iii.identity.dtos.events.roles.ClaimAddedEvent;
import com.airbnb_clone_ms_web_iii.identity.models.roles.Claim;
import com.airbnb_clone_ms_web_iii.identity.models.roles.Role;
import com.airbnb_clone_ms_web_iii.identity.repositories.roles.ClaimRepository;
import com.airbnb_clone_ms_web_iii.identity.repositories.roles.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoleService {

    private final String ROLE_TOPIC = "role_events";

    private final RoleRepository roleRepository;
    private final ClaimRepository claimRepository;
    private final KafkaTemplate<String, Object> kafkaTemplate;

    @Autowired
    public RoleService(RoleRepository roleRepository, ClaimRepository claimRepository, KafkaTemplate<String, Object> kafkaTemplate) {
        this.roleRepository = roleRepository;
        this.claimRepository = claimRepository;
        this.kafkaTemplate = kafkaTemplate;
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

        //if role has a claim with the same id, do nothing
        if(role.getClaims().stream().anyMatch(c -> c.getId().equals(claim.getId()))){
            return role;
        }

        role.getClaims().add(claim);
        roleRepository.save(role);

        try{
            //Fixe user id to 1L for until I implement the JWT and all the auth flow
            ClaimAddedEvent event = new ClaimAddedEvent(1L, claim, roleId);
            kafkaTemplate.send(ROLE_TOPIC, event);
        }catch (Exception ex){
            System.out.println("Failed to send Kafka event: " + ex.getMessage());
        }

        return role;
    }

    public Role removeClaimFromRole(Long roleId, Long claimId) {
        Role role = roleRepository.findById(roleId).orElseThrow();
        Claim claim = claimRepository.findById(claimId).orElseThrow();

        role.getClaims().removeIf(c -> c.getId().equals(claim.getId()));
        roleRepository.save(role);

        return role;
    }

}
