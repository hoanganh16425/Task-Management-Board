import { create, StoreApi, UseBoundStore } from 'zustand';
import { devtools, subscribeWithSelector } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    role: 'admin' | 'user' | 'moderator';
    status: 'active' | 'inactive';
    address: string;
    createdAt: string;
    avatar?: string;
}

export interface UserFormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    role: 'admin' | 'user' | 'moderator';
    status: 'active' | 'inactive';
    address: string;
}

export interface FilterData {
    search: string;
    role: string;
    status: string;
}

export interface UserState {
    users: User[];
    filteredUsers: User[];
    filters: FilterData;
    loading: boolean;

    setUsers: (users: User[]) => void;
    addUser: (userData: UserFormData) => Promise<void>;
    updateUser: (id: string, userData: UserFormData) => Promise<void>;
    deleteUser: (id: string) => Promise<void>;
    loadUsers: () => Promise<void>;
    setFilters: (filters: Partial<FilterData>) => void;
    clearFilters: () => void;
    applyFilters: () => void;
    setLoading: (loading: boolean) => void;
}

const mockApi = {
    async fetchUsers(): Promise<User[]> {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return [
            {
                id: '1',
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@example.com',
                phone: '+1 234-567-8900',
                role: 'admin',
                status: 'active',
                address: '123 Main St, New York, NY',
                createdAt: '2024-01-15T10:30:00Z',
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
            },
            {
                id: '2',
                firstName: 'Jane',
                lastName: 'Smith',
                email: 'jane.smith@example.com',
                phone: '+1 234-567-8901',
                role: 'user',
                status: 'active',
                address: '456 Oak Ave, Los Angeles, CA',
                createdAt: '2024-01-14T09:15:00Z',
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane'
            },
            {
                id: '3',
                firstName: 'Bob',
                lastName: 'Johnson',
                email: 'bob.johnson@example.com',
                phone: '+1 234-567-8902',
                role: 'moderator',
                status: 'inactive',
                address: '789 Pine Rd, Chicago, IL',
                createdAt: '2024-01-13T14:45:00Z',
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob'
            },
            {
                id: '4',
                firstName: 'Alice',
                lastName: 'Brown',
                email: 'alice.brown@example.com',
                phone: '+1 234-567-8903',
                role: 'user',
                status: 'active',
                address: '321 Elm St, Seattle, WA',
                createdAt: '2024-01-12T16:20:00Z',
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice'
            },
            {
                id: '5',
                firstName: 'Charlie',
                lastName: 'Wilson',
                email: 'charlie.wilson@example.com',
                phone: '+1 234-567-8904',
                role: 'moderator',
                status: 'active',
                address: '654 Maple Ave, Austin, TX',
                createdAt: '2024-01-11T11:45:00Z',
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie'
            }
        ];
    },

    async createUser(userData: UserFormData): Promise<User> {
        await new Promise(resolve => setTimeout(resolve, 800));
        return {
            id: Date.now().toString(),
            ...userData,
            createdAt: new Date().toISOString(),
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.firstName}`
        };
    },
    async updateUser(id: string, userData: UserFormData): Promise<User> {
        await new Promise(resolve => setTimeout(resolve, 800));
        return {
            id,
            ...userData,
            createdAt: new Date().toISOString(),
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.firstName}`
        };
    },

    async deleteUser(id: string): Promise<void> {
        await new Promise(resolve => setTimeout(resolve, 500));
    }
};

export const useUserStore = create<UserState>()(
    devtools(
        subscribeWithSelector(
            immer((set, get) => ({
                users: [],
                filteredUsers: [],
                filters: {
                    search: '',
                    role: '',
                    status: ''
                },
                loading: false,
                modalVisible: false,
                editingUser: null,
                error: null,
                setUsers: (users) => {
                    set((state) => {
                        state.users = users;
                    });
                    get().applyFilters();
                },
                addUser: async (userData) => {
                    try {
                        set((state) => {
                            state.loading = true;
                        });

                        const newUser = await mockApi.createUser(userData);
                        
                        set((state) => {
                            state.users.push(newUser);
                            state.loading = false;
                        });

                        get().applyFilters();
                    } catch (error) {
                        set((state) => {
                            state.loading = false;
                        });
                        throw error;
                    }
                },

                updateUser: async (id, userData) => {
                    try {
                        set((state) => {
                            state.loading = true;
                        });

                        const updatedUser = await mockApi.updateUser(id, userData);
                        
                        set((state) => {
                            const index = state.users.findIndex((user: User) => user.id === id);
                            if (index !== -1) {
                                state.users[index] = { ...state.users[index], ...updatedUser };
                            }
                            state.loading = false;
                        });

                        get().applyFilters();
                    } catch (error) {
                        set((state) => {
                            state.loading = false;
                        });
                        throw error;
                    }
                },

                deleteUser: async (id) => {
                    try {
                        set((state) => {
                            state.loading = true;
                        });

                        await mockApi.deleteUser(id);
                        
                        set((state) => {
                            state.users = state.users.filter((user: User) => user.id !== id);
                            state.loading = false;
                        });

                        get().applyFilters();
                    } catch (error) {
                        set((state) => {
                            state.loading = false;
                        });
                        throw error;
                    }
                },

                loadUsers: async () => {
                    try {
                        set((state) => {
                            state.loading = true;
                        });

                        const users = await mockApi.fetchUsers();
                        
                        set((state) => {
                            state.users = users;
                            state.loading = false;
                        });

                        get().applyFilters();
                    } catch (error) {
                        set((state) => {
                            state.loading = false;
                        });
                        throw error;
                    }
                },

                setFilters: (newFilters) => {
                    set((state) => {
                        state.filters = { ...state.filters, ...newFilters };
                    });
                    get().applyFilters();
                },

                clearFilters: () => {
                    set((state) => {
                        state.filters = {
                            search: '',
                            role: '',
                            status: ''
                        };
                    });
                    get().applyFilters();
                },

                applyFilters: () => {
                    const { users, filters } = get();
                    let filtered = [...users];

                    if (filters.search) {
                        const searchLower = filters.search.toLowerCase();
                        filtered = filtered.filter(user =>
                            user.firstName.toLowerCase().includes(searchLower) ||
                            user.lastName.toLowerCase().includes(searchLower) ||
                            user.email.toLowerCase().includes(searchLower)
                        );
                    }

                    if (filters.role) {
                        filtered = filtered.filter(user => user.role === filters.role);
                    }

                    if (filters.status) {
                        filtered = filtered.filter(user => user.status === filters.status);
                    }

                    set((state) => {
                        state.filteredUsers = filtered;
                    });
                },
                setLoading: (loading) => {
                    set((state) => {
                        state.loading = loading;
                    });
                }
            }))
        )
    )
);
