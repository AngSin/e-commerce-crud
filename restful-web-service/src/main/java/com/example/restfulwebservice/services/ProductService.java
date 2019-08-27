package com.example.restfulwebservice.services;

import com.example.restfulwebservice.models.Product;
import com.example.restfulwebservice.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    @Cacheable(value = "globalCache")
    public List<Product> retrieveAllByCategoryId(long categoryId) {
        return productRepository.findAllByCategoryId(categoryId);
    }

    @Cacheable(value = "globalCache")
    public Page<Product> retrieveAllByCategoryId(long categoryId, Pageable pageable) {
        return productRepository.findAllByCategoryId(categoryId, pageable);
    }

    @Cacheable(value = "globalCache")
    public Optional<Product> retrieve(long id) {
        return productRepository.findById(id);
    }

    @CacheEvict(value = "globalCache", allEntries = true)
    @Transactional(readOnly = false)
    public Product create(Product product) {
        return productRepository.save(product);
    }

    @CacheEvict(value = "globalCache", allEntries = true)
    @Transactional(readOnly = false)
    public void delete(long id) {
        productRepository.deleteById(id);
    }

    @CacheEvict(value = "globalCache", allEntries = true)
    @Transactional(readOnly = false)
    public Product update(Product product) {
        return productRepository.save(product);
    }
}
