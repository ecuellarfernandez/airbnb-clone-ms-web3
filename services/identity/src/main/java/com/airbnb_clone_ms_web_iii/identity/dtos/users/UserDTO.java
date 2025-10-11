package com.airbnb_clone_ms_web_iii.identity.dtos.users;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {

    private Long id;
    private String username;
    private String email;
    private String firstName;
    private String lastName;

    public static UserDTO fromEntity(com.airbnb_clone_ms_web_iii.identity.models.users.User user) {
        return new UserDTO(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getFirstName(),
                user.getLastName()
        );
    }

    public static com.airbnb_clone_ms_web_iii.identity.models.users.User toEntity(UserDTO userDTO) {
        com.airbnb_clone_ms_web_iii.identity.models.users.User user = new com.airbnb_clone_ms_web_iii.identity.models.users.User();
        user.setId(userDTO.getId());
        user.setUsername(userDTO.getUsername());
        user.setEmail(userDTO.getEmail());
        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());
        return user;
    }
}
