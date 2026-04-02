package com.totem.backendtotem.dto;

import java.util.List;

public class PedidoRequest {

    private String cpf;
    private List<ItemPedidoRequest> itens;

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public List<ItemPedidoRequest> getItens() {
        return itens;
    }

    public void setItens(List<ItemPedidoRequest> itens) {
        this.itens = itens;
    }
}