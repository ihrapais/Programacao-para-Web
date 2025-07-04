import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../services/api'

import type { Produto } from '../models/Produto'
import { Modal } from './Modal'
import { ProductForm } from './ProductForm'
import { useNotification } from '../context/NotificationContext'

export function ProductList() {
    const queryClient = useQueryClient()
    const { addNotification } = useNotification()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingProduct, setEditingProduct] = useState<Produto | undefined>(undefined)
    const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false)
    const [productIdToDelete, setProductIdToDelete] = useState<number | null>(null)

    const { data, isLoading, isError } = useQuery<Produto[]>({
        queryKey: ['produtos'],
        queryFn: async () => {
            const response = await api.get('/produtos')
            return response.data
        }
    })

    const deleteMutation = useMutation({
        mutationFn: async (id: number) => {
            await api.delete(`/produtos/${id}`)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['produtos'] })
            addNotification('Produto excluído com sucesso!', 'success')
        },
        onError: () => {
            addNotification('Erro ao excluir produto.', 'error')
        },
    })

    const toggleAvailabilityMutation = useMutation({
        mutationFn: async (produto: Produto) => {
            const updatedProduto = { ...produto, disponibilidade: !produto.disponibilidade }
            await api.put(`/produtos/${produto.id}`, updatedProduto)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['produtos'] })
            addNotification('Disponibilidade do produto atualizada com sucesso!', 'success')
        },
        onError: () => {
            addNotification('Erro ao atualizar disponibilidade do produto.', 'error')
        },
    })

    if (isLoading) return <p className="text-center text-lg mt-4">Carregando...</p>
    if (isError) return <p className="text-center text-lg mt-4 text-danger">Erro ao carregar os produtos.</p>

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4 display-4 fw-bold text-dark">Cardápio Administrativo</h1>
            <button
                onClick={() => {
                    setEditingProduct(undefined) // Para garantir que é um novo cadastro
                    setIsModalOpen(true)
                }}
                className="btn btn-success mb-4"
            >
                Cadastrar Novo Produto
            </button>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {data?.map((produto) => (
                    <div key={produto.id} className="col">
                        <div className="card h-100 shadow-sm text-center">
                            <img src={produto.imagem} className="card-img-top mx-auto mt-3 rounded-circle border border-primary" alt={produto.nome} style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
                            <div className="card-body d-flex flex-column">
                                <h2 className="card-title fs-4 fw-semibold text-dark">{produto.nome}</h2>
                                <p className="card-text text-muted flex-grow-1"><strong>Descrição:</strong> {produto.descricao}</p>
                                <p className="card-text text-muted"><strong>Categoria:</strong> {produto.categoria}</p>
                                <p className="card-text text-dark fs-5 fw-bold">R$ {produto.preco.toFixed(2)}</p>
                                <p className={`card-text ${produto.disponibilidade ? 'text-success' : 'text-danger'}`}>
                                    Disponível: {produto.disponibilidade ? 'Sim' : 'Não'}
                                </p>
                                <div className="d-flex justify-content-around mt-auto">
                                    <button
                                        onClick={() => {
                                            setEditingProduct(produto)
                                            setIsModalOpen(true)
                                        }}
                                        className="btn btn-primary btn-sm"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => toggleAvailabilityMutation.mutate(produto)}
                                        className={`btn btn-sm ${produto.disponibilidade ? 'btn-warning' : 'btn-success'}`}
                                    >
                                        {produto.disponibilidade ? 'Desativar' : 'Ativar'}
                                    </button>
                                    <button
                                        onClick={() => {
                                            setProductIdToDelete(produto.id!)
                                            setShowConfirmDeleteModal(true)
                                        }}
                                        className="btn btn-danger btn-sm"
                                    >
                                        Excluir
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <ProductForm
                    onClose={() => {
                        setIsModalOpen(false)
                        setEditingProduct(undefined)
                    }}
                    initialData={editingProduct}
                />
            </Modal>

            <Modal isOpen={showConfirmDeleteModal} onClose={() => setShowConfirmDeleteModal(false)}>
                <div className="p-4 text-center">
                    <h2 className="mb-3">Confirmar Exclusão</h2>
                    <p className="mb-4">Tem certeza que deseja excluir este produto?</p>
                    <div className="d-flex justify-content-center gap-2">
                        <button
                            onClick={() => {
                                if (productIdToDelete) {
                                    deleteMutation.mutate(productIdToDelete)
                                    setProductIdToDelete(null)
                                }
                                setShowConfirmDeleteModal(false)
                            }}
                            className="btn btn-danger"
                        >
                            Sim, Excluir
                        </button>
                        <button
                            onClick={() => {
                                setShowConfirmDeleteModal(false)
                                setProductIdToDelete(null)
                            }}
                            className="btn btn-secondary"
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}