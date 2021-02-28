package com.example.mainfunctions.service;


import com.example.mainfunctions.dto.UserDto;
import com.example.mainfunctions.model.User;

public interface UsersService {
    User save(UserDto user);

    Boolean forgotPassword(String email, String newPassword);
}
