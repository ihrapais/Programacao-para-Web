import { useCart } from '../context/CartContext';
import { api } from '../services/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNotification } from '../context/NotificationContext';

interface ItemCompraDTO {
    produtoId: number;
    quantidade: number;
    precoUnitario: number;
}

interface CompraDTO {
    itens: ItemCompraDTO[];
}

export function Carrinho() {
    const { cart, removeFromCart, updateQuantity, clearCart, getTotal } = useCart();
    const queryClient = useQueryClient();
    const { addNotification } = useNotification();

    const finalizePurchaseMutation = useMutation({
        mutationFn: async (compra: CompraDTO) => {
            const response = await api.post('/compras', compra);
            return response.data;
        },
        onSuccess: () => {
            addNotification('Compra finalizada com sucesso!', 'success');
            clearCart();
            queryClient.invalidateQueries({ queryKey: ['compras'] }); // Invalida o cache de compras, se houver
        },
        onError: (error) => {
            console.error("Erro ao finalizar compra:", error);
            addNotification('Erro ao finalizar compra.', 'error');
        },
    });

    const handleFinalizePurchase = () => {
        if (cart.length === 0) {
            addNotification('Seu carrinho está vazio!', 'info');
            return;
        }

        const itensCompra: ItemCompraDTO[] = cart.map(item => ({
            produtoId: item.id!,
            quantidade: item.quantity,
            precoUnitario: item.preco,
        }));

        const compraDTO: CompraDTO = {
            itens: itensCompra,
        };

        finalizePurchaseMutation.mutate(compraDTO);
    };

    return (
        <div className="container mt-4">
            <h1 className="mb-4 text-dark">Seu Carrinho</h1>
            {cart.length === 0 ? (
                <p className="text-muted">O carrinho está vazio.</p>
            ) : (
                <div>
                    <ul className="list-group mb-3">
                        {cart.map((item) => (
                            <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    <h5 className="mb-1 text-dark">{item.nome}</h5>
                                    <small className="text-muted">Preço Unitário: R$ {item.preco.toFixed(2)}</small>
                                    <div className="input-group input-group-sm mt-1" style={{ width: '120px' }}>
                                        <span className="input-group-text">Qtd:</span>
                                        <input
                                            type="number"
                                            min="1"
                                            value={item.quantity}
                                            onChange={(e) => updateQuantity(item.id!, parseInt(e.target.value))}
                                            className="form-control text-center"
                                        />
                                    </div>
                                </div>
                                <div className="text-end">
                                    <span className="fw-bold text-dark">R$ {(item.preco * item.quantity).toFixed(2)}</span>
                                    <button
                                        onClick={() => removeFromCart(item.id!)}
                                        className="btn btn-danger btn-sm ms-3"
                                    >
                                        Remover
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <h2 className="text-end mb-4 text-dark">Total: R$ {getTotal().toFixed(2)}</h2>
                    <div className="d-flex justify-content-end gap-2">
                        <button
                            onClick={handleFinalizePurchase}
                            className="btn btn-success btn-lg"
                        >
                            Finalizar Compra
                        </button>
                        <button
                            onClick={clearCart}
                            className="btn btn-secondary btn-lg"
                        >
                            Limpar Carrinho
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}