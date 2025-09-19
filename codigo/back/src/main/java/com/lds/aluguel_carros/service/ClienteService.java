package com.lds.aluguel_carros.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.lds.aluguel_carros.dto.cliente.ClienteCreateRequestDTO;
import com.lds.aluguel_carros.dto.cliente.ClienteResponseDTO;
import com.lds.aluguel_carros.dto.cliente.ClienteUpdateRequestDTO;
import com.lds.aluguel_carros.model.Cliente;
import com.lds.aluguel_carros.repository.ClienteRepository;

@Service
public class ClienteService {

	@Autowired
	private ClienteRepository repository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Transactional
	public void criar(ClienteCreateRequestDTO dto) {
		Cliente cliente = new Cliente(
			dto.login(), 
			passwordEncoder.encode(dto.senha()), 
			dto.nome(), 
			dto.endereco(), 
			dto.rg(), 
			dto.cpf()
		);

		repository.save(cliente);
	}

	private Cliente buscarEntidade(Long id) {
		return repository.findById(id).orElseThrow(() -> new RuntimeException("Cliente com id " + id + " não encontrado"));
	}

	public ClienteResponseDTO buscar(Long id) {
		Cliente cliente = buscarEntidade(id);
		return cliente.toDto();
	}

	public List<ClienteResponseDTO> buscarTodos() {
		List<Cliente> clientes = repository.findAll();
		return clientes.stream().map(x -> x.toDto()).toList();	
	}

	@Transactional
	public void atualizar(Long id, ClienteUpdateRequestDTO dto) {
		Cliente cliente = buscarEntidade(id);
		
		cliente.setSenha(passwordEncoder.encode(dto.senha()));
		cliente.setNome(dto.nome());
		cliente.setEndereco(dto.endereco());

		repository.save(cliente);
	}

	@Transactional
	public void excluir(Long id) {
		Cliente cliente = buscarEntidade(id);
		repository.delete(cliente);
	}
}
