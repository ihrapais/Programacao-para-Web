package com.ihrapais.vendasapi.repository;

import com.ihrapais.vendasapi.entity.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {}