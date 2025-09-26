package com.lds.aluguel_carros.model;

import java.time.LocalDateTime;

import com.lds.aluguel_carros.dto.cliente.AutomovelResponseDTO;
import com.lds.aluguel_carros.enums.EStatusAutomovel;
import com.lds.aluguel_carros.model.base.Base;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "automoveis")
public class Automovel implements Base {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, unique = true)
    private Long id;
    
    @Column(nullable = false, length = 50)
    private String matricula;

    @Column(nullable = false, length = 4)
    private int ano; // xxxx

    @Column(nullable = false, length = 50)
    private String modelo;

    @Column(nullable = false, length = 7)
    private String placa; // XXX-0000

    @Column(nullable = false)
    private double valorDiaria;

    @Column(nullable = false)
    private EStatusAutomovel status;

    public Automovel() {
        super();
    }

    public Automovel(String matricula, int ano, String modelo, String placa, double valorDiaria) {
        this.matricula = matricula;
        this.ano = ano;
        this.modelo = modelo;
        this.placa = placa;
        this.valorDiaria = valorDiaria;
        this.status = EStatusAutomovel.DISPONIVEL;
    }

    public void finalizarAluguel() {
        this.status = EStatusAutomovel.DISPONIVEL;
    }

    public void iniciarAluguel() {
        this.status = EStatusAutomovel.ALUGADO;
    }

    public double calcularAluguel(LocalDateTime inicio, LocalDateTime termino){
        long dias = java.time.Duration.between(inicio, termino).toDays();
        return dias * this.valorDiaria;
    }

    public String getMatricula() {
        return matricula;
    }

    public void setMatricula(String matricula) {
        this.matricula = matricula;
    }

    public int getAno() {
        return ano;
    }

    public void setAno(int ano) {
        this.ano = ano;
    }

    public String getModelo() {
        return modelo;
    }

    public void setModelo(String modelo) {
        this.modelo = modelo;
    }

    public String getPlaca() {
        return placa;
    }

    public void setPlaca(String placa) {
        this.placa = placa;
    }

    public double getValorDiaria() {
        return valorDiaria;
    }

    public void setValorDiaria(double valorDiaria) {
        this.valorDiaria = valorDiaria;
    }

    public EStatusAutomovel getStatus() {
        return status;
    }

    public void setStatus(EStatusAutomovel status) {
        this.status = status;
    }

    @Override
    public AutomovelResponseDTO toDto() {
        String status = this.status == null ? EStatusAutomovel.DISPONIVEL.name() : this.status.name();
        return new AutomovelResponseDTO(
            id,
            matricula,
            ano,
            modelo,
            placa,
            valorDiaria,
            status
        );
    }
}
