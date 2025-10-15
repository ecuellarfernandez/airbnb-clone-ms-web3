package com.airbnb_clone_ms_web_iii.identity.controllers.security;

import com.airbnb_clone_ms_web_iii.identity.dtos.auth.LoginDTO;
import com.airbnb_clone_ms_web_iii.identity.dtos.auth.RegisterDTO;
import com.airbnb_clone_ms_web_iii.identity.dtos.pojos.*;
import com.airbnb_clone_ms_web_iii.identity.models.users.User;
import com.airbnb_clone_ms_web_iii.identity.services.security.JwtService;
import com.airbnb_clone_ms_web_iii.identity.services.users.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/auth")
public class AuthController {

    private final UserService userService;
    private final JwtService jwtService;

    @Autowired
    public AuthController(UserService userService, JwtService jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }

    @PostMapping("/login")
    public StandardResult<TokenAuth> login(@RequestBody LoginDTO loginDTO){
        StandardResult<TokenAuth> result = new StandardResult<>();
        try{
            User theUser = userService.loginUser(loginDTO);
            String token = jwtService.generateToken(theUser);
            TokenAuth tokenAuth = new TokenAuth(token);

            result.setData(tokenAuth);
            result.setSuccess(true);
        }catch (Exception ex){
            result.setSuccess(false);
            result.setErrorMessage(ex.getMessage());
            return result;
        }

        return result;
    }

    @PostMapping("/register")
    public StandardResult<TokenAuth> register(@RequestBody RegisterDTO registerDTO){
        StandardResult<TokenAuth> result = new StandardResult<>();
        try{
            User newUser = userService.saveUser(registerDTO);

            String token = jwtService.generateToken(newUser);
            TokenAuth tokenAuth = new TokenAuth(token);
            result.setData(tokenAuth);
            result.setSuccess(true);
        }catch (Exception ex){
            result.setSuccess(false);
            result.setErrorMessage(ex.getMessage());
            return result;
        }

        return result;
    }

}
