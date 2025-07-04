package com.herysson.menubackend.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class ItemCompra {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "produto_id")
    private Produto produto;

    private Integer quantidade;
    private Double precoUnitario;

    @ManyToOne
    @JoinColumn(name = "compra_id")
    private Compra compra;
}
