'use client';

import { v4 as uuidv4 } from 'uuid';
import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { ColumnTask, Task, TaskData } from '../type/task';
import { COLUMNS } from '../constants/task-board.constant';

interface TaskStore {
  tasks: Task[];
  columns: ColumnTask[];
  loading: boolean;

  // Actions
  addTask: (task: TaskData) => Promise<void>;
  updateTask: (id: string, updates: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  moveTask: (taskId: string, newStatus: string) => void;
  addColumn: (column: ColumnTask) => Promise<void>;
  deleteColumn: (id: string) => Promise<void>;
  moveColumn: (column: number, newColumnindex: number) => void;
  setLoading: (loading: boolean) => void;
}

export const useTaskStore = create<TaskStore>()(
  devtools(
    persist(
      (set) => ({
        tasks: [],
        columns: [...COLUMNS],
        loading: false,
        error: null,
        addColumn: async (columnData: ColumnTask) => {
          set({ loading: true });
          const newColumn: ColumnTask = {
            ...columnData,
          };
          set((state) => ({
            columns: [...state.columns, newColumn],
            loading: false,
          }));
        },
        deleteColumn: async (id: string) => {
          set({ loading: true });
          set((state) => ({
            columns: state?.columns?.filter((c) => c.id !== id),
            loading: false,
          }));
        },

        moveColumn: (columnIndex: number, newColumnIndex: number) => {
          set((state) => {
            if (!state.columns) return state;
            const newColumns = [...state.columns];
            const [moved] = newColumns.splice(columnIndex, 1);
            newColumns.splice(newColumnIndex, 0, moved);
            return { columns: newColumns };
          });
        },

        addTask: async (taskData: TaskData) => {
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

        moveTask: (taskId: string, newStatus: string) => {
          set((state) => {
            return {
              tasks: state.tasks.map((task) =>
                task.id === taskId
                  ? { ...task, status: newStatus, updatedAt: new Date().toISOString() }
                  : task
              ),
            };
          });
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