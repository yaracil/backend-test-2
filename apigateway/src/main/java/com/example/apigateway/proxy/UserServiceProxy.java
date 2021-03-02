package com.example.apigateway.proxy;

import com.example.apigateway.dto.User;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "api")
public interface UserServiceProxy {

    @RequestMapping(method = RequestMethod.GET, value = "/users/find", consumes = "application/json")
    User findFirstByUsername(@RequestParam String username);
}
