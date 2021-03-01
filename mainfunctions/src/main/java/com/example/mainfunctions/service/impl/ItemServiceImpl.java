package com.example.mainfunctions.service.impl;

import com.example.mainfunctions.dto.ItemDto;
import com.example.mainfunctions.model.Item;
import com.example.mainfunctions.repositories.ItemRepository;
import com.example.mainfunctions.service.ItemService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ItemServiceImpl implements ItemService {

    static final Logger LOG = LogManager.getLogger(ItemServiceImpl.class);

    @Autowired
    ItemRepository itemRepository;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Item save(ItemDto itemDto) {
        Item item = new Item();
        item.setName(itemDto.getName());
        item.setPrice(itemDto.getPrice());
        return itemRepository.save(item);
    }
}
