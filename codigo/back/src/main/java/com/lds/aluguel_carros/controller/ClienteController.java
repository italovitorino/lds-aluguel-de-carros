package com.lds.aluguel_carros.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lds.aluguel_carros.dto.cliente.ClienteCreateRequestDTO;
import com.lds.aluguel_carros.service.ClienteService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/clientes")
public class ClienteController {

	@Autowired
	private ClienteService service;

	@PostMapping
	public ResponseEntity<Void> criar(@RequestBody @Valid ClienteCreateRequestDTO dto) {
		service.criar(dto);
		return ResponseEntity.status(HttpStatus.CREATED).build();
	}
}
