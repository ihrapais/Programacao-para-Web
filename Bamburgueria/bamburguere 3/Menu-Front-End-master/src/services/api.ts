// src/services/api.ts
import axios from 'axios'

export const api = axios.create({
    baseURL: 'http://localhost:8080', // ajuste para seu backend
})

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('jwtToken');
        if (token && token.split('.').length === 3) { // Verifica se o token parece válido
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error)
    }
)
