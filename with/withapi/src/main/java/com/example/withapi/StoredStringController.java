package com.example.withapi;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class StoredStringController {

    @Autowired
    private StoredStringService service;

    @PostMapping("/store")
    public StoredString storeString(@RequestBody String value) {
        return service.saveString(value);
    }

    @GetMapping("/random")
    public String getRandomString() {
        return service.getRandomString();
    }
}

