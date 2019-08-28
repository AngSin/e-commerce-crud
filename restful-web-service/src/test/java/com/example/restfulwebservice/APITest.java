package com.example.restfulwebservice;

import com.example.restfulwebservice.repositories.CategoryRepository;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.request.GetRequest;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MockMvcBuilder;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.Collections;

@RunWith(SpringRunner.class)
@WebMvcTest
//@SpringBootTest(webEnvironment = WebEnvironment.DEFINED_PORT)
public class APITest {
	@Autowired
	MockMvc mockMvc;

	@MockBean
	CategoryRepository categoryRepository;

	@Test
	public void contextLoads() throws Exception {
		Mockito.when(categoryRepository.findAll()).thenReturn(
			Collections.emptyList()
		);

		MvcResult mvcResult = mockMvc.perform(
			MockMvcRequestBuilders.get("/categories")
				.accept(MediaType.APPLICATION_JSON)
		).andReturn();

		System.out.println(mvcResult.getResponse());

		Mockito.verify(categoryRepository).findAll();
	}

	protected GetRequest getRequest(String endpoint) {
		return Unirest.get(String.format("http://localhost:8080%s", endpoint));
	}

}
