package com.example.mainfunctions.dto;

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
public class ItemDto {

    private Integer idItem;

    private String name;

    private String price;
}
