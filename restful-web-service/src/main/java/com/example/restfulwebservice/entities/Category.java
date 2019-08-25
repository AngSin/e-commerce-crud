package com.example.restfulwebservice.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;

@ApiModel("Category")
@Entity
@Getter
@Setter
public class Category {
    @Id
    @GeneratedValue
    private Long id;

    @NotNull(message = "name must not be null")
    @ApiModelProperty(notes = "name can not be null")
    private String name;

    @Nullable
    @Column(name = "parentCategoryId")
    private Long parentCategoryId;

    private String description;

    @OneToMany(mappedBy = "category")
    @JsonIgnore
    private List<Product> products;

    public Long getId() {
        return id;
    }
}
