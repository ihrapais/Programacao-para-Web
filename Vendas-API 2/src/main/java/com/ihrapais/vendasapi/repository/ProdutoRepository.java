package com.ihrapais.vendasapi.repository;

import com.ihrapais.vendasapi.entity.Produto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {


    List<Produto> findByQuantityLessThan(Integer quantity);
    List<Produto> findByNameContainingIgnoreCase(String keyword);
}
