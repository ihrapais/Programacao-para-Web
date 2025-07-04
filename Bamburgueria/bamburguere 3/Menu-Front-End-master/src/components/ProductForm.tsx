import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../services/api'
import type { Produto } from '../models/Produto'
import { useNotification } from '../context/NotificationContext'

interface ProductFormProps {
    onClose: () => void;
    initialData?: Produto; // Adiciona prop opcional para dados iniciais (edição)
}

export function ProductForm({ onClose, initialData }: ProductFormProps) {
    const queryClient = useQueryClient();
    const { addNotification } = useNotification();

    const [formData, setFormData] = useState<Omit<Produto, 'id'>>(
        initialData || {
            nome: '',
            descricao: '',
            preco: 0,
            imagem: '',
            categoria: '',
            disponivel: true,
        }
    );

    const mutation = useMutation({
        mutationFn: async (produto: Omit<Produto, 'id'>) => {
            const token = localStorage.getItem('jwtToken');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            console.log('Enviando requisição de atualização com a seguinte configuração:', config); // Log para depuração

            if (initialData?.id) {
                // Se initialData.id existe, é uma edição (PUT)
                const response = await api.put(`/produtos/${initialData.id}`, produto, config);
                return response.data;
            } else {
                // Caso contrário, é um novo cadastro (POST)
                const response = await api.post('/produtos', produto, config);
                return response.data;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['produtos'] });
            addNotification(initialData?.id ? 'Produto atualizado com sucesso!' : 'Produto cadastrado com sucesso!', 'success');
            onClose();
        },
        onError: () => {
            addNotification(initialData?.id ? 'Erro ao atualizar produto.' : 'Erro ao cadastrar produto.', 'error');
        },
    });

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        mutation.mutate(formData);
    }

    return (
        <form className="p-4" onSubmit={handleSubmit}>
            <h2 className="mb-4 text-dark">
                {initialData?.id ? 'Editar Produto' : 'Cadastrar Novo Produto'}
            </h2>

            <div className="mb-3">
                <label htmlFor="nome" className="form-label">Nome</label>
                <input
                    type="text"
                    id="nome"
                    name="nome"
                    placeholder="Nome"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                    className="form-control"
                />
            </div>

            <div className="mb-3">
                <label htmlFor="descricao" className="form-label">Descrição</label>
                <input
                    type="text"
                    id="descricao"
                    name="descricao"
                    placeholder="Descrição"
                    value={formData.descricao}
                    onChange={handleChange}
                    required
                    className="form-control"
                />
            </div>

            <div className="mb-3">
                <label htmlFor="imagem" className="form-label">Link Imagem</label>
                <input
                    type="text"
                    id="imagem"
                    name="imagem"
                    placeholder="URL da Imagem"
                    value={formData.imagem}
                    onChange={handleChange}
                    required
                    className="form-control"
                />
            </div>

            <div className="mb-3">
                <label htmlFor="categoria" className="form-label">Categoria</label>
                <input
                    type="text"
                    id="categoria"
                    name="categoria"
                    placeholder="Categoria"
                    value={formData.categoria}
                    onChange={handleChange}
                    required
                    className="form-control"
                />
            </div>

            <div className="mb-3">
                <label htmlFor="preco" className="form-label">Preço</label>
                <input
                    type="number"
                    id="preco"
                    name="preco"
                    placeholder="Preço"
                    value={formData.preco}
                    onChange={handleChange}
                    required
                    className="form-control"
                />
            </div>

            <div className="form-check mb-3">
                <input
                    type="checkbox"
                    id="disponivel"
                    name="disponibilidade"
                    checked={formData.disponibilidade}
                    onChange={(e) => setFormData((prev) => ({ ...prev, disponibilidade: e.target.checked }))}
                    className="form-check-input"
                />
                <label htmlFor="disponivel" className="form-check-label">Disponível</label>
            </div>

            <button
                type="submit"
                className="btn btn-primary w-100"
            >
                {initialData?.id ? 'Atualizar' : 'Cadastrar'}
            </button>
        </form>
    )
}
