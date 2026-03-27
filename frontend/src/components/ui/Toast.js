import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((message, type = 'info', duration = 4000) => {
        const id = Date.now() + Math.random();
        setToasts(prev => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, duration);
    }, []);

    const toast = useMemo(() => ({
        success: (msg) => addToast(msg, 'success'),
        error: (msg) => addToast(msg, 'error'),
        info: (msg) => addToast(msg, 'info'),
        warning: (msg) => addToast(msg, 'warning'),
    }), [addToast]);

    return (
        <ToastContext.Provider value={toast}>
            {children}
            <ToastContainer toasts={toasts} onDismiss={(id) => setToasts(prev => prev.filter(t => t.id !== id))} />
        </ToastContext.Provider>
    );
}

export function useToast() {
    const ctx = useContext(ToastContext);
    if (!ctx) throw new Error('useToast must be used within ToastProvider');
    return ctx;
}

const TYPE_STYLES = {
    success: 'bg-emerald-600 text-white',
    error: 'bg-red-600 text-white',
    info: 'bg-brand-600 text-white',
    warning: 'bg-amber-500 text-white',
};

const TYPE_ICONS = {
    success: '✓',
    error: '✕',
    info: 'ℹ',
    warning: '⚠',
};

function ToastContainer({ toasts, onDismiss }) {
    return (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm">
            {toasts.map(t => (
                <div
                    key={t.id}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg animate-slide-up ${TYPE_STYLES[t.type]}`}
                    role="alert"
                >
                    <span className="text-lg font-bold flex-shrink-0">{TYPE_ICONS[t.type]}</span>
                    <p className="text-sm font-medium flex-1">{t.message}</p>
                    <button
                        onClick={() => onDismiss(t.id)}
                        className="flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity"
                        aria-label="Dismiss"
                    >
                        ✕
                    </button>
                </div>
            ))}
        </div>
    );
}
