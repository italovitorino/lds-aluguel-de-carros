package com.lds.aluguel_carros.service;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.AutoConfigureOrder;
import org.springframework.cglib.core.Local;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.lds.aluguel_carros.dto.cliente.AutomovelCreateRequestDTO;
import com.lds.aluguel_carros.dto.cliente.AutomovelResponseDTO;
import com.lds.aluguel_carros.model.Automovel;
import com.lds.aluguel_carros.repository.AutomovelRepository;

@Service
public class AutomovelService {
    

    @Autowired
    private AutomovelRepository repository;

    @Transactional
    public void criar(AutomovelCreateRequestDTO dto) {
        Automovel automovel = new Automovel(
            dto.matricula(), 
            dto.ano(), 
            dto.modelo(), 
            dto.placa(), 
            dto.valorDiaria());

        repository.save(automovel);

    }

    private Automovel buscarEntidade(Long id) {
        return repository.findById(id).orElseThrow(() -> new RuntimeException("Automóvel com id " + id + " não encontrado"));
    }

    public AutomovelResponseDTO buscar(Long id) {
        Automovel auto = buscarEntidade(id);        
        return auto.toDto();
    }

    public java.util.List<AutomovelResponseDTO> buscarTodos() {
        java.util.List<Automovel> automoveis = repository.findAll();
        return automoveis.stream().map(Automovel::toDto).toList();
    }

    @Transactional
    public void atualizar(Long id, AutomovelCreateRequestDTO dto) {
        Automovel auto = buscarEntidade(id);
        
        auto.setMatricula(dto.matricula());
        auto.setAno(dto.ano());
        auto.setModelo(dto.modelo());
        auto.setPlaca(dto.placa());
        auto.setValorDiaria(dto.valorDiaria());

        repository.save(auto);
    }

    @Transactional
    public void deletar(Long id) {
        Automovel auto = buscarEntidade(id);
        repository.delete(auto);
    }

    public double calcularValorAluguel(Long id, LocalDateTime inicio, LocalDateTime termino) {
        Automovel auto = buscarEntidade(id);
        return auto.calcularAluguel(inicio, termino);
    }

    @Transactional
    public AutomovelResponseDTO finalizarAluguel(Long id) {
        Automovel auto = buscarEntidade(id);
        auto.finalizarAluguel();
        auto = repository.save(auto);
        return auto.toDto();
    }

    @Transactional
    public AutomovelResponseDTO iniciarAluguel(Long id) {
        Automovel auto = buscarEntidade(id);
        auto.iniciarAluguel();
        auto = repository.save(auto);
        return auto.toDto();
    }

}
