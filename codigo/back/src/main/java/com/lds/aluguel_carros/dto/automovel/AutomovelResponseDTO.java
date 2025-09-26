package com.lds.aluguel_carros.dto.automovel;

public record AutomovelResponseDTO (
    Long id,
    String matricula,
    int ano,
    String modelo,
    String placa,
    double valorDiaria,
    String status)
{}
