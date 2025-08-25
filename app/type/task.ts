// src/types/task.ts

export type TaskStatus = 'todo' | 'in-progress' | 'review' | 'done' | 'testing' | 'deploy';

export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignee?: string;
  dueDate?: string; 
  createdAt: string;
  updatedAt: string;
}

export interface TaskFormData {
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignee?: string;
  dueDate?: string;
}

// Store types
export interface TaskFilters {
  status?: TaskStatus[];
  priority?: TaskPriority[];
  assignee?: string;
  search?: string;
}

export interface TaskStats {
  total: number;
  completed: number;
  inProgress: number;
  overdue: number;
  byPriority: Record<TaskPriority, number>;
  byStatus: Record<TaskStatus, number>;
}

export interface TaskColumn {
  id: TaskStatus;
  title: string;
  color: string;
  limit?: number;
}

export interface ColumnConfig {
    id: TaskStatus;
    title: string;
    color: string;
    limit?: number;
}