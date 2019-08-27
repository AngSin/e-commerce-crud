package com.example.restfulwebservice.controllers;

import com.example.restfulwebservice.APITest;
import com.example.restfulwebservice.models.Category;
import com.example.restfulwebservice.services.CategoryService;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.exceptions.UnirestException;
import static org.junit.Assert.assertEquals;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;


public class CategoryProductControllerTest extends APITest {
    @Autowired
    CategoryService categoryService;

    private Category rootCategory;

//    @Before
//    public void setup() {
//        rootCategory = categoryService.create(
//            new Category("Root category", null, "Root category")
//        );
//    }

//    private Category seedAndReturnCategory(String name, Long parentCategoryId, String description) {
//        return categoryService.create(
//            new Category()
//        );
//    }

    @Test
    public void shouldGetListOfCategories() throws UnirestException {
//        long id2 = seedAndReturnCategory("Category 2", rootCategory.getId(), "").getId();
//        long id3 = seedAndReturnCategory("Category 2", rootCategory.getId(), "").getId();

        HttpResponse<JsonNode> jsonResponse = getRequest("/categories").asJson();
        System.out.println(jsonResponse.toString());
//        assertEquals(HttpStatus.OK.value(), jsonResponse.getStatus());
    }
}
