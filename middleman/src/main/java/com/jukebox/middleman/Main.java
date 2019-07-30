package com.jukebox.middleman;

// spring
import org.springframework.boot.SpringApplication;

public class Main {
    public static void main(String[] args){
        Class<?>[] entries = { Websocket.class };
        SpringApplication.run(entries, args);
    }
}