package com.lds.aluguel_carros.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.lds.aluguel_carros.model.Cliente;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {

}