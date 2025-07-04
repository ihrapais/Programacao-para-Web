package com.herysson.menubackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.herysson.menubackend.repository")
public class MenuBackEndApplication {

    public static void main(String[] args) {
        SpringApplication.run(MenuBackEndApplication.class, args);
/* 
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String rawPassword = "admin123";
        String encodedPassword = encoder.encode(rawPassword);
        System.out.println("Generated Password Hash: " + encodedPassword);
        */
    }

}