package com.lds.aluguel_carros.dto.cliente;

import jakarta.validation.constraints.NotBlank;

public record ClienteUpdateRequestDTO(

	@NotBlank(message = "A senha é obrigatória")
	String senha,

	@NotBlank(message = "O nome é obrigatório")
	String nome,

	@NotBlank(message = "O endereço é obrigatório")
	String endereco
) {}
