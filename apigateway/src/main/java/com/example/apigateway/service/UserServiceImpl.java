package com.example.apigateway.service;

import com.example.apigateway.dto.SpringUserCustom;
import com.example.apigateway.dto.User;
import com.example.apigateway.proxy.UserServiceProxy;
import com.example.apigateway.util.MyAppException;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service(value = "userService")
public class UserServiceImpl implements UserDetailsService, UserService {
    static final Logger LOG = LogManager.getLogger(UserServiceImpl.class);

    @Autowired
    UserServiceProxy userServiceProxy;

    @Override
    public SpringUserCustom loadUserByUsername(String username) throws MyAppException {
        LOG.info("loadUserByUsername EDIT: " + username);

        User user = userServiceProxy.findFirstByUsername(username);

        if (user == null) throw new MyAppException("msg.user.login");

        // NO HAY ROLES, REGRESAR ADMIN
        GrantedAuthority grantedAuthority = new SimpleGrantedAuthority("ROLE_ADMIN");
        List<GrantedAuthority> listAuth = new ArrayList<>();
        listAuth.add(grantedAuthority);

        SpringUserCustom springUser = new SpringUserCustom(user.getEmail(), user.getPassword(), listAuth);
        springUser.setIdUser(user.getIdUser());
        return springUser;
    }

    @Override
    public User findOne(String username) {
        LOG.info("findOne EDIT: " + username);
        return userServiceProxy.findFirstByUsername(username);
    }
}
