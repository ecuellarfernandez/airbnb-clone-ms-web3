package com.airbnb_clone_ms_web_iii.identity.dtos.auth;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterDTO {

    private String firstName;
    private String lastName;
    private String email;
    private String username;
    private String password;
    private String phoneNumber;

}
