package com.example.mainfunctions.controller;

import com.example.mainfunctions.dto.UserDto;
import com.example.mainfunctions.model.User;
import com.example.mainfunctions.repositories.UserRepository;
import com.example.mainfunctions.service.UsersService;
import com.example.mainfunctions.util.MyAppException;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;


import javax.persistence.EntityNotFoundException;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
@RequestMapping("/users")
public class UserController extends ResponseEntityExceptionHandler {

    static final Logger LOG = LogManager.getLogger(UserController.class);

    @Autowired
    UsersService usersService;
    @Autowired
    UserRepository userRepository;
    @Autowired
    MessageSource messageSource;

    @GetMapping
    @ResponseBody
    @CrossOrigin
    public Iterable<User> findAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/{userId}")
    @CrossOrigin
    @ResponseBody
    public User findUserById(@PathVariable Integer userId) {
        return userRepository.findById(userId).orElse(null);
    }

    @DeleteMapping("/{userId}")
    @CrossOrigin
    public HttpStatus deleteUserById(@PathVariable Integer userId) {
        userRepository.deleteById(userId);
        return HttpStatus.OK;
    }

    @PostMapping("/register")
    @ResponseBody
    @CrossOrigin
    public ResponseEntity<Object> createNewUser(@RequestBody UserDto userDto) {
        Map<String, Object> response = new HashMap<>();

        response.put("data", usersService.save(userDto));
        response.put("success", "true");
        return ResponseEntity.ok(response);
    }

    @PatchMapping("/{userId}")
    @CrossOrigin
    public User updateUserById(@PathVariable Integer userId, @RequestBody User userRequest) {
        LOG.info("#updateUserById " + userRequest.toString());
        User userFromDb = userRepository.findById(userId).orElse(null);
        if (userFromDb == null) {
            throw new MyAppException("msg.user.notexists");
        }
        userFromDb.setEmail(userRequest.getEmail());
        return userRepository.save(userFromDb);
    }

    @GetMapping("/find")
    public User findFirstByUsername(@RequestParam String username) {
        return userRepository.findFirstByEmailIgnoreCase(username);
    }

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatus status, WebRequest request) {

        return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(EntityNotFoundException.class)
    private ResponseEntity<Object> handleEntityNotFound(EntityNotFoundException ex) {

        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(MyAppException.class)
    public ResponseEntity<Object> handleMyAppException(MyAppException ex,
                                                       WebRequest request) {
        Map<String, Object> response = new HashMap<>();

        response.put("internalError", "true");
        String message = messageSource.getMessage(ex.getMessage(), null, LocaleContextHolder.getLocale());
        response.put("message", message);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

}
