package com.lds.aluguel_carros.controller;

import com.lds.aluguel_carros.dto.LoginDTO;
import com.lds.aluguel_carros.service.LoginService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/login")
public class LoginController {

    private LoginService service;

    public LoginController(LoginService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Void> login(@RequestBody LoginDTO dto, HttpServletRequest request, HttpServletResponse response) {
        service.login(dto, request, response);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
