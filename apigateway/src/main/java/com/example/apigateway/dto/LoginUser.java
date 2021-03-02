package com.example.apigateway.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class LoginUser {
    private String username;
    private String password;
}
