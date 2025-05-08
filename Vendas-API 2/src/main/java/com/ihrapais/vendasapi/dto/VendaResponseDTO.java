package com.ihrapais.vendasapi.dto;

import java.time.LocalDateTime;
import java.util.List;

public record VendaResponseDTO(
        Long id,
        ClienteDTO client,
        List<ItemVendaResponseDTO> items,
        Double discount,
        Double total,
        LocalDateTime createdAt
) {}