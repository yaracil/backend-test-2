package com.example.apigateway.controller;

import com.example.apigateway.JwtTokenUtil;
import com.example.apigateway.dto.LoginUser;
import com.example.apigateway.dto.User;
import com.example.apigateway.proxy.UserServiceProxy;
import com.example.apigateway.util.MyAppException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.WebRequest;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/token")
public class AuthenticationController {

    private static final Logger logger = LoggerFactory.getLogger(AuthenticationController.class);

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtTokenUtil jwtTokenUtil;
    @Autowired
    MessageSource messageSource;
    @Autowired
    UserServiceProxy userServiceProxy;

    @ResponseBody
    @CrossOrigin
    @RequestMapping(path = "/generate-token", method = RequestMethod.POST)
    public ResponseEntity<?> generateToken(@RequestBody LoginUser loginUser)
            throws AuthenticationException {
        final Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginUser.getUsername(),
                        loginUser.getPassword()
                )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        User user = userServiceProxy.findFirstByUsername(loginUser.getUsername());
        if (user == null) throw new MyAppException("msg.user.login");
        final String token = jwtTokenUtil.doGenerateToken(user.getEmail());
        user.setToken(token);

        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @ExceptionHandler({MyAppException.class, BadCredentialsException.class})
    public ResponseEntity<Object> handleMyAppException(Exception ex,
                                                       WebRequest request) {
        Map<String, Object> response = new HashMap<>();

        response.put("internalError", "true");
        if (ex.getMessage().equalsIgnoreCase("msg.user.not_enabled")) response.put("userNotEnabled", true);
        String message = "";
        if (ex instanceof BadCredentialsException)
            message = messageSource.getMessage("msg.user.login", null, LocaleContextHolder.getLocale());
        else
            message = messageSource.getMessage(ex.getMessage(), null, LocaleContextHolder.getLocale());
        response.put("message", message);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}