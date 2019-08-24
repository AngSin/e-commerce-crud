package com.example.restfulwebservice;

import com.google.common.base.Predicates;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class SwaggerConfig {
    private static final ApiInfo DEFAULT_API_INFO = null;

    @Bean
    public Docket api() {
        return new Docket(DocumentationType.SWAGGER_2)
                .select()//<4>
                .apis(RequestHandlerSelectors.any())//<5>
                .paths(Predicates.not(PathSelectors.regex("/error.*")))//<6>, regex must be in double quotes.
                .build();
    }
}
