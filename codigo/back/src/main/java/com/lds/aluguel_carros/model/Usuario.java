package com.lds.aluguel_carros.model;

import com.lds.aluguel_carros.enums.ETipoUsuario;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.Table;
import org.springframework.security.crypto.password.PasswordEncoder;

@Entity
@Table(name = "usuarios")
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class Usuario {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	protected Long id;

	@Column(nullable = false, unique = true, length = 50)
	protected String login;

	@Column(nullable = false, length = 128)
	private String senha;

	@Column(name = "tipo_usuario", nullable = false)
	@Enumerated(EnumType.STRING)
	private ETipoUsuario tipoUsuario;

	protected Usuario() {}

	protected Usuario(String login, String senha, ETipoUsuario tipoUsuario) {
		this.login = login;
		this.senha = senha;
		this.tipoUsuario = tipoUsuario;
	}

	public Long getId() {
		return id;
	}

	public void setSenha(String senha) {
		this.senha = senha;
	}

    public boolean isSenhaCorreta(String senhaEnviada, PasswordEncoder passwordEncoder) {
        return passwordEncoder.matches(senhaEnviada, this.senha);
    }
}
