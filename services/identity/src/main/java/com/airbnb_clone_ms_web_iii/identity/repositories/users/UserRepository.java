package com.airbnb_clone_ms_web_iii.identity.repositories.users;

import com.airbnb_clone_ms_web_iii.identity.models.users.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);

    @Query("SELECT u FROM User u WHERE u.id = ?1")
    Optional<User> findById(Long id);
}
