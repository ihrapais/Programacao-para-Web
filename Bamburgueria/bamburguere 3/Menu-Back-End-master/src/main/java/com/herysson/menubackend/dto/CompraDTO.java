package com.herysson.menubackend.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class CompraDTO {
    private Long id;
    private LocalDateTime dataCompra;
    private Double valorTotal;
    private List<ItemCompraDTO> itens;
}
