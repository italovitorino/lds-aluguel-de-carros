package com.lds.aluguel_carros.model;

import com.lds.aluguel_carros.dto.pedido_aluguel.PedidoAluguelDTO;
import com.lds.aluguel_carros.enums.EStatusAluguel;
import com.lds.aluguel_carros.model.base.Dto;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "pedidos")
public class PedidoAluguel implements Dto<PedidoAluguelDTO> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private Cliente cliente;

    @ManyToOne(fetch = FetchType.LAZY)
    private Automovel automovel;

    @Column(nullable = false)
    private LocalDateTime inicio;

    @Column(nullable = false)
    private LocalDateTime termino;

    @Column(name = "preco_total", nullable = false)
    private double precoTotal;

    @Column(nullable = false)
    private boolean credito;

    @Column(name = "realizado_em", nullable = false)
    private LocalDateTime realizadoEm = LocalDateTime.now();

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private EStatusAluguel status = EStatusAluguel.EM_ANALISE;

    public PedidoAluguel() {}

    public PedidoAluguel(Cliente cliente, Automovel automovel, LocalDateTime inicio, LocalDateTime termino, boolean credito) {
        this.cliente = cliente;
        this.automovel = automovel;
        this.inicio = inicio;
        this.termino = termino;
        this.precoTotal = automovel.calcularAluguel(inicio, termino);
        this.credito = credito;

        automovel.reservar();
    }

    public void cancelar() {
        if (status != EStatusAluguel.EM_ANALISE){
            throw new RuntimeException("O pedido não pode ser cancelado.");
        }

        status = EStatusAluguel.CANCELADO;
        automovel.finalizarAluguel();
    }

    @Override
    public PedidoAluguelDTO toDto() {
        return new PedidoAluguelDTO(id, cliente.toDto(), automovel.toDto(), inicio, termino, precoTotal, credito, realizadoEm, status.getDescricao());
    }
}
