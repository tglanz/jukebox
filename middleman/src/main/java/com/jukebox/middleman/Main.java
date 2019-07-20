package com.jukebox.middleman;

// spring
import org.springframework.boot.SpringApplication;
import org.springframework.context.annotation.Bean;

// kurento
import org.kurento.client.KurentoClient;

public class Main {

    @Bean
    public KurentoClient kurentoClient() {
        return KurentoClient.create(System.getProperty(
            "kms.url",
            "ws://localhost:8888/kurento"
        ));
    }
    
    public static void main(String[] args){
        Class<?>[] entries = { Websocket.class };
        SpringApplication.run(entries, args);
    }
}