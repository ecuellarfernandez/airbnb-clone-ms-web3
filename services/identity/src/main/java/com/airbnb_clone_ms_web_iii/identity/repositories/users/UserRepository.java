package com.airbnb_clone_ms_web_iii.identity.repositories.users;

import com.airbnb_clone_ms_web_iii.identity.models.roles.Role;
import com.airbnb_clone_ms_web_iii.identity.models.users.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);

    // get users by role with pagination - use the RoleName enum type so JPA matches the enumerated column
    @Query("SELECT u FROM User u JOIN u.roles r WHERE r.name = ?1")
    Page<User> findByRole(Role.RoleName roleName, Pageable pageable);

    @Query("SELECT u FROM User u WHERE " +
            "LOWER(u.username) LIKE LOWER(CONCAT('%', ?1, '%')) OR " +
            "LOWER(u.email) LIKE LOWER(CONCAT('%', ?1, '%'))")
    Page<User> searchUsers(String searchTerm, Pageable pageable);

}
