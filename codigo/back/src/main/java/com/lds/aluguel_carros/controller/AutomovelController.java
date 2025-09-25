package com.lds.aluguel_carros.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lds.aluguel_carros.dto.cliente.AutomovelCreateRequestDTO;
import com.lds.aluguel_carros.dto.cliente.AutomovelResponseDTO;
import com.lds.aluguel_carros.dto.cliente.ClienteResponseDTO;
import com.lds.aluguel_carros.service.AutomovelService;

@RestController
@RequestMapping("/api/automoveis")
public class AutomovelController {
    
    @Autowired
    private AutomovelService service;

    @PostMapping
    public ResponseEntity<Void> criar(@RequestBody AutomovelCreateRequestDTO dto) {
        service.criar(dto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<List<AutomovelResponseDTO>> buscarPeloId(@PathVariable Long id) {
        List<AutomovelResponseDTO> response = service.buscar(id);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping
    public ResponseEntity<Void> buscarTodos() {
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
