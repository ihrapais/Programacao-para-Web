package com.herysson.menubackend.service;

import com.herysson.menubackend.dto.ProdutoDTO;
import com.herysson.menubackend.model.Produto;
import com.herysson.menubackend.repository.ProdutoRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProdutoService {

    @Autowired
    private ProdutoRepository produtoRepository;

    public List<ProdutoDTO> findAll() {
        return produtoRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public Optional<ProdutoDTO> findById(Long id) {
        return produtoRepository.findById(id)
                .map(this::convertToDto);
    }

    public ProdutoDTO save(ProdutoDTO produtoDTO) {
        Produto produto = convertToEntity(produtoDTO);
        return convertToDto(produtoRepository.save(produto));
    }

    public void deleteById(Long id) {
        produtoRepository.deleteById(id);
    }

    public ProdutoDTO update(Long id, ProdutoDTO produtoDTO) {
        Optional<Produto> existingProdutoOptional = produtoRepository.findById(id);
        if (existingProdutoOptional.isPresent()) {
            Produto existingProduto = existingProdutoOptional.get();
            BeanUtils.copyProperties(produtoDTO, existingProduto, "id");
            return convertToDto(produtoRepository.save(existingProduto));
        } else {
            throw new RuntimeException("Produto not found with id " + id);
        }
    }

    private ProdutoDTO convertToDto(Produto produto) {
        ProdutoDTO produtoDTO = new ProdutoDTO();
        BeanUtils.copyProperties(produto, produtoDTO);
        return produtoDTO;
    }

    private Produto convertToEntity(ProdutoDTO produtoDTO) {
        Produto produto = new Produto();
        BeanUtils.copyProperties(produtoDTO, produto);
        return produto;
    }

    public List<ProdutoDTO> findByDisponibilidade(Boolean disponibilidade) {
        return produtoRepository.findByDisponibilidade(disponibilidade).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
}
