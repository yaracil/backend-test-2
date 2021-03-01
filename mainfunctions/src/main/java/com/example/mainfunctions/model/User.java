package com.example.mainfunctions.model;

import lombok.*;
import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@ToString
@Table
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idUser;

    @Column(name = "email")
    private String email;

    @Column(name = "name")
    private String name;

    @Column(name = "role")
    private Integer role;

    @Column(name = "lastName")
    private String lastName;

    @Column(name = "password")
    private String password;

}
