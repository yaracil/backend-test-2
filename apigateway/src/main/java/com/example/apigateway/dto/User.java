package com.example.apigateway.dto;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class User {

    private Integer idUser;
    private Integer role;
    private String email;
    private String name;
    private String password;
    @JsonSerialize
    @JsonDeserialize
    private transient String token;

}
