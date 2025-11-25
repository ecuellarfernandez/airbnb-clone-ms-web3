package com.airbnb_clone_ms_web_iii.identity.controllers.security;

import com.airbnb_clone_ms_web_iii.identity.dtos.auth.LoginDTO;
import com.airbnb_clone_ms_web_iii.identity.dtos.auth.RegisterDTO;
import com.airbnb_clone_ms_web_iii.identity.dtos.pojos.*;
import com.airbnb_clone_ms_web_iii.identity.dtos.users.UserDTO;
import com.airbnb_clone_ms_web_iii.identity.models.users.User;
import com.airbnb_clone_ms_web_iii.identity.services.security.JwtService;
import com.airbnb_clone_ms_web_iii.identity.services.users.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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


    @GetMapping("/me")
    public ResponseEntity getMe(@RequestHeader("Authorization") String authHeader){
        StandardResult result = new StandardResult<>();
        try{
            String token = authHeader.replace("Bearer ", "");
            String username = jwtService.extractUsername(token);
            User theUser = userService.findByUsername(username);
            UserDTO userDTO = UserDTO.fromEntity(theUser);
            result.setData(userDTO);
            result.setSuccess(true);
        }catch(Exception ex){
            result.setSuccess(false);
            result.setErrorMessage(ex.getMessage());
        }

        return ResponseEntity
                .status(result.isSuccess() ? HttpStatus.OK : HttpStatus.UNAUTHORIZED)
                .body(result);
    }
}
