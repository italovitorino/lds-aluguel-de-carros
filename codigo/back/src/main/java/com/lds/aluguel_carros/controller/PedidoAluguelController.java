package com.lds.aluguel_carros.controller;

import com.lds.aluguel_carros.dto.pedido_aluguel.PedidoAluguelCreateDTO;
import com.lds.aluguel_carros.dto.pedido_aluguel.PedidoAluguelDTO;
import com.lds.aluguel_carros.service.PedidoAluguelService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pedidos")
public class PedidoAluguelController {

    private PedidoAluguelService service;

    public PedidoAluguelController(PedidoAluguelService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Void> criar(@RequestBody @Valid PedidoAluguelCreateDTO dto) {
        service.criar(dto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<PedidoAluguelDTO> buscarPorId(@PathVariable Long id) {
        PedidoAluguelDTO response = service.buscarPorId(id);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping
    public ResponseEntity<List<PedidoAluguelDTO>> buscarTodos() {
        List<PedidoAluguelDTO> response = service.buscarTodos();
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/cliente/{id}")
    public ResponseEntity<List<PedidoAluguelDTO>> buscarTodosPorCliente(@PathVariable Long id) {
        List<PedidoAluguelDTO> response = service.buscarTodosPorCliente(id);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PutMapping("/cancelar/{id}")
    public ResponseEntity<Void> cancelar(@PathVariable Long id) {
        service.cancelar(id);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
