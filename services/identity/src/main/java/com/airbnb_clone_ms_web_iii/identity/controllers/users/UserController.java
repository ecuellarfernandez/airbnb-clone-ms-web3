package com.airbnb_clone_ms_web_iii.identity.controllers.users;

import com.airbnb_clone_ms_web_iii.identity.dtos.pojos.StandardResult;
import com.airbnb_clone_ms_web_iii.identity.dtos.users.UserDTO;
import com.airbnb_clone_ms_web_iii.identity.models.users.User;
import com.airbnb_clone_ms_web_iii.identity.services.users.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/users")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{id}")
    public StandardResult<UserDTO> getUserById(@PathVariable("id") Long id) {
        StandardResult<UserDTO> result = new StandardResult<>();
        try{

            User theUser = userService.findById(id);
            if(theUser == null){
                throw new IllegalArgumentException("User not found");
            }

            UserDTO userDTO = UserDTO.fromEntity(theUser);
            result.setData(userDTO);
            result.setSuccess(true);
        }catch (Exception ex){
            result.setSuccess(false);
            result.setErrorMessage(ex.getMessage());
            return result;
        }
        return result;
    }

}
