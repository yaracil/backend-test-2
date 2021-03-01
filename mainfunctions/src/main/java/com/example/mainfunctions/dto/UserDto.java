package com.example.mainfunctions.dto;

import com.example.mainfunctions.model.User;
import lombok.*;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class UserDto {

    private Integer idUser;
    private Integer role;
    private String email;
    private String name;
    private String lastName;
    private String password;


    public UserDto(User user) {
        if (user != null) {
            this.email = user.getEmail();
            this.lastName = user.getLastName();
            this.name = user.getName();
            this.idUser = user.getIdUser();
            this.role = user.getRole();

        }
    }

}
