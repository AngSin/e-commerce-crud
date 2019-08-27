package com.example.restfulwebservice.repositories;

import com.example.restfulwebservice.models.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    public List<Category> findAllByParentCategoryId(long id);
    public List<Category> findAllByParentCategoryId(Long id);
}
