package com.airbnb_clone_ms_web_iii.identity.services.security;


import com.airbnb_clone_ms_web_iii.identity.models.users.User;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.List;

@Service
public class JwtService {

    // The raw secret string loaded from application properties
    @Value("${security.jwt.secret}")
    private String jwtSecret;

    @Value("${security.jwt.expiration}")
    private long jwtExpirationMs;

    private SecretKey signingKey; // The secure key object

    /**
     * Initializes the secure SecretKey object from the raw JWT_KEY string.
     */
    @PostConstruct
    public void init() {
        byte[] keyBytes = jwtSecret.getBytes(StandardCharsets.UTF_8);
        this.signingKey = Keys.hmacShaKeyFor(keyBytes);
    }

    /**
     * Generates the signed JWT token.
     */
    public String generateToken(UserDetails userDetails){
        return Jwts.builder()
                .setSubject(userDetails.getUsername())
                .claim("roles", userDetails.getAuthorities()
                        .stream()
                        .map(GrantedAuthority::getAuthority)
                        .toList())
                .claim("id", ((User) userDetails).getId())
                .claim("key", "identity-service-key")
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpirationMs))
                // LEGACY SYNTAX: signWith(SecretKey, SignatureAlgorithm) is the correct signature here.
                .signWith(signingKey, SignatureAlgorithm.HS256)
                .compact();
    }

    /**
     * Extracts the Subject (Username) from the token payload.
     */
    public String extractUsername(String token){
        return Jwts.parser()
                // LEGACY SYNTAX: Use setSigningKey(SecretKey)
                .setSigningKey(signingKey)
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    /**
     * Extracts the custom "id" claim (UserId) from the token payload.
     */
    public Long extractUserId(String token){
        return Jwts.parser()
                .setSigningKey(signingKey)
                .parseClaimsJws(token)
                .getBody()
                .get("id", Long.class);
    }

    /**
     * Extracts the custom "roles" claim from the token payload.
     */
    public List<String> extractRoles(String token){
        return Jwts.parser()
                .setSigningKey(signingKey)
                .parseClaimsJws(token)
                .getBody()
                .get("roles", List.class);
    }

    /**
     * Validates the token's signature and expiration.
     */
    public boolean validateToken(String token, UserDetails userDetails){
        try {
            // LEGACY SYNTAX: Attempts to parse the token to validate signature/expiration
            Jwts.parser()
                    .setSigningKey(signingKey)
                    .parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            System.err.println("JWT Validation Failed: " + e.getMessage());
            return false;
        }
    }
}