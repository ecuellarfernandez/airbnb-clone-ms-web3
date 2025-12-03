package com.airbnb_clone_ms_web_iii.identity.dtos.users;

import com.airbnb_clone_ms_web_iii.identity.dtos.roles.RoleDTO;
import com.airbnb_clone_ms_web_iii.identity.utils.value_objects.Email;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {

    private Long id;
    private String username;
    private String email;
    private String firstName;
    private String lastName;
    private List<RoleDTO> roles;

    public static UserDTO fromEntity(com.airbnb_clone_ms_web_iii.identity.models.users.User user) {
        return new UserDTO(
                user.getId(),
                user.getUsername(),
                user.getEmail().toString(),
                user.getFirstName(),
                user.getLastName(),
                user.getRoles().stream().map(RoleDTO::fromEntity).toList()
        );
    }

    public static com.airbnb_clone_ms_web_iii.identity.models.users.User toEntity(UserDTO userDTO) {
        com.airbnb_clone_ms_web_iii.identity.models.users.User user = new com.airbnb_clone_ms_web_iii.identity.models.users.User();
        user.setId(userDTO.getId());
        user.setUsername(userDTO.getUsername());
        user.setEmail(Email.of(userDTO.getEmail()));
        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());
        return user;
    }
}
