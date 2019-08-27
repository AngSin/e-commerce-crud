package com.example.restfulwebservice.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@ApiModel("Product")
@Entity
@JsonIgnoreProperties("category.children")
@Getter
@Setter
public class Product {
    @Id
    @GeneratedValue
    private Long id;

    private String description;

    @NotNull
    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonProperty("categoryId")
    private Category category;

    @NotNull
    private Double price;

    public static enum Currency {
        EUR,
        CHF,
        GBP,
        USD,
        INR,
        CNY;
    }

    @NotNull
    @Enumerated(EnumType.STRING)
    private Currency currency;

    @NotNull
    private Double priceInEuros;

    public Long getCategory() {
        return category.getId();
    }
}
