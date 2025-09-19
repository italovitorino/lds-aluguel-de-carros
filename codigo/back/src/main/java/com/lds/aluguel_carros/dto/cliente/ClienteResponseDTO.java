package com.lds.aluguel_carros.dto.cliente;

public record ClienteResponseDTO(
	Long id,
	String nome,
	String endereco,
	String rg,
	String cpf
) {}
