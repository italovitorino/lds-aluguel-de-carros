package com.lds.aluguel_carros.repository;

import com.lds.aluguel_carros.model.PedidoAluguel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PedidoAluguelRepository extends JpaRepository<PedidoAluguel, Long> {

    @Query(value = """
        SELECT * FROM pedidos
        WHERE cliente_id = :idCliente
    """, nativeQuery = true)
    List<PedidoAluguel> buscarTodosPorCliente(@Param("idCliente") Long idCliente);
}
