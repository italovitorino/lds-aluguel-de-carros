package com.lds.aluguel_carros.dto.cliente;

import jakarta.validation.constraints.NotBlank;

public record AutomovelCreateRequestDTO(

    @NotBlank(message = "A matrícula é obrigatória")
    String matricula,

    @NotBlank(message = "O ano é obrigatório")
    int ano, // xxxx

    @NotBlank(message = "O modelo é obrigatório")
    String modelo,

    @NotBlank(message = "A placa é obrigatória")
    String placa, // XXX-0000

    @NotBlank(message = "O valor da diária é obrigatório")
    double valorDiaria,

    @NotBlank(message = "O status é obrigatório")
    String status

) {}
