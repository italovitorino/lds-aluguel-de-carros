package com.lds.aluguel_carros.dto.cliente;

public record AutomovelUpdateRequestDTO(
    String matricula,
    int ano,
    String modelo,
    String placa,
    double valorDiaria,
    String status
) {} 
    

