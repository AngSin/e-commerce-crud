package com.example.restfulwebservice.entities;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModel;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@ApiModel("Product")
@Entity
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
    private Float price;

    private enum Currency {
        EUR,
        INR,
        USD,
        JPY,
    }

    @NotNull
    @Enumerated(EnumType.STRING)
    private Currency currency;

    @NotNull
    private Float priceInEuros;

    public void setId(Long id) {
        this.id = id;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public void setPrice(Float price) {
        this.price = price;
    }

    public void setCurrency(Currency currency) {
        this.currency = currency;
    }

    public void setPriceInEuros(Float priceInEuros) {
        this.priceInEuros = priceInEuros;
    }

    public Long getId() {
        return id;
    }

    public String getDescription() {
        return description;
    }

    public String getName() {
        return name;
    }

    public long getCategory() {
        return category.getId();
    }

    public Float getPrice() {
        return price;
    }

    public Currency getCurrency() {
        return currency;
    }

    public Float getPriceInEuros() {
        return priceInEuros;
    }

    @Override
    public String toString() {
        return "Product{" +
                "id=" + id +
                ", description='" + description + '\'' +
                ", name='" + name + '\'' +
                ", categoryId=" + category.getId() +
                ", price=" + price +
                ", currency=" + currency +
                ", priceInEuros=" + priceInEuros +
                '}';
    }
}
