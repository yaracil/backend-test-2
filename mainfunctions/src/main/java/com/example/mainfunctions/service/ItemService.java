package com.example.mainfunctions.service;


import com.example.mainfunctions.dto.ItemDto;
import com.example.mainfunctions.model.Item;

public interface ItemService {

    Item save(ItemDto itemDto);
}
