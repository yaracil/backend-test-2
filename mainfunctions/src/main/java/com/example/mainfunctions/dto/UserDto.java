package com.example.mainfunctions.dto;

import com.example.mainfunctions.model.User;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class UserDto {

    private int id;
    private String email;
    private String name;
    private String lastName;
    private String password;

    public UserDto(User user) {
        if (user != null) {
            this.email = user.getEmail();
            this.lastName = user.getLastName();
            this.name = user.getName();
            this.id = user.getIdUser();
        }
    }

}
