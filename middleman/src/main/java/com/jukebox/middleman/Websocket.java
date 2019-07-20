package com.jukebox.middleman;

import com.jukebox.middleman.handlers.AudioPlayerHandler;

// spring
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@SpringBootApplication
@EnableWebSocket
public class Websocket implements WebSocketConfigurer {

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry){
        // Names should change once domains kicks in
        registry.addHandler(new AudioPlayerHandler(), "/audio");
    }

}