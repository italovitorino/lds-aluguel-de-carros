package com.lds.aluguel_carros.dto.pedido_aluguel;

import com.lds.aluguel_carros.dto.automovel.AutomovelResponseDTO;
import com.lds.aluguel_carros.dto.cliente.ClienteResponseDTO;

import java.time.LocalDateTime;

public record PedidoAluguelDTO(
        Long id,
        ClienteResponseDTO cliente,
        AutomovelResponseDTO automovel,
        LocalDateTime inicio,
        LocalDateTime termino,
        double precoTotal,
        boolean credito,
        LocalDateTime realizadoEm,
        String status
) {
}
