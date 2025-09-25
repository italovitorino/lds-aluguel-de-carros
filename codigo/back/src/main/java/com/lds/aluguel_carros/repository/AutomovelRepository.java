package com.lds.aluguel_carros.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.lds.aluguel_carros.model.Automovel;

@Repository
public interface AutomovelRepository extends JpaRepository<Automovel, Long> {
    
}
