package com.example.restfulwebservice.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.HashMap;

@Entity
@Getter
@Setter
public class Rate {
    @Id
    String date;

    final Double EUR = 1.00;
    Double chf;
    Double gbp;
    Double usd;
    Double inr;
    Double cny;

    public Double getCurrencyRate(String currency) {
        HashMap<String, Double> currencyRateMap= new HashMap<String, Double>();
        currencyRateMap.put("EUR", this.EUR);
        currencyRateMap.put("CHF", this.chf);
        currencyRateMap.put("GBP", this.gbp);
        currencyRateMap.put("USD", this.usd);
        currencyRateMap.put("INR", this.inr);
        currencyRateMap.put("CNY", this.cny);
        return currencyRateMap.get(currency);
    }
}
