package com.herysson.menubackend.dto;

import lombok.Data;

@Data
public class ItemCompraDTO {
    private Long produtoId;
    private Integer quantidade;
    private Double precoUnitario;
}
