import { ColumnConfig } from "../type/task";

export const COLUMNS: ColumnConfig[] = [
    { id: 'todo', title: 'To Do', color: '#ff4d4f' },
    { id: 'in-progress', title: 'In Progress', color: '#1890ff' },
    { id: 'review', title: 'Review', color: '#faad14' },
    { id: 'deploy', title: 'Deploy', color: '#6900f3ff' },
    { id: 'testing', title: 'Testing', color: '#f3cf005b' },
    { id: 'done', title: 'Done', color: '#52c41a' },
];

export const TaskBoardDragType = {
    COLUMN: 'COLUMN',
    TASK: 'TASK',
};
