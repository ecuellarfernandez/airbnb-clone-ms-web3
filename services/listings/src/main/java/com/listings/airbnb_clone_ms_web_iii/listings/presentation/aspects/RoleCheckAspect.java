package com.listings.airbnb_clone_ms_web_iii.listings.presentation.aspects;

import com.listings.airbnb_clone_ms_web_iii.listings.domain.annotations.NeedsRoles;
import jakarta.servlet.http.HttpServletRequest;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.server.ResponseStatusException;

import java.util.Arrays;
import java.util.List;

@Aspect
@Component
public class RoleCheckAspect {

    @Before("@annotation(needsRoleAnnotation)")
    public void checkRole(NeedsRoles needsRoleAnnotation){

        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        if(attributes == null){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Could not retrieve request attributes");
        }

        HttpServletRequest request = attributes.getRequest();

        String rolesHeader = request.getHeader("X-User-Roles");
        if(rolesHeader == null || rolesHeader.trim().isEmpty()){
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "No roles provided");
        }

        List<String> requiredRoles = Arrays.stream(needsRoleAnnotation.value()).toList();
        List<String> providedRoles = List.of(rolesHeader.split(";"));
        if(providedRoles.stream().noneMatch(requiredRoles::contains)){
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Insufficient role");
        }

        System.out.println("Role check passed for role: " + requiredRoles);
    }

}
