package com.lds.aluguel_carros.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lds.aluguel_carros.dto.cliente.ClienteCreateRequestDTO;
import com.lds.aluguel_carros.dto.cliente.ClienteResponseDTO;
import com.lds.aluguel_carros.dto.cliente.ClienteUpdateRequestDTO;
import com.lds.aluguel_carros.service.ClienteService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.GetMapping;

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

	@GetMapping
	public ResponseEntity<List<ClienteResponseDTO>> buscarTodos() {
		List<ClienteResponseDTO> response = service.buscarTodos();
		return ResponseEntity.status(HttpStatus.OK).body(response);	
	}

	@GetMapping("/{id}")
	public ResponseEntity<ClienteResponseDTO> buscarPeloId(@PathVariable Long id) {
		ClienteResponseDTO response = service.buscar(id);
		return ResponseEntity.status(HttpStatus.OK).body(response);
	}

	@PutMapping("/{id}")
	public ResponseEntity<Void> atualizar(@PathVariable Long id, @RequestBody @Valid ClienteUpdateRequestDTO dto) {
		service.atualizar(id, dto);
		return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> excluir(@PathVariable Long id) {
		service.excluir(id);
		return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
	}
}
