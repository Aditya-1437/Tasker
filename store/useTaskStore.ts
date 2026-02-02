import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type TaskStatus = 'todo' | 'in-progress' | 'finished';

export interface Task {
    id: string;
    title: string;
    description?: string;
    status: TaskStatus;
    createdAt: number;
}

export interface TaskState {
    tasks: Task[];
    searchQuery: string;
    addTask: (title: string, description?: string, status?: TaskStatus) => void;
    updateTask: (id: string, updates: Partial<Task>) => void;
    deleteTask: (id: string) => void;
    moveTask: (id: string, newStatus: TaskStatus) => void;
    setSearchQuery: (query: string) => void;
}

export const useTaskStore = create<TaskState>()(
    persist(
        (set) => ({
            tasks: [],
            searchQuery: '',

            addTask: (title, description, status = 'todo') =>
                set((state) => ({
                    tasks: [
                        ...state.tasks,
                        {
                            id: crypto.randomUUID(),
                            title,
                            description,
                            status,
                            createdAt: Date.now(),
                        },
                    ],
                })),

            updateTask: (id, updates) =>
                set((state) => ({
                    tasks: state.tasks.map((task) =>
                        task.id === id ? { ...task, ...updates } : task
                    ),
                })),

            deleteTask: (id) =>
                set((state) => ({
                    tasks: state.tasks.filter((task) => task.id !== id),
                })),

            moveTask: (id, newStatus) =>
                set((state) => ({
                    tasks: state.tasks.map((task) =>
                        task.id === id ? { ...task, status: newStatus } : task
                    ),
                })),

            setSearchQuery: (query) => set({ searchQuery: query }),
        }),
        {
            name: 'task-storage',
        }
    )
);
