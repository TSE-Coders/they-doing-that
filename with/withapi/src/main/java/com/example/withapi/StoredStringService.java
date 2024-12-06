package com.example.withapi;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;

@Service
public class StoredStringService {

    @Autowired
    private StoredStringRepository repository;

    public StoredString saveString(String value) {
        StoredString storedString = new StoredString();
        storedString.setValue(value);
        return repository.save(storedString);
    }

    public String getRandomString() {
        List<StoredString> allStrings = repository.findAll();
        if (allStrings.isEmpty()) {
            return null;
        }
        Random random = new Random();
        int randomIndex = random.nextInt(allStrings.size());
        return allStrings.get(randomIndex).getValue();
    }
}
