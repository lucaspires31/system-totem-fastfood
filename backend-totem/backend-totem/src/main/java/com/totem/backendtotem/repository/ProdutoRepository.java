package com.totem.backendtotem.repository;

import com.totem.backendtotem.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {
}