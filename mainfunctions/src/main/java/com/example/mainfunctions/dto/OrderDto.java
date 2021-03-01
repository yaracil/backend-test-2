package com.example.mainfunctions.dto;

import lombok.*;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class OrderDto {

    private Integer idOrder;

    private Integer idUser;

    private String notes;

    private Integer rate;

    private String feedback;

    private List<Integer> items;
}
