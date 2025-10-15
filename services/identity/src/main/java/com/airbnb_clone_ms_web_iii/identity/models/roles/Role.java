package com.airbnb_clone_ms_web_iii.identity.models.roles;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "Roles")
public class Role {
    public enum RoleName {
        CLIENT,
        HOST,
        ADMIN
    }

    @Id
    @Getter
    @Setter
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private Long id;

    @Getter
    @Setter
    @Enumerated(EnumType.STRING)
    @Column(unique = true, nullable = false)
    private RoleName name;

    @Getter
    @Setter
    private String description;

    @Getter
    @Setter
    private boolean active;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "Role_Claims",
            joinColumns = @JoinColumn(name = "role_id"),
            inverseJoinColumns = @JoinColumn(name = "claim_id")
    )
    @Getter
    @Setter
    private List<Claim> claims;

    public String getNameAsString() {
        return name.name();
    }

}
