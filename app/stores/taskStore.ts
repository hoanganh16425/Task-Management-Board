'use client';

import { v4 as uuidv4 } from 'uuid';
import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { Task, TaskFormData, TaskStatus } from '../type/task';

interface TaskStore {
  tasks: Task[];
  loading: boolean;

  // Actions
  addTask: (task: TaskFormData) => Promise<void>;
  updateTask: (id: string, updates: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  moveTask: (taskId: string, newStatus: TaskStatus) => void;
  setLoading: (loading: boolean) => void;
}

export const useTaskStore = create<TaskStore>()(
  devtools(
    persist(
      (set) => ({
        tasks: [],
        loading: false,
        error: null,
        addTask: async (taskData: TaskFormData) => {
          set({ loading: true });
          const newTask: Task = {
            ...taskData,
            id: uuidv4(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          set((state) => ({
            tasks: [...state.tasks, newTask],
            loading: false,
          }));
        },

        updateTask: async (id: string, updates: Partial<Task>) => {
          set({ loading: true });
            set((state) => ({
              tasks: state.tasks.map((task) =>
                task.id === id
                  ? { ...task, ...updates, updatedAt: new Date().toISOString() }
                  : task
              ),
              loading: false,
            }));
        },

        deleteTask: async (id: string) => {
          set({ loading: true });
            set((state) => ({
              tasks: state.tasks.filter((task) => task.id !== id),
              loading: false,
            }));
        },

        moveTask: (taskId: string, newStatus: TaskStatus) => {
          set((state) => ({
            tasks: state.tasks.map((task) =>
              task.id === taskId
                ? { ...task, status: newStatus, updatedAt: new Date().toISOString() }
                : task
            ),
          }));
        },

        setLoading: (loading: boolean) => set({ loading }),
      }),
      {
        name: 'taskflow-storage',
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({ tasks: state.tasks }),
      }
    ),
    { name: 'taskflow-store' }
  )
);