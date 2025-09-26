package com.lds.aluguel_carros.enums;

public enum EStatusAluguel {
    EM_ANALISE("Em análise"),
    APROVADO("Aprovado"),
    REJEITADO("Rejeitado"),
    CANCELADO("Cancelado");

    private String descricao;

    EStatusAluguel(String descricao) {
        this.descricao = descricao;
    }

    public String getDescricao() {
        return descricao;
    }
}
