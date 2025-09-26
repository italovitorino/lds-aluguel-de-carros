package com.lds.aluguel_carros.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.method.P;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lds.aluguel_carros.dto.cliente.AutomovelCreateRequestDTO;
import com.lds.aluguel_carros.dto.cliente.AutomovelResponseDTO;
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
    public ResponseEntity<AutomovelResponseDTO> buscarPeloId(@PathVariable Long id) {
        AutomovelResponseDTO response = service.buscar(id);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping
    public ResponseEntity<List<AutomovelResponseDTO>> buscarTodos() {
        List<AutomovelResponseDTO> response = service.buscarTodos();
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> atualizar(@PathVariable Long id, @RequestBody AutomovelCreateRequestDTO dto) {
        service.atualizar(id, dto);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        service.deletar(id);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PutMapping("/{id}/finalizar")
    public ResponseEntity<AutomovelResponseDTO> finalizarAluguel(@PathVariable Long id) {
        AutomovelResponseDTO response = service.finalizarAluguel(id);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PutMapping("/{id}/iniciar")
    public ResponseEntity<AutomovelResponseDTO> iniciarAluguel(@PathVariable Long id) {
        AutomovelResponseDTO response = service.iniciarAluguel(id);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

}
