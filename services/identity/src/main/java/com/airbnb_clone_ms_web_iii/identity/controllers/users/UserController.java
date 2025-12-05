package com.airbnb_clone_ms_web_iii.identity.controllers.users;

import com.airbnb_clone_ms_web_iii.identity.dtos.integration_events.BaseIntegrationEvent;
import com.airbnb_clone_ms_web_iii.identity.dtos.integration_events.EventTopics;
import com.airbnb_clone_ms_web_iii.identity.dtos.integration_events.EventTypes;
import com.airbnb_clone_ms_web_iii.identity.dtos.pojos.PagedResponse;
import com.airbnb_clone_ms_web_iii.identity.dtos.pojos.StandardResult;
import com.airbnb_clone_ms_web_iii.identity.dtos.users.UserDTO;
import com.airbnb_clone_ms_web_iii.identity.models.users.User;
import com.airbnb_clone_ms_web_iii.identity.services.users.UserService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.ResponseEntity.status;

@RestController
@RequestMapping("api/users")
public class UserController {

    private final UserService userService;
    private final KafkaTemplate<String, Object> kafkaTemplate;

    @Autowired
    public UserController(UserService userService, KafkaTemplate<String, Object> kafkaTemplate) {
        this.userService = userService;
        this.kafkaTemplate = kafkaTemplate;
    }

    @GetMapping("/{id:[0-9]+}")
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

    @PostMapping("/make-me-host")
    public ResponseEntity<StandardResult<UserDTO>> makeMeHost(
            @RequestHeader("Authorization") String authorizationHeader
    ){
        StandardResult<UserDTO> result = new StandardResult<>();
        try{
            String token = authorizationHeader.replace("Bearer ", "");
            User theUser = userService.makeMeHost(token);
            UserDTO userDTO = UserDTO.fromEntity(theUser);

            result.setData(userDTO);
            result.setSuccess(true);
        }catch (Exception ex){
            result.setSuccess(false);
            result.setErrorMessage(ex.getMessage());
        }

        try{
            BaseIntegrationEvent<UserDTO> event = new BaseIntegrationEvent<>(
                    result.getData().getId() != null ? result.getData().getId().toString() : "0",
                    EventTypes.ROLE_ADDED_TO_USER.toString(),
                    result.getData()
            );

            kafkaTemplate.send(EventTopics.user_events.toString(), event);

        }catch (Exception ex){
            System.out.println("Failed to send ROLE_ADDED_TO_USER event: " + ex.getMessage());
        }

        return status(result.isSuccess() ? 200 : 400).body(result);
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
    public ResponseEntity<StandardResult<UserDTO>> addRoleToUser(
            @RequestHeader(value = "X-User-Id", required = false) Long requesterId,
            @PathVariable("id") Long id,
            @PathVariable("roleId") Long roleId
    ) {
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
            return status(result.isSuccess() ? 200 : 400).body(result);
        }

        try{
            BaseIntegrationEvent<UserDTO> event = new BaseIntegrationEvent<>(
                    requesterId != null ? requesterId.toString() : "0",
                    EventTypes.ROLE_ADDED_TO_USER.toString(),
                    result.getData()
            );

            kafkaTemplate.send(EventTopics.user_events.toString(), event);

        }catch (Exception ex){
            System.out.println("Failed to send ROLE_ADDED_TO_USER event: " + ex.getMessage());
        }

        return status(result.isSuccess() ? 200 : 400).body(result);
    }

    @PutMapping("/{id}/remove-role/{roleId}")
    public ResponseEntity<StandardResult<UserDTO>> removeRoleFromUser(
            @RequestHeader(value = "X-User-Id", required = false) Long requesterId,
            @PathVariable("id") Long id,
            @PathVariable("roleId") Long roleId
    ) {
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
            return status(result.isSuccess() ? 200 : 400).body(result);
        }

        try{
            BaseIntegrationEvent<UserDTO> event = new BaseIntegrationEvent<>(
                    requesterId != null ? requesterId.toString() : "0",
                    EventTypes.ROLE_REMOVED_FROM_USER.toString(),
                    result.getData()
            );

            kafkaTemplate.send(EventTopics.user_events.toString(), event);

        }catch (Exception ex){
            System.out.println("Failed to send ROLE_ADDED_TO_USER event: " + ex.getMessage());
        }

        return status(result.isSuccess() ? 200 : 400).body(result);
    }

    @GetMapping("/by-ids")
    @Operation(summary = "Obtener usuarios por una lista de IDs separados por comas ';'")
    public StandardResult<List<UserDTO>> getUsersByIds(@RequestParam(value = "ids", required = false) String idsString) {

        if(idsString == null || idsString.isEmpty()){
            StandardResult<List<UserDTO>> emptyResult = new StandardResult<>();
            emptyResult.setData(List.of());
            emptyResult.setErrorMessage("List of IDs separated by ';' is required");
            emptyResult.setSuccess(true);
            return emptyResult;
        }

        StandardResult<List<UserDTO>> result = new StandardResult<>();
        try {
            List<User> users = userService.findByIdsString(idsString);
            List<UserDTO> userDTOs = users.stream().map(UserDTO::fromEntity).toList();
            result.setData(userDTOs);
            result.setSuccess(true);
        } catch (Exception ex) {
            result.setSuccess(false);
            result.setErrorMessage(ex.getMessage());
        }
        return result;
    }

}
