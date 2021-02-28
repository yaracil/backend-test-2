package com.example.mainfunctions.repositories;

import com.example.mainfunctions.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    @Query(value = "SELECT * FROM User u WHERE u.email=?1 LIMIT 1", nativeQuery = true)
    User findFirstByEmailIgnoreCase(String email);
}
