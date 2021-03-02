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
@Table(name = "user")
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

    @Column(name = "password")
    private String password;

}
