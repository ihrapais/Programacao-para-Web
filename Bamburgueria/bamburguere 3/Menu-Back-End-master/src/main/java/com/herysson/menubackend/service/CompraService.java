package com.herysson.menubackend.service;

import com.herysson.menubackend.dto.CompraDTO;
import com.herysson.menubackend.dto.ItemCompraDTO;
import com.herysson.menubackend.model.Compra;
import com.herysson.menubackend.model.ItemCompra;
import com.herysson.menubackend.model.Produto;
import com.herysson.menubackend.repository.CompraRepository;
import com.herysson.menubackend.repository.ProdutoRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CompraService {

    @Autowired
    private CompraRepository compraRepository;

    @Autowired
    private ProdutoRepository produtoRepository;

    @Transactional
    public CompraDTO save(CompraDTO compraDTO) {
        Compra compra = new Compra();
        compra.setDataCompra(LocalDateTime.now());

        Double valorTotal = 0.0;
        for (ItemCompraDTO itemDTO : compraDTO.getItens()) {
            Produto produto = produtoRepository.findById(itemDTO.getProdutoId())
                    .orElseThrow(() -> new RuntimeException("Produto not found"));

            ItemCompra itemCompra = new ItemCompra();
            itemCompra.setProduto(produto);
            itemCompra.setQuantidade(itemDTO.getQuantidade());
            itemCompra.setPrecoUnitario(produto.getPreco());
            itemCompra.setCompra(compra);

            compra.getItens().add(itemCompra);
            valorTotal += itemCompra.getQuantidade() * itemCompra.getPrecoUnitario();
        }
        compra.setValorTotal(valorTotal);

        Compra savedCompra = compraRepository.save(compra);
        return convertToDto(savedCompra);
    }

    private CompraDTO convertToDto(Compra compra) {
        CompraDTO compraDTO = new CompraDTO();
        BeanUtils.copyProperties(compra, compraDTO);
        compraDTO.setItens(compra.getItens().stream()
                .map(this::convertItemToDto)
                .collect(Collectors.toList()));
        return compraDTO;
    }

    private ItemCompraDTO convertItemToDto(ItemCompra itemCompra) {
        ItemCompraDTO itemCompraDTO = new ItemCompraDTO();
        itemCompraDTO.setProdutoId(itemCompra.getProduto().getId());
        itemCompraDTO.setQuantidade(itemCompra.getQuantidade());
        itemCompraDTO.setPrecoUnitario(itemCompra.getPrecoUnitario());
        return itemCompraDTO;
    }

    public List<CompraDTO> findAll() {
        return compraRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
}
