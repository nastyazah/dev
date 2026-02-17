// src/lib/stores/user.ts
import { writable } from 'svelte/store';
import { goto } from '$app/navigation';
import type { User } from '$types';

interface UserState {
    user: User | null;
    loading: boolean;
}

function createUserStore() {
    const { subscribe, set, update } = writable<UserState>({
        user: null,
        loading: false
    });

    return {
        subscribe,

        // Set user (from server data)
        setUser: (user: User | null) => {
            update(state => ({
                ...state,
                user,
                loading: false
            }));
        },

        // Login
        login: async (email: string, password: string) => {
            update(state => ({ ...state, loading: true }));

            try {
                const response = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                });

                const result = await response.json();

                if (result.success) {
                    update(state => ({
                        ...state,
                        user: result.data.user,
                        loading: false
                    }));

                    // Redirect based on role
                    const user = result.data.user;
                    if (user.role === 'ADMIN') {
                        goto('/admin');
                    } else if (user.role === 'JURY') {
                        goto('/jury');
                    } else {
                        goto('/tournaments');
                    }
                } else {
                    update(state => ({ ...state, loading: false }));
                    throw new Error(result.message || 'Помилка входу');
                }
            } catch (error) {
                update(state => ({ ...state, loading: false }));
                throw error;
            }
        },

        // Register
        register: async (email: string, password: string, name: string, role: User['role'] = 'TEAM') => {
            update(state => ({ ...state, loading: true }));

            try {
                const response = await fetch('/api/auth/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password, name, role })
                });

                const result = await response.json();

                if (result.success) {
                    update(state => ({
                        ...state,
                        user: result.data.user,
                        loading: false
                    }));

                    goto('/tournaments');
                } else {
                    update(state => ({ ...state, loading: false }));
                    throw new Error(result.message || 'Помилка реєстрації');
                }
            } catch (error) {
                update(state => ({ ...state, loading: false }));
                throw error;
            }
        },

        // Logout
        logout: async () => {
            update(state => ({ ...state, loading: true }));

            try {
                await fetch('/api/auth/logout', { method: 'POST' });

                set({ user: null, loading: false });
                goto('/');
            } catch (error) {
                console.error('Logout error:', error);
                // Force logout even if request fails
                set({ user: null, loading: false });
                goto('/');
            }
        },

        // Refresh user data
        refresh: async () => {
            update(state => ({ ...state, loading: true }));

            try {
                const response = await fetch('/api/auth/me');
                const result = await response.json();

                if (result.success) {
                    update(state => ({
                        ...state,
                        user: result.data.user,
                        loading: false
                    }));
                } else {
                    update(state => ({ ...state, user: null, loading: false }));
                }
            } catch (error) {
                console.error('Refresh error:', error);
                update(state => ({ ...state, user: null, loading: false }));
            }
        },

        // Update user profile
        updateProfile: async (updates: Partial<Pick<User, 'name' | 'email'>>) => {
            update(state => ({ ...state, loading: true }));

            try {
                const response = await fetch('/api/auth/profile', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updates)
                });

                const result = await response.json();

                if (result.success) {
                    update(state => ({
                        ...state,
                        user: result.data.user,
                        loading: false
                    }));
                } else {
                    update(state => ({ ...state, loading: false }));
                    throw new Error(result.message || 'Помилка оновлення профілю');
                }
            } catch (error) {
                update(state => ({ ...state, loading: false }));
                throw error;
            }
        }
    };
}

export const userStore = createUserStore();