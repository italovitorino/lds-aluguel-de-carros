package com.lds.aluguel_carros.service;

import jakarta.servlet.http.HttpServletRequest;
import com.lds.aluguel_carros.dto.LoginDTO;
import com.lds.aluguel_carros.model.Usuario;
import com.lds.aluguel_carros.repository.UsuarioRepository;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class LoginService {

    private UsuarioRepository repository;
    private BCryptPasswordEncoder passwordEncoder;

    public LoginService(UsuarioRepository repository, BCryptPasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
    }

    public Long login(LoginDTO dto, HttpServletRequest request, HttpServletResponse response) {
        Usuario usuario = repository.findByLogin(dto.login());

        if (usuario == null || !usuario.isSenhaCorreta(dto.senha(), passwordEncoder)) {
            throw new RuntimeException("Usuário ou senha incorretos.");
        }

        return usuario.getId();
    }
}
