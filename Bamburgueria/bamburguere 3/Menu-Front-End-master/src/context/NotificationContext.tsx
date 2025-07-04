import React, { createContext, useState, useContext, useCallback } from 'react';
import type { ReactNode } from 'react';

interface Notification {
    id: number;
    message: string;
    type: 'success' | 'error' | 'info';
}

interface NotificationContextType {
    addNotification: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    const addNotification = useCallback((message: string, type: 'success' | 'error' | 'info' = 'info') => {
        const id = Date.now();
        setNotifications((prev) => [...prev, { id, message, type }]);
        setTimeout(() => {
            setNotifications((prev) => prev.filter((n) => n.id !== id));
        }, 3000); // Notificação desaparece após 3 segundos
    }, []);

    return (
        <NotificationContext.Provider value={{ addNotification }}>
            {children}
            <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 1100 }}>
                {notifications.map((notification) => (
                    <div
                        key={notification.id}
                        className={`alert alert-${notification.type === 'success' ? 'success' : notification.type === 'error' ? 'danger' : 'info'} alert-dismissible fade show`}
                        role="alert"
                    >
                        {notification.message}
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setNotifications((prev) => prev.filter((n) => n.id !== notification.id))}></button>
                    </div>
                ))}
            </div>
        </NotificationContext.Provider>
    );
};

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
};