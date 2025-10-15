package com.airbnb_clone_ms_web_iii.identity.services.users;

import com.airbnb_clone_ms_web_iii.identity.dtos.auth.LoginDTO;
import com.airbnb_clone_ms_web_iii.identity.dtos.auth.RegisterDTO;
import com.airbnb_clone_ms_web_iii.identity.models.roles.Role;
import com.airbnb_clone_ms_web_iii.identity.models.users.User;
import com.airbnb_clone_ms_web_iii.identity.repositories.users.UserRepository;
import com.airbnb_clone_ms_web_iii.identity.services.roles.RoleService;
import com.airbnb_clone_ms_web_iii.identity.utils.security.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final RoleService roleService;

    @Value("${app.default-role}")
    private String DEFAULT_ROLE;

    @Autowired
    public UserService(UserRepository userRepository, RoleService roleService) {
        this.userRepository = userRepository;
        this.roleService = roleService;
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

    @Override
    public UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

}
