package com.example.mainfunctions.repositories;

import com.example.mainfunctions.model.GroceryOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<GroceryOrder, Integer> {

}
