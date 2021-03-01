package com.example.mainfunctions.service.impl;

import com.example.mainfunctions.dto.OrderDto;
import com.example.mainfunctions.model.GroceryOrder;
import com.example.mainfunctions.model.Item;
import com.example.mainfunctions.repositories.ItemRepository;
import com.example.mainfunctions.repositories.OrderRepository;
import com.example.mainfunctions.repositories.UserRepository;
import com.example.mainfunctions.service.OrderService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    static final Logger LOG = LogManager.getLogger(OrderServiceImpl.class);

    @Autowired
    OrderRepository orderRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ItemRepository itemRepository;


    @Override
    @Transactional(rollbackFor = Exception.class)
    public GroceryOrder save(OrderDto orderDto) {
        GroceryOrder groceryOrder = orderDto.getIdOrder() == null ? new GroceryOrder() : orderRepository.findById(orderDto.getIdOrder()).orElse(new GroceryOrder());
        groceryOrder.setFeedback(orderDto.getFeedback());
        groceryOrder.setNotes(orderDto.getNotes());
        groceryOrder.setRate(orderDto.getRate());
        List<Item> items = new ArrayList<>();
        orderDto.getItems().forEach(idItem -> {
            itemRepository.findById(idItem).ifPresent(items::add);
        });
        groceryOrder.setItems(items);
        groceryOrder.setUser(userRepository.findById(orderDto.getIdUser()).orElse(null));
        return orderRepository.save(groceryOrder);
    }
}
