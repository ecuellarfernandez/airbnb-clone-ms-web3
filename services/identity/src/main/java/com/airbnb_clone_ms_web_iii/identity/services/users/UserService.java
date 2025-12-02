package com.airbnb_clone_ms_web_iii.identity.services.users;

import com.airbnb_clone_ms_web_iii.identity.dtos.auth.LoginDTO;
import com.airbnb_clone_ms_web_iii.identity.dtos.auth.RegisterDTO;
import com.airbnb_clone_ms_web_iii.identity.dtos.integration_events.users.UserCreatedIntegrationEvent;
import com.airbnb_clone_ms_web_iii.identity.models.roles.Role;
import com.airbnb_clone_ms_web_iii.identity.models.users.User;
import com.airbnb_clone_ms_web_iii.identity.repositories.users.UserRepository;
import com.airbnb_clone_ms_web_iii.identity.services.roles.RoleService;
import com.airbnb_clone_ms_web_iii.identity.utils.security.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService implements UserDetailsService {

    private final String USER_TOPIC = "user_events";
    private final UserRepository userRepository;
    private final RoleService roleService;
    private final KafkaTemplate<String, Object> kafkaTemplate;

    @Value("${app.default-role}")
    private String DEFAULT_ROLE;

    @Autowired
    public UserService(UserRepository userRepository, RoleService roleService, KafkaTemplate<String, Object> kafkaTemplate) {
        this.userRepository = userRepository;
        this.roleService = roleService;
        this.kafkaTemplate = kafkaTemplate;
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    public User findById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    public Page<User> findBySearch(String searchTerm, int pageSize, int pageNumber){
        PageRequest pageRequest = PageRequest.of(pageNumber, pageSize);
        return userRepository.searchUsers(searchTerm, pageRequest);
    }

    // aceptar enum Role.RoleName directamente (coincide con el controlador y repositorio)
    public Page<User> findByRole(Role.RoleName roleName, int pageSize, int pageNumber) {
        PageRequest pageRequest = PageRequest.of(pageNumber, pageSize);
        return userRepository.findByRole(roleName, pageRequest);
    }

    // sobrecarga para aceptar String (case-insensitive) y convertir a enum
    public Page<User> findByRole(String roleName, int pageSize, int pageNumber) {
        Role.RoleName parsed;
        try {
            parsed = Role.RoleName.valueOf(roleName.toUpperCase());
        } catch (Exception ex) {
            throw new IllegalArgumentException("Invalid role name: " + roleName);
        }
        return findByRole(parsed, pageSize, pageNumber);
    }

    public User saveUser(RegisterDTO registerDTO){
        //check if user exists
        Optional<User> existingUser = userRepository.findByUsername(registerDTO.getUsername());
        if(existingUser.isPresent()) {
            throw new IllegalArgumentException("Username already exists");
        }

        Optional <User> existingEmail = userRepository.findByEmail(registerDTO.getEmail());
        if(existingEmail.isPresent()) {
            throw new IllegalArgumentException("Email already exists");
        }

        String passwordHash = SecurityUtils.encryptPassword(registerDTO.getPassword());

        User newUser = new User(registerDTO.getUsername(),
                registerDTO.getFirstName(),
                registerDTO.getLastName(),
                registerDTO.getEmail(),
                passwordHash
        );

        Role clientRole = roleService.findByName(DEFAULT_ROLE);
        newUser.setRoles(java.util.Collections.singletonList(clientRole));

        try{

            UserCreatedIntegrationEvent event = new UserCreatedIntegrationEvent(newUser);

            kafkaTemplate.send(USER_TOPIC, event);
            System.out.println("User created event sent for user: " + newUser.getUsername());
        } catch (Exception e) {
            System.out.println("Failed to send user created event: " + e.getMessage());
        }

        return userRepository.save(newUser);
    }

    public User loginUser(LoginDTO loginDTO) {
        User user = userRepository.findByUsername(loginDTO.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        if(!SecurityUtils.matches(loginDTO.getPassword(), user.getPasswordHash())) {
            throw new IllegalArgumentException("Invalid password");
        }
        return user;
    }

    public User addRoleToUser(User user, Long roleId){
        Optional<Role> role = roleService.findById(roleId);

        if(role.isEmpty()){
            throw new IllegalArgumentException("Role not found");
        }
        if(user.getRoles().stream().anyMatch(r -> r.getId().equals(roleId))){
            throw new IllegalArgumentException("User already has this role");
        }
        user.getRoles().add(role.get());
        return userRepository.save(user);
    }

    public User revokeRoleFromUser(User user, Long roleId){
        Optional<Role> role = roleService.findById(roleId);

        if(role.isEmpty()){
            throw new IllegalArgumentException("Role not found");
        }
        if(user.getRoles().stream().noneMatch(r -> r.getId().equals(roleId))){
            throw new IllegalArgumentException("User does not have this role");
        }
        user.getRoles().removeIf(r -> r.getId().equals(roleId));
        return userRepository.save(user);
    }

    @Override
    public UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

}
