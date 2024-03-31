package com.stocktrade.application;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class StockTradeApplication {

	public static void main(String[] args) {
		SpringApplication.run(StockTradeApplication.class, args);
		System.out.println("APPLICATION STARTED...");
	}

}
