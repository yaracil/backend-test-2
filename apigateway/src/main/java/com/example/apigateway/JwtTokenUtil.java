package com.example.apigateway;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.util.Date;

@Component
public class JwtTokenUtil implements Serializable {

    @Value("${jwt.security.key}")
    private String jwtKey;

    public static final long ACCESS_TOKEN_VALIDITY_SECONDS = 1 * 60 * 60; // 1 HORA

    public String doGenerateToken(String subject) {
        Claims claims = Jwts.claims().setSubject(subject);
        return Jwts.builder()
                .setClaims(claims)
                .setIssuer("http://jwtdemo.com")
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + ACCESS_TOKEN_VALIDITY_SECONDS * 1000))
                .signWith(SignatureAlgorithm.HS256, jwtKey)
                .compact();
    }

    private Claims getAllClaimsFromToken(String token) {
        return Jwts.parser()
                .setSigningKey(jwtKey)
                .parseClaimsJws(token)
                .getBody();
    }

    public String getUsernameFromToken(String token) {
        final Claims claims = getAllClaimsFromToken(token);
        return claims.getSubject();
    }

    public Boolean validateToken(String token, UserDetails userDetails) {
        final Claims claims = getAllClaimsFromToken(token);
        return (
                claims.getSubject().equals(userDetails.getUsername())
                        && !claims.getExpiration().before(new Date()));
    }
}