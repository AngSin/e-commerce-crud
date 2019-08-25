package com.example.restfulwebservice.repositories;

import com.example.restfulwebservice.entities.Rate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RateRepository extends JpaRepository<Rate, String> {
}
