package com.example.mainfunctions.repositories;

import com.example.mainfunctions.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemRepository extends JpaRepository<Item, Integer> {


}
