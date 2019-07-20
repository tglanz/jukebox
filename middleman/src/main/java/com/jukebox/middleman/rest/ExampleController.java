package com.jukebox.middleman.rest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("example")
class ExampleController {
    @RequestMapping("200")
    public ResponseEntity<String> ok(){
        return new ResponseEntity<>(
            "all good",
            HttpStatus.OK
        );
    }

    @RequestMapping("500")
    public ResponseEntity<String> notGood(){
        return new ResponseEntity<>(
            "not good",
            HttpStatus.INTERNAL_SERVER_ERROR
        );
    }
}