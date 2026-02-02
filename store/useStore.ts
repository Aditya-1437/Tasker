import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

export type Status = 'todo' | 'inprogress' | 'done';
export type Priority = 'low' | 'medium' | 'high';

export interface Task {
    id: string;
    title: string;
    description?: string;
    status: Status;
    priority: Priority;
    createdAt: number;
}

interface TaskState {
    tasks: Task[];
    addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
    updateTask: (id: string, updates: Partial<Task>) => void;
    deleteTask: (id: string) => void;
    moveTask: (id: string, newStatus: Status) => void;
}

export const useStore = create<TaskState>()(
    persist(
        (set) => ({
            tasks: [
                { id: '1', title: 'Research Competitors', status: 'todo', priority: 'high', createdAt: Date.now() },
                { id: '2', title: 'Design System Draft', status: 'inprogress', priority: 'medium', createdAt: Date.now() },
                { id: '3', title: 'Setup Repo', status: 'done', priority: 'low', createdAt: Date.now() },
            ],
            addTask: (task) =>
                set((state) => ({
                    tasks: [
                        ...state.tasks,
                        { ...task, id: uuidv4(), createdAt: Date.now() },
                    ],
                })),
            updateTask: (id, updates) =>
                set((state) => ({
                    tasks: state.tasks.map((t) => (t.id === id ? { ...t, ...updates } : t)),
                })),
            deleteTask: (id) =>
                set((state) => ({
                    tasks: state.tasks.filter((t) => t.id !== id),
                })),
            moveTask: (id, newStatus) =>
                set((state) => ({
                    tasks: state.tasks.map((t) =>
                        t.id === id ? { ...t, status: newStatus } : t
                    ),
                })),
        }),
        {
            name: 'task-storage',
        }
    )
);
