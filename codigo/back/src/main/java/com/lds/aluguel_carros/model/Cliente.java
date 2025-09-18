package com.lds.aluguel_carros.model;

import java.util.LinkedList;
import java.util.List;

import com.lds.aluguel_carros.enums.ETipoUsuario;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "clientes")
public class Cliente extends Usuario {
	
	private static final int MAX_EMPREGOS = 3;

	@Column(nullable = false, length = 100)
	private String nome;

	@Column(nullable = false, length = 300)
	private String endereco;

	@Column(nullable = false, length = 14)
	private String rg;

	@Column(nullable = false, unique = true, length = 11)
	private String cpf;

	@OneToMany(mappedBy = "cliente", cascade = CascadeType.ALL)
	private List<Emprego> empregos = new LinkedList<>();

	public Cliente() {
		super();
	}

	public Cliente(String login, String senha, String nome, String endereco, String rg, String cpf) {
		super(login, senha, ETipoUsuario.CLIENTE);
		this.nome = nome;
		this.endereco = endereco;
		this.rg = rg;
		this.cpf = cpf;
	}

	public void registrarEmprego(Emprego emprego) {
		if (empregos.size() >= MAX_EMPREGOS)
			throw new IllegalStateException("O cliente já possui o número máximo de empregos permitidos (" + MAX_EMPREGOS + ")");

		empregos.add(emprego);
	}

	public double rendimentos() {
		return empregos.stream().mapToDouble(x -> x.rendimento()).sum();
	}
}
