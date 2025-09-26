package com.lds.aluguel_carros.dto.pedido_aluguel;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public record PedidoAluguelCreateDTO(

        @NotNull(message = "O id do cliente é obrigatório.")
        Long idCliente,

        @NotNull(message = "O id do automóvel é obrigatório.")
        Long idAutomovel,

        @NotNull(message = "A data de início é obrigatória.")
        LocalDateTime inicio,

        @NotNull(message = "A data de término é obrigatória.")
        LocalDateTime termino,

        @NotNull(message = "O uso de crédito deve ser informado.")
        boolean credito
) {
}
