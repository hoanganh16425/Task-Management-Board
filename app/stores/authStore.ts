'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    avatar?: string;
}

interface AuthStore {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;

    // Actions
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    setUser: (user: User) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    clearError: () => void;
}

const mockLogin = async (email: string, password: string): Promise<User> => {
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (email === 'admin@taskflow.com' && password === 'password123') {
        return {
            id: '1',
            name: 'John Doe',
            email: 'admin@taskflow.com',
            role: 'Project Manager',
        };
    } else if (email === 'user@taskflow.com' && password === 'password123') {
        return {
            id: '2',
            name: 'Jane Smith',
            email: 'user@taskflow.com',
            role: 'Developer',
        };
    } else {
        throw new Error('Invalid email or password');
    }
};

export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            loading: false,
            error: null,

            login: async (email: string, password: string) => {
                set({ loading: true, error: null });

                try {
                    const user = await mockLogin(email, password);
                    set({
                        user,
                        isAuthenticated: true,
                        loading: false,
                        error: null
                    });
                } catch (error) {
                    const errorMessage = error instanceof Error ? error.message : 'Login failed';
                    set({
                        loading: false,
                        error: errorMessage,
                        user: null,
                        isAuthenticated: false
                    });
                }
            },

            logout: () => {
                set({
                    user: null,
                    isAuthenticated: false,
                    error: null
                });
                localStorage.removeItem('taskflow-auth-storage');
                window.location.href = '/login';
            },

            setUser: (user: User) => {
                set({ user, isAuthenticated: true });
            },

            setLoading: (loading: boolean) => {
                set({ loading });
            },

            setError: (error: string | null) => {
                set({ error });
            },

            clearError: () => {
                set({ error: null });
            },
        }),
        {
            name: 'taskflow-auth-storage',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                user: state.user,
                isAuthenticated: state.isAuthenticated
            }),
        }
    )
);