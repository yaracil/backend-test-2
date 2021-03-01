package com.example.mainfunctions.service.impl;

import com.example.mainfunctions.dto.OrderDto;
import com.example.mainfunctions.model.GroceryOrder;
import com.example.mainfunctions.repositories.OrderRepository;
import com.example.mainfunctions.repositories.UserRepository;
import com.example.mainfunctions.service.OrderService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;

@Service
public class OrderServiceImpl implements OrderService {

    static final Logger LOG = LogManager.getLogger(OrderServiceImpl.class);

    @Autowired
    OrderRepository orderRepository;

    @Autowired
    UserRepository userRepository;


    @Override
    @Transactional(rollbackFor = Exception.class)
    public GroceryOrder save(OrderDto orderDto) {
        // Validar USERNAME repetido
//        Order orderExist = orderRepository.findById(orderDto.getIdOrder()).orElse(null);
//        LOG.info(orderExist);
//        if (orderExist != null) {
//            throw new MyAppException("msg.order.duplicated");
//        }
        GroceryOrder groceryOrder = new GroceryOrder();
        groceryOrder.setFeedback(orderDto.getFeedback());
        groceryOrder.setNotes(orderDto.getNotes());
        groceryOrder.setRate(orderDto.getRate());
        groceryOrder.setItems(Collections.emptyList());
        groceryOrder.setUser(userRepository.findById(orderDto.getIdUser()).orElse(null));
        return orderRepository.save(groceryOrder);
    }
}
