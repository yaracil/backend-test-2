package com.example.mainfunctions.model;

import lombok.*;

import javax.persistence.*;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@ToString
@Table
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idItem;

    @Column(name = "name")
    private String name;


    @Column(name = "price")
    private String price;

}
