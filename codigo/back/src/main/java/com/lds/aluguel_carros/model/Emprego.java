package com.lds.aluguel_carros.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "empregos")
public class Emprego {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false, length = 14)
	private String cnpj;

	@Column(nullable = false)
	private double rendimento;

	@ManyToOne(optional = false)
    @JoinColumn(name = "cliente_id", nullable = false)
	Cliente cliente;

	public double rendimento() {
		return rendimento;
	}
}
