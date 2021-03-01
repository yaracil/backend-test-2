package com.example.mainfunctions.service;


import com.example.mainfunctions.dto.OrderDto;
import com.example.mainfunctions.model.GroceryOrder;

public interface OrderService {

    GroceryOrder save(OrderDto orderDto);
}
