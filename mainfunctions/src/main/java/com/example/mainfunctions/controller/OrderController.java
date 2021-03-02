package com.example.mainfunctions.controller;

import com.example.mainfunctions.dto.OrderDto;
import com.example.mainfunctions.model.GroceryOrder;
import com.example.mainfunctions.repositories.OrderRepository;
import com.example.mainfunctions.service.OrderService;
import com.example.mainfunctions.util.MyAppException;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
@RequestMapping("/orders")
public class OrderController extends ResponseEntityExceptionHandler {

    static final Logger LOG = LogManager.getLogger(OrderController.class);

    @Autowired
    OrderService orderService;
    @Autowired
    OrderRepository orderRepository;


    @GetMapping
    @ResponseBody
    @CrossOrigin
    public Iterable<GroceryOrder> findAllOrders() {
        return orderRepository.findAll();
    }

    @GetMapping("/find")
    @ResponseBody
    @CrossOrigin
    public Iterable<GroceryOrder> findAllByIdUser(@RequestParam("idUser") Integer idUser) {
        return orderRepository.findAllByUserIdUser(idUser);
    }

    @GetMapping("/{idOrder}")
    @CrossOrigin
    @ResponseBody
    public GroceryOrder findOrderById(@PathVariable Integer idOrder) {
        return orderRepository.findById(idOrder).orElse(null);
    }

    @DeleteMapping("/{idOrder}")
    @CrossOrigin
    public HttpStatus deleteOrderById(@PathVariable Integer idOrder) {
        orderRepository.deleteById(idOrder);
        return HttpStatus.OK;
    }

    @PostMapping
    @ResponseBody
    @CrossOrigin
    public ResponseEntity<Object> createOrder(@RequestBody OrderDto orderDto) {
        Map<String, Object> response = new HashMap<>();

        response.put("data", orderService.save(orderDto));
        response.put("success", "true");
        return ResponseEntity.ok(response);
    }

    @PatchMapping("/{idOrder}")
    @CrossOrigin
    public ResponseEntity<Object> updateOrderById(@PathVariable Integer idOrder, @RequestBody OrderDto orderDto) {
        LOG.info("Editing order " + idOrder + " dto: " + orderDto.toString());
        Map<String, Object> response = new HashMap<>();
        GroceryOrder groceryOrderFromDb = orderRepository.findById(idOrder).orElse(null);
        if (groceryOrderFromDb == null) {
            throw new MyAppException("msg.order.notexists");
        }
        orderDto.setIdOrder(idOrder);
        response.put("data", orderService.save(orderDto));
        response.put("success", "true");
        return ResponseEntity.ok(response);
    }
}
