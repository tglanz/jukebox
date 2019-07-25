package com.jukebox.middleman;

import com.jukebox.middleman.handlers.AudioPlayerHandler;

// spring
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;

import org.kurento.client.KurentoClient;

@SpringBootApplication
@EnableWebSocket
public class Websocket implements WebSocketConfigurer {

    @Bean
    public KurentoClient kurentoClient() {
        return KurentoClient.create(System.getProperty(
            "kms.url",
            "ws://localhost:8888/kurento"
        ));
    }

    @Bean
    public WebSocketHandler audioPlayerHandler(){
        return new AudioPlayerHandler();
    }

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry){
        // Names should change once domains kicks in
        registry.addHandler(audioPlayerHandler(), "/audio").setAllowedOrigins("*").withSockJS();
    }

}