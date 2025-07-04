import { useQuery } from '@tanstack/react-query'
import { api } from '../services/api'
import type { Produto } from '../models/Produto'
import { useCart } from '../context/CartContext'
import { useNotification } from '../context/NotificationContext'

export function MenuCliente() {
    const { addToCart } = useCart()
    const { addNotification } = useNotification()

    const handleAddToCart = (produto: Produto) => {
        addToCart(produto)
        addNotification(`${produto.nome} adicionado ao carrinho!`, 'success')
    }

    const { data, isLoading, isError } = useQuery<Produto[]>({
        queryKey: ['produtosAtivos'],
        queryFn: async () => {
            const response = await api.get('/produtos?disponibilidade=true')
            return response.data
        }
    })

    if (isLoading) return <p className="text-center text-lg mt-4">Carregando cardápio...</p>
    if (isError) return <p className="text-center text-lg mt-4 text-danger">Erro ao carregar o cardápio.</p>

    // Agrupar produtos por categoria
    const produtosPorCategoria = data?.reduce((acc, produto) => {
        const categoria = produto.categoria || 'Outros' // Garante que sempre haja uma categoria
        if (!acc[categoria]) {
            acc[categoria] = []
        }
        acc[categoria].push(produto)
        return acc
    }, {} as Record<string, Produto[]>)

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4 display-4 fw-bold text-dark">Nosso Cardápio</h1>

            {produtosPorCategoria && Object.keys(produtosPorCategoria).map(categoria => (
                <div key={categoria} className="mb-5">
                    <h2 className="border-bottom border-danger pb-2 mb-4 text-dark">{categoria}</h2>
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        {produtosPorCategoria[categoria].map((produto) => (
                            <div key={produto.id} className="col">
                                <div className="card h-100 shadow-sm text-center">
                                    <img src={produto.imagem} className="card-img-top mx-auto mt-3 rounded-circle border border-danger" alt={produto.nome} style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
                                    <div className="card-body d-flex flex-column">
                                        <h3 className="card-title fs-4 fw-semibold text-dark">{produto.nome}</h3>
                                        <p className="card-text text-muted flex-grow-1"><strong>Descrição:</strong> {produto.descricao}</p>
                                        <p className="card-text text-muted"><strong>Categoria:</strong> {produto.categoria}</p>
                                        <p className="card-text text-danger fs-5 fw-bold">R$ {produto.preco.toFixed(2)}</p>
                                        <button
                                            onClick={() => handleAddToCart(produto)}
                                            className="btn btn-danger mt-auto"
                                        >
                                            Adicionar ao Carrinho
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}