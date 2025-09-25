package com.lds.aluguel_carros.dto.cliente;

public record AutomovelResponseDTO (
    Long id,
    String matricula,
    int ano,
    String modelo,
    String placa,
    double valorDiaria,
    String status)
{}
