package com.example.apigateway;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;

@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

    static final Logger LOG = LogManager.getLogger(JwtAuthenticationEntryPoint.class);

    @Override
    public void commence(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, AuthenticationException e) throws IOException {
        String message = "";
        httpServletResponse.setContentType(MediaType.APPLICATION_JSON_VALUE);
        // PARA CUANDO EL TOKEN EXPIRÓ
        if (httpServletResponse.getStatus() == HttpServletResponse.SC_UNAUTHORIZED) {
            message = "TOKEN_EXPIRED";
        } else {
            httpServletResponse.setStatus(HttpServletResponse.SC_FORBIDDEN);
            if (e.getCause() != null) {
                message = e.getCause().getMessage();
            } else {
                message = e.getMessage();
            }
        }
        byte[] body = new ObjectMapper().writeValueAsBytes(Collections.singletonMap("error", message));
        httpServletResponse.getOutputStream().write(body);
    }

}
