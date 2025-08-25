'use client';

import { PlusOutlined } from '@ant-design/icons';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { Button, Col, Input, Row, Typography } from 'antd';
import React, { useMemo, useState } from 'react';
import { useTaskStore } from '../stores/taskStore';
import { ColumnConfig, Task, TaskFormData, TaskStatus } from '../type/task';
import TaskColumn from './TaskCollumn';
import TaskForm from './TaskForm';

const { Title } = Typography;
const { Search } = Input;

const COLUMNS: ColumnConfig[] = [
    { id: 'todo', title: 'To Do', color: '#ff4d4f' },
    { id: 'in-progress', title: 'In Progress', color: '#1890ff' },
    { id: 'review', title: 'Review', color: '#faad14' },
    { id: 'deploy', title: 'Deploy', color: '#6900f3ff' },
    { id: 'testing', title: 'Testing', color: '#f3cf005b' },
    { id: 'done', title: 'Done', color: '#52c41a' },
];

const TaskBoard: React.FC = () => {
    const {
        tasks,
        loading,
        addTask,
        updateTask,
        deleteTask,
        moveTask,
    } = useTaskStore();

    const [formVisible, setFormVisible] = useState<boolean>(false);
    const [searchText, setSearchText] = useState<string>('');
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');

    const tasksByStatus = useMemo((): Record<TaskStatus, Task[]> => {
        return COLUMNS.reduce((acc, column) => {
            acc[column.id] = tasks.filter(task => {
                const matchesStatus = task.status === column.id;
                const matchesSearch = !searchQuery ||
                    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    task.description?.toLowerCase().includes(searchQuery.toLowerCase());
                return matchesStatus && matchesSearch;
            });
            return acc;
        }, {} as Record<TaskStatus, Task[]>);
    }, [tasks, searchQuery]);

    const handleSearch = (value: string): void => {
        setSearchQuery(value);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value;
        setSearchText(value);
    };

    const handleDragEnd = (result: DropResult): void => {
        const { destination, source, draggableId } = result;

        if (!destination) return;

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const newStatus = destination.droppableId as TaskStatus;
        moveTask(draggableId, newStatus);
    };

    const handleCreateTask = (): void => {
        setEditingTask(null);
        setFormVisible(true);
    };

    const handleEditTask = (task: Task): void => {
        setEditingTask(task);
        setFormVisible(true);
    };

    const handleFormSubmit = async (values: TaskFormData): Promise<void> => {
        if (editingTask) {
            await updateTask(editingTask.id, values);
            setEditingTask(null);
        } else {
            await addTask(values);
        }
        setFormVisible(false);
    };

    const handleDeleteTask = async (taskId: string): Promise<void> => {
        await deleteTask(taskId);
    };

    const handleCloseForm = (): void => {
        setFormVisible(false);
        setEditingTask(null);
    };

    return (
        <div className="p-6 max-w-[1600px] mx-auto">
            <div className="mb-8 flex justify-between items-center flex-wrap gap-4">
                <div>
                    <Title level={2} className='m-0'>
                        Task Management Board
                    </Title>
                    <p className="mt-2 text-gray-600">
                        Organize and track your tasks with ease
                    </p>
                </div>

                <div className="flex gap-3">
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={handleCreateTask}
                        size="large"
                        disabled={loading}
                    >
                        Add Task
                    </Button>
                </div>
            </div>

            <div className='mb-4'>
                <Search
                    value={searchText}
                    id='search'
                    onChange={handleSearchChange}
                    name='searchText'
                    placeholder="Search tasks by title or description..."
                    onSearch={handleSearch}
                    allowClear
                />
            </div>

            <DragDropContext onDragEnd={handleDragEnd}>
                <Row gutter={[16, 16]}>
                    {COLUMNS.map((column) => (
                        <Col key={column.id} xs={24} sm={12} lg={4}>
                            <TaskColumn
                                status={column.id}
                                title={column.title}
                                color={column.color}
                                tasks={tasksByStatus[column.id] || []}
                                onEditTask={handleEditTask}
                                onDeleteTask={handleDeleteTask}
                                loading={loading}
                            />
                        </Col>
                    ))}
                </Row>
            </DragDropContext>

            <TaskForm
                visible={formVisible}
                task={editingTask}
                onClose={handleCloseForm}
                onSubmit={handleFormSubmit}
                loading={loading}
            />
        </div>
    );
};

export default TaskBoard;