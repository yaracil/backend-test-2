package com.example.mainfunctions.controller;

import com.example.mainfunctions.dto.ItemDto;
import com.example.mainfunctions.model.Item;
import com.example.mainfunctions.repositories.ItemRepository;
import com.example.mainfunctions.service.ItemService;
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
@RequestMapping("/items")
public class ItemController extends ResponseEntityExceptionHandler {

    static final Logger LOG = LogManager.getLogger(ItemController.class);

    @Autowired
    ItemRepository itemRepository;
    @Autowired
    ItemService itemService;


    @GetMapping
    @ResponseBody
    @CrossOrigin
    public Iterable<Item> findAllItems() {
        return itemRepository.findAll();
    }

    @GetMapping("/{idItem}")
    @CrossOrigin
    @ResponseBody
    public Item findItemById(@PathVariable Integer idItem) {
        return itemRepository.findById(idItem).orElse(null);
    }

    @DeleteMapping("/{idItem}")
    @CrossOrigin
    public HttpStatus deleteItemById(@PathVariable Integer idItem) {
        itemRepository.deleteById(idItem);
        return HttpStatus.OK;
    }

    @PostMapping
    @ResponseBody
    @CrossOrigin
    public ResponseEntity<Object> createItem(@RequestBody ItemDto itemDto) {
        Map<String, Object> response = new HashMap<>();
        response.put("data", itemService.save(itemDto));
        response.put("success", "true");
        return ResponseEntity.ok(response);
    }

    @PatchMapping("/{idItem}")
    @CrossOrigin
    public ResponseEntity<Object> updateItemById(@PathVariable Integer idItem, @RequestBody ItemDto itemDto) {
        LOG.info("Editing item " + idItem);
        Map<String, Object> response = new HashMap<>();
        Item itemFromDb = itemRepository.findById(idItem).orElse(null);
        if (itemFromDb == null) {
            throw new MyAppException("msg.item.notexists");
        } else itemDto.setIdItem(idItem);
        response.put("data", itemService.save(itemDto));
        response.put("success", "true");
        return ResponseEntity.ok(response);
    }
}
