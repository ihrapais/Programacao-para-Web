import { useState } from 'react'
import { api } from '../services/api'
import { useNavigate } from 'react-router-dom'
import { useNotification } from '../context/NotificationContext'

export function LoginPage({ onLoginSuccess }: { onLoginSuccess: (token: string) => void }) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const { addNotification } = useNotification()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const response = await api.post('/auth/login', { username, password })
            const token = response.data // O token JWT é a própria resposta
            onLoginSuccess(token); // Chama a função passada via prop
            addNotification('Login bem-sucedido!', 'success')
            navigate('/admin') // Redireciona para a área administrativa
        } catch (error) {
            addNotification('Erro ao fazer login. Verifique suas credenciais.', 'error')
            console.error('Erro de login:', error)
        }
    }

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
            <div className="card shadow-lg p-4" style={{ width: '22rem' }}>
                <div className="card-body">
                    <h2 className="card-title text-center mb-4 text-dark">Login Administrativo</h2>
                    <form onSubmit={handleLogin}>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Usuário</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                className="form-control"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="form-label">Senha</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="form-control"
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary w-100"
                        >
                            Entrar
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}