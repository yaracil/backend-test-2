package com.example.apigateway.service;


import com.example.apigateway.dto.User;

public interface UserService {

    User findOne(String username);
}
