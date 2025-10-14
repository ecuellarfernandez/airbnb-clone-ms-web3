package com.airbnb_clone_ms_web_iii.identity.repositories.roles;

import com.airbnb_clone_ms_web_iii.identity.models.roles.Claim;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClaimRepository extends JpaRepository<Claim, Long> {
}

