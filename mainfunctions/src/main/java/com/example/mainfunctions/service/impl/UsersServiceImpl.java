package com.example.mainfunctions.service.impl;

import com.example.mainfunctions.dto.UserDto;
import com.example.mainfunctions.model.User;
import com.example.mainfunctions.repositories.UserRepository;
import com.example.mainfunctions.service.UsersService;
import com.example.mainfunctions.util.MyAppException;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UsersServiceImpl implements UsersService {

    static final Logger LOG = LogManager.getLogger(UsersServiceImpl.class);

    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    UserRepository userRepository;


    @Override
    @Transactional(rollbackFor = Exception.class)
    public User save(UserDto userDto) throws MyAppException {
        // Validar USERNAME repetido
        User existsUser = userRepository.findFirstByEmailIgnoreCase(userDto.getEmail());
        LOG.info(existsUser);
        if (existsUser != null) {
            throw new MyAppException("msg.user.duplicated");
        }
        User user = new User();
        user.setEmail(userDto.getEmail());
        user.setName(userDto.getName());
        user.setLastName(userDto.getLastName());
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        user.setRole(userDto.getRole());

        return userRepository.save(user);
    }

    @Override
    public Boolean forgotPassword(String email, String newPassword) {

        //OBTENER EL USER POR EL HEADER

        User user = userRepository.findFirstByEmailIgnoreCase(email);
        if (user == null) throw new MyAppException("msg.user.email.error");
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
        return true;
    }
}
