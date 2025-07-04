

import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom'
import { MenuCliente } from './components/MenuCliente'
import { Carrinho } from './components/Carrinho'
import { ProductList } from './components/ProductList'
import { LoginPage } from './components/LoginPage'
import { PrivateRoute } from './components/PrivateRoute'
import { useCart } from './context/CartContext'
import { jwtDecode } from 'jwt-decode'
import { useState, useEffect } from 'react'

function App() {
    const { cart } = useCart();
    const navigate = useNavigate();
    const location = useLocation(); // Hook para obter a localização atual

    const [token, setToken] = useState<string | null>(localStorage.getItem('jwtToken'));
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

    useEffect(() => {
        console.log("useEffect: Token changed", token);
        if (token) {
            try {
                const decodedToken: { role: string } = jwtDecode(token);
                console.log("useEffect: Decoded Token", decodedToken);
                console.log("useEffect: Decoded Role", decodedToken.role);
                setIsAdminLoggedIn(decodedToken.role === 'ROLE_ADMIN');
            } catch (error) {
                console.error("Erro ao decodificar token JWT:", error);
                setIsAdminLoggedIn(false);
                setToken(null); // Token inválido, limpa o estado
                localStorage.removeItem('jwtToken');
            }
        } else {
            setIsAdminLoggedIn(false);
        }
    }, [token]);

    const handleLoginSuccess = (newToken: string) => {
        localStorage.setItem('jwtToken', newToken);
        setToken(newToken);
    };

    const handleLogout = () => {
        localStorage.removeItem('jwtToken');
        setToken(null);
        navigate('/login');
    };

    // Verifica se está na página de administração
    const isOnAdminPage = location.pathname === '/admin';

    const navbarClass = isAdminLoggedIn ? "navbar navbar-expand-lg navbar-dark bg-dark fixed-top" : "navbar navbar-expand-lg navbar-dark bg-danger fixed-top";

    return (
        <>
            <nav className={navbarClass}>
                <div className="container-fluid">
                    <Link className="navbar-brand fs-2 fw-bold" to="/">
                        Bamburgueria {isAdminLoggedIn && <i className="bi bi-gear-fill ms-2"></i>}
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link fs-5" to="/">Cardápio</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link fs-5 ${isAdminLoggedIn ? 'text-warning' : ''}`} to="/admin">Administração</Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav">
                            {(isAdminLoggedIn && isOnAdminPage) ? (
                                <li className="nav-item">
                                    <button className="btn btn-outline-light" onClick={handleLogout}>Sair</button>
                                </li>
                            ) : (
                                <li className="nav-item">
                                    <Link className="nav-link fs-5" to="/cart">
                                        Carrinho {cart.length > 0 && <span className="badge bg-white text-danger rounded-pill">{cart.length}</span>}
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="container mt-5 pt-4">
                <Routes>
                    <Route path="/" element={<MenuCliente />} />
                    <Route path="/login" element={<LoginPage onLoginSuccess={handleLoginSuccess} />} />
                    <Route path="/cart" element={<Carrinho />} />
                    <Route
                        path="/admin"
                        element={
                            <PrivateRoute>
                                <ProductList />
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </div>
        </>
    )
}

export default App
