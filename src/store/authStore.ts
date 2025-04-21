import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
    id: string;
    name: string;
    email: string;
    phone?: string;
    avatar?: string;
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    registeredUsers: User[];
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    logout: () => void;
    updateProfile: (userData: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            isAuthenticated: false,
            registeredUsers: [],
            login: async (email: string, password: string) => {
                // Simulate API call
                await new Promise((resolve) => setTimeout(resolve, 1000));

                const { registeredUsers } = get();
                // Check if user exists in our registered users
                const existingUser = registeredUsers.find(user => user.email.toLowerCase() === email.toLowerCase());

                if (existingUser) {
                    // If user exists, log them in with their registered information
                    set({ user: existingUser, isAuthenticated: true });
                } else {
                    // For demo/fallback, create a mock user if not found
                    const mockUser: User = {
                        id: Date.now().toString(),
                        name: email.split('@')[0], // Use part of their email as name
                        email: email,
                        phone: '+1234567890',
                        avatar: `https://ui-avatars.com/api/?name=${email.split('@')[0]}`,
                    };
                    set({ user: mockUser, isAuthenticated: true });
                }
            },
            register: async (name: string, email: string, password: string) => {
                // Simulate API call
                await new Promise((resolve) => setTimeout(resolve, 1500));

                // Create new user with the provided information
                const newUser: User = {
                    id: Date.now().toString(),
                    name,
                    email,
                    avatar: `https://ui-avatars.com/api/?name=${name.replace(' ', '+')}`,
                };

                // Add to registered users and log in
                set((state) => ({
                    user: newUser,
                    isAuthenticated: true,
                    registeredUsers: [...state.registeredUsers, newUser]
                }));
            },
            logout: () => {
                set({ user: null, isAuthenticated: false });
            },
            updateProfile: (userData: Partial<User>) => {
                set((state) => {
                    if (!state.user) return state;

                    const updatedUser = { ...state.user, ...userData };

                    // Also update in the registered users array
                    const updatedRegisteredUsers = state.registeredUsers.map(user =>
                        user.id === state.user?.id ? updatedUser : user
                    );

                    return {
                        user: updatedUser,
                        registeredUsers: updatedRegisteredUsers
                    };
                });
            },
        }),
        {
            name: 'auth-storage',
        }
    )
); 