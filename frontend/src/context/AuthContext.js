import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';

const AuthContext = createContext(null);

/**
 * AuthProvider — Single source of truth for authentication state.
 * Wraps the app and provides login/logout/user via context.
 */
export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const token = sessionStorage.getItem('authToken');
        const username = sessionStorage.getItem('username');
        return token ? { token, username } : null;
    });

    const isAuthenticated = !!user;

    const login = useCallback((token, username) => {
        sessionStorage.setItem('authToken', token);
        sessionStorage.setItem('username', username);
        setUser({ token, username });
    }, []);

    const logout = useCallback(() => {
        sessionStorage.removeItem('authToken');
        sessionStorage.removeItem('username');
        setUser(null);
    }, []);

    const value = useMemo(
        () => ({ user, isAuthenticated, login, logout }),
        [user, isAuthenticated, login, logout]
    );

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

/**
 * useAuth — Hook to access auth state and actions.
 * Must be used within an AuthProvider.
 */
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
