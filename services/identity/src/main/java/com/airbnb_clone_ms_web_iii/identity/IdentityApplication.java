package com.airbnb_clone_ms_web_iii.identity;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class IdentityApplication {

	@Value("${spring.datasource.url}")
	private String dbUrl;

	public static void main(String[] args) {
		SpringApplication.run(IdentityApplication.class, args);
	}

}
