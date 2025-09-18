package com.lds.aluguel_carros.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.lds.aluguel_carros.dto.cliente.ClienteCreateRequestDTO;
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
}
