package com.lds.aluguel_carros.service;

import com.lds.aluguel_carros.dto.pedido_aluguel.PedidoAluguelCreateDTO;
import com.lds.aluguel_carros.dto.pedido_aluguel.PedidoAluguelDTO;
import com.lds.aluguel_carros.model.Automovel;
import com.lds.aluguel_carros.model.Cliente;
import com.lds.aluguel_carros.model.PedidoAluguel;
import com.lds.aluguel_carros.repository.AutomovelRepository;
import com.lds.aluguel_carros.repository.ClienteRepository;
import com.lds.aluguel_carros.repository.PedidoAluguelRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class PedidoAluguelService {

    private PedidoAluguelRepository repository;

    private ClienteRepository clienteRepository;
    private AutomovelRepository automovelRepository;

    public PedidoAluguelService(PedidoAluguelRepository repository, ClienteRepository clienteRepository, AutomovelRepository automovelRepository) {
        this.repository = repository;
        this.clienteRepository = clienteRepository;
        this.automovelRepository = automovelRepository;
    }

    @Transactional
    public void criar(PedidoAluguelCreateDTO dto) {
        Cliente cliente = clienteRepository.findById(dto.idCliente()).orElseThrow(() -> new RuntimeException("Cliente com não encontrado."));
        Automovel automovel = automovelRepository.findById(dto.idAutomovel()).orElseThrow(() -> new RuntimeException("Automóvel não encontrado."));

        PedidoAluguel pedidoAluguel = new PedidoAluguel(cliente, automovel, dto.inicio(), dto.termino(), dto.credito());
        repository.save(pedidoAluguel);
    }

    public PedidoAluguelDTO buscarPorId(Long id) {
        PedidoAluguel pedidoAluguel = repository.findById(id).orElseThrow(() -> new RuntimeException("Pedido de aluguel não encontrado."));
        return pedidoAluguel.toDto();
    }

    public List<PedidoAluguelDTO> buscarTodos() {
        List<PedidoAluguel> pedidosAlugueis = repository.findAll();
        return pedidosAlugueis.stream().map(PedidoAluguel::toDto).toList();
    }

    public List<PedidoAluguelDTO> buscarTodosPorCliente(Long idCliente) {
        List<PedidoAluguel> pedidosAlugueis = repository.buscarTodosPorCliente(idCliente);
        return  pedidosAlugueis.stream().map(PedidoAluguel::toDto).toList();
    }

    public void cancelar(Long id) {
        PedidoAluguel pedidoAluguel = repository.findById(id).orElseThrow(() -> new RuntimeException("Pedido de aluguel não encontrado."));
        pedidoAluguel.cancelar();
        repository.save(pedidoAluguel);
    }
}
