package com.example.restfulwebservice.repositories;

import com.example.restfulwebservice.entities.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long>, PagingAndSortingRepository<Product, Long> {
    List<Product> findAllByCategoryId(long categoryId);
    Page<Product> findAllByCategoryId(long categoryId, Pageable pageable);
    void deleteAllByCategoryId(long categoryId);
}
