package com.example.restfulwebservice;

import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.request.GetRequest;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = WebEnvironment.DEFINED_PORT)
public class APITest {
	@Test
	public void contextLoads() {
	}

	protected GetRequest getRequest(String endpoint) {
		return Unirest.get(String.format("http://localhost:8080%s", endpoint));
	}

}
