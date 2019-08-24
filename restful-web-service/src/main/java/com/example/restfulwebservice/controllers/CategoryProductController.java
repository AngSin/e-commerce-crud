package com.example.restfulwebservice.controllers;

import com.example.restfulwebservice.exceptions.BadRequestException;
import com.example.restfulwebservice.exceptions.NotFoundException;
import com.example.restfulwebservice.entities.Category;
import com.example.restfulwebservice.entities.Product;
import com.example.restfulwebservice.services.CategoryService;
import com.example.restfulwebservice.services.ProductService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@Api(value = "Category & Product", description = "REST API for categories and their products.", tags = { "Category", "Product" })
@RestController
public class CategoryProductController {
    @Autowired
    private CategoryService categoryService;

    @Autowired
    private ProductService productService;

    @GetMapping("/categories")
    public List<Category> retrieveAllCategories() {
        return categoryService.retrieveAll();
    }

    @GetMapping("/categories/{id}")
    public  Optional<Category> retrieveCategory(@PathVariable long id) {
        Optional<Category> category = categoryService.retrieve(id);
        if (!category.isPresent()) {
            throw new NotFoundException(String.format("Category with id: %d not found", id));
        }
        return category;
    }

    @PostMapping("/categories")
    public Category createCategory(@Valid @RequestBody Category category, HttpServletResponse response) {
        response.setStatus(HttpServletResponse.SC_CREATED);

        if (category.getParentCategoryId() == null) {
            return categoryService.create(category);
        }

        Optional<Category> parentCategory = categoryService.retrieve(category.getParentCategoryId());

        if (!parentCategory.isPresent()) {
            throw new BadRequestException(String.format("Parent category with id: %d not found", category.getParentCategoryId()));
        }

        return categoryService.create(category);
    }

    @DeleteMapping("/categories/{id}")
    public void deleteCategory(@PathVariable long id, HttpServletResponse response) {
        List<Category> childrenCategories = categoryService.retrieveAllByParentCategoryId(id);
        List<Product> products = productService.retrieveAllByCategoryId(id);
        if (childrenCategories.isEmpty() && products.isEmpty()) {
            categoryService.delete(id);
            response.setStatus(HttpServletResponse.SC_NO_CONTENT);
        } else if(!products.isEmpty()) {
            throw new BadRequestException("Category could not be deleted since it still has products. Please delete all its products first.");
        } else  {
            throw new BadRequestException("Category could not be deleted since it still has products. Please delete all its products first.");
        }
    }

    @GetMapping("/categories/{categoryId}/products")
    public Page<Product> retrieveAllProducts(@PathVariable long categoryId, @PageableDefault(value=10, page=0) Pageable pageable) {
        Optional<Category> optionalCategory = categoryService.retrieve(categoryId);
        if (!optionalCategory.isPresent()) {
            throw new NotFoundException(String.format("Category not found: %d", categoryId));
        }

        return productService.retrieveAllByCategoryId(categoryId, pageable);
    }

    private Product checkForCategoryProductAndReturnProduct(long categoryId, long productId) {
        Optional<Category> optionalCategory = categoryService.retrieve(categoryId);
        if (!optionalCategory.isPresent()) {
            throw new NotFoundException(String.format("Category not found: %d", categoryId));
        }

        Optional<Product> optionalProduct = productService.retrieve(productId);
        if (!optionalProduct.isPresent()) {
            throw new NotFoundException(String.format("Product not found: %d", productId));
        }

        return optionalProduct.get();
    }

    @PatchMapping("/categories/{categoryId}/products/{productId}")
    public Product updateProduct(@PathVariable long categoryId, @PathVariable long productId, @RequestBody Product newProduct) {
        Product product = checkForCategoryProductAndReturnProduct(categoryId, productId);
        product.setName(newProduct.getName());
        product.setDescription(newProduct.getDescription());
        product.setCurrency(newProduct.getCurrency());
        product.setPrice(newProduct.getPrice());
        return productService.update(product);
    }

    @DeleteMapping("/categories/{categoryId}/products/{productId}")
    public void deleteProduct(@PathVariable long categoryId, @PathVariable long productId, @RequestBody Product product, HttpServletResponse response) {
        checkForCategoryProductAndReturnProduct(categoryId, productId);

        response.setStatus(HttpServletResponse.SC_NO_CONTENT);
        productService.delete(productId);
    }

    @PostMapping("/categories/{id}/products")
    public Product createProduct(@PathVariable long id, @Valid @RequestBody  Product product) {
        Optional<Category> optionalCategory = categoryService.retrieve(id);
        if (!optionalCategory.isPresent()) {
            throw new NotFoundException(String.format("Category not found: %d", id));
        }

        product.setCategory(optionalCategory.get());
        return productService.create(product);
    }
}
