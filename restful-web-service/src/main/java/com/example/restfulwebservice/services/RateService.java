package com.example.restfulwebservice.services;

import com.example.restfulwebservice.models.Rate;
import com.example.restfulwebservice.repositories.RateRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Optional;

@Service
public class RateService {
    @Autowired
    RateRepository rateRepository;

    public Optional<Rate> retrieve(String date) {
        return rateRepository.findById(date);
    }

    public Rate create() throws IOException {
        URL url = new URL("http://data.fixer.io/api/latest?access_key=feaf7a765fa1194aa58837194d1363fa");
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setRequestMethod("GET");
        int status = connection.getResponseCode();
        BufferedReader in = new BufferedReader(
                new InputStreamReader(connection.getInputStream()));
        String inputLine;
        StringBuffer jsonContent = new StringBuffer();
        while ((inputLine = in.readLine()) != null) {
            jsonContent.append(inputLine);
        }
        in.close();
        Reader streamReader = null;

        if (status > 299) {
            streamReader = new InputStreamReader(connection.getErrorStream());
        } else {
            streamReader = new InputStreamReader(connection.getInputStream());
        }
        connection.disconnect();

        ObjectMapper mapper = new ObjectMapper();
        JsonNode rootNode = mapper.readTree(jsonContent.toString());
        JsonNode dateNode = rootNode.get("date");
        JsonNode ratesJson = rootNode.get("rates");
        JsonNode chfNode = ratesJson.get("CHF");
        JsonNode gbpNode = ratesJson.get("GBP");
        JsonNode usdNode = ratesJson.get("USD");
        JsonNode inrNode = ratesJson.get("INR");
        JsonNode cnyNode = ratesJson.get("CNY");
        Rate rate = new Rate();

        rate.setDate(mapper.treeToValue(dateNode, String.class));
        rate.setChf(mapper.treeToValue(chfNode, Double.class));
        rate.setGbp(mapper.treeToValue(chfNode, Double.class));
        rate.setUsd(mapper.treeToValue(chfNode, Double.class));
        rate.setInr(mapper.treeToValue(inrNode, Double.class));
        rate.setCny(mapper.treeToValue(cnyNode, Double.class));
        return rateRepository.save(rate);
    }
}
