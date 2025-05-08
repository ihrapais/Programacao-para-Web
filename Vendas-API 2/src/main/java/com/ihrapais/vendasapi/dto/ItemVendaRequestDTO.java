package com.ihrapais.vendasapi.dto;

public record ItemVendaRequestDTO(
        Long productId,
        Integer quantity,
        Double unitPrice
) {}