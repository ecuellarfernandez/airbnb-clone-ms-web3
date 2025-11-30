package com.airbnb_clone_ms_web_iii.identity.controllers.users;

import com.airbnb_clone_ms_web_iii.identity.dtos.pojos.PagedResponse;
import com.airbnb_clone_ms_web_iii.identity.dtos.pojos.StandardResult;
import com.airbnb_clone_ms_web_iii.identity.dtos.users.UserDTO;
import com.airbnb_clone_ms_web_iii.identity.models.users.User;
import com.airbnb_clone_ms_web_iii.identity.services.roles.RoleService;
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

    @GetMapping("/search")
    public PagedResponse<UserDTO> searchUsers(
            @RequestParam(value = "search", defaultValue = "") String searchTerm,
            @RequestParam(value = "page", defaultValue = "0") int pageNumber,
            @RequestParam(value = "pageSize", defaultValue = "20") int pageSize) {

        PagedResponse<UserDTO> response = new PagedResponse<>();
        try {
            var userPage = userService.findBySearch(searchTerm, pageSize, pageNumber);
            response.setContent(userPage.getContent().stream().map(UserDTO::fromEntity).toList());
            response.setPageNumber(userPage.getNumber());
            response.setPageSize(userPage.getSize());
            response.setTotalElements(userPage.getTotalElements());
            response.setTotalPages(userPage.getTotalPages());
            response.setLast(userPage.isLast());
            response.setSuccess(true);
        } catch (Exception ex) {
            response.setSuccess(false);
            response.setErrorMessage(ex.getMessage());
        }
        return response;
    }

    @GetMapping("/get-by-role/{roleName}")
    public PagedResponse<UserDTO> getByRole(
            @PathVariable("roleName") String roleName,
            @RequestParam(value = "page", defaultValue = "0") int pageNumber,
            @RequestParam(value = "pageSize", defaultValue = "20") int pageSize) {

        PagedResponse<UserDTO> response = new PagedResponse<>();
        try {
            var userPage = userService.findByRole(roleName, pageSize, pageNumber);
            response.setContent(userPage.getContent().stream().map(UserDTO::fromEntity).toList());
            response.setPageNumber(userPage.getNumber());
            response.setPageSize(userPage.getSize());
            response.setTotalElements(userPage.getTotalElements());
            response.setTotalPages(userPage.getTotalPages());
            response.setLast(userPage.isLast());
            response.setSuccess(true);
        } catch (Exception ex) {
            response.setSuccess(false);
            response.setErrorMessage(ex.getMessage());
        }
        return response;
    }



    @PutMapping("/{id}/add-role/{roleId}")
    public StandardResult<UserDTO> addRoleToUser(@PathVariable("id") Long id, @PathVariable("roleId") Long roleId) {
        StandardResult<UserDTO> result = new StandardResult<>();
        try{

            User theUser = userService.findById(id);
            if(theUser == null){
                throw new IllegalArgumentException("User not found");
            }

            userService.addRoleToUser(theUser, roleId);

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

    @PutMapping("/{id}/remove-role/{roleId}")
    public StandardResult<UserDTO> removeRoleFromUser(@PathVariable("id") Long id, @PathVariable("roleId") Long roleId) {
        StandardResult<UserDTO> result = new StandardResult<>();
        try{

            User theUser = userService.findById(id);
            if(theUser == null){
                throw new IllegalArgumentException("User not found");
            }

            userService.revokeRoleFromUser(theUser, roleId);

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
