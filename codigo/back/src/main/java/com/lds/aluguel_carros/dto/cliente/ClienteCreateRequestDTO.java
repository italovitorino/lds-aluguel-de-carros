package com.lds.aluguel_carros.dto.cliente;

import org.hibernate.validator.constraints.br.CPF;

import jakarta.validation.constraints.NotBlank;

public record ClienteCreateRequestDTO(

    @NotBlank(message = "O login é obrigatório")
    String login,

    @NotBlank(message = "A senha é obrigatória")
    String senha,

    @NotBlank(message = "O nome é obrigatório")
    String nome,

    @NotBlank(message = "O endereço é obrigatório")
    String endereco,

    @NotBlank(message = "O RG é obrigatório")
    String rg,

    @NotBlank(message = "O CPF é obrigatório")
    @CPF(message = "O CPF informado é inválido")
    String cpf

) {}
