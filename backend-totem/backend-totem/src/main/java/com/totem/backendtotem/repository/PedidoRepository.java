package com.totem.backendtotem.repository;

import com.totem.backendtotem.model.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {
}