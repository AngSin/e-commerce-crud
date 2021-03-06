package com.example.restfulwebservice.services;

import com.example.restfulwebservice.models.Category;
import com.example.restfulwebservice.repositories.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;

    @Cacheable(value = "globalCache")
    public List<Category> retrieveAll() {
        return categoryRepository.findAll();
    }

    @Cacheable(value = "globalCache")
    public Optional<Category> retrieve(long id) {
        return categoryRepository.findById(id);
    }

    @Cacheable(value = "globalCache")
    public List<Category> retrieveAllByParentCategoryId(Long parentCategoryId) {
        return categoryRepository.findAllByParentCategoryId(parentCategoryId);
    }

    @CacheEvict(value = "globalCache", allEntries = true)
    @Transactional(readOnly = false)
    public Category create(Category category) {
        return categoryRepository.save(category);
    }

    @CacheEvict(value = "globalCache", allEntries = true)
    @Transactional(readOnly = false)
    public Category update(Category category) {
        return categoryRepository.save(category);
    }

    @CacheEvict(value = "globalCache", allEntries = true)
    @Transactional(readOnly = false)
    public void delete(long id) {
        categoryRepository.deleteById(id);
    }
}
