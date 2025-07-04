import { Navigate } from 'react-router-dom'
import type { ReactNode } from 'react'

interface PrivateRouteProps {
    children: ReactNode;
}

export function PrivateRoute({ children }: PrivateRouteProps) {
    const isAuthenticated = localStorage.getItem('jwtToken');

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
}
