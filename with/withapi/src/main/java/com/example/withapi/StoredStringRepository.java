package com.example.withapi;

import org.springframework.data.jpa.repository.JpaRepository;

public interface StoredStringRepository extends JpaRepository<StoredString, Long> {
}
