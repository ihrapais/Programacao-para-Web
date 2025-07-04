// src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { CartProvider } from './context/CartContext'
import { NotificationProvider } from './context/NotificationContext'
import { BrowserRouter } from 'react-router-dom'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <CartProvider>
                    <NotificationProvider>
                        <App />
                    </NotificationProvider>
                </CartProvider>
            </QueryClientProvider>
        </BrowserRouter>
    </React.StrictMode>,
)