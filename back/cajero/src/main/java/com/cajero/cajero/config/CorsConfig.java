package com.cajero.cajero.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(@org.springframework.lang.NonNull CorsRegistry registry) {
                registry.addMapping("/**") // se aplica en todas las rutas
                        .allowedOrigins("http://localhost:5173") // permitir el acseso a react
                        .allowedMethods("GET", "POST", "PUT", "DELETE") // metodos permitidos
                        .allowedHeaders("*");//permite headers como tokens y cookies
            }
        };
    }
}
