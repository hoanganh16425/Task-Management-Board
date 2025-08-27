'use client';

import { PlusOutlined } from '@ant-design/icons';
import { DragDropContext, Draggable, Droppable, DropResult } from '@hello-pangea/dnd';
import { Button, Input, Typography } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { TaskBoardDragType } from '../../constants/task-board.constant';
import { useTaskStore } from '../../stores/taskStore';
import { ColumnFormData, Task, TaskAssignee, TaskFormData } from '../../type/task';
import ColumnForm from './ColumnForm';
import TaskColumn from './TaskCollumn';
import TaskForm from './TaskForm';

const { Title } = Typography;
const { Search } = Input;

const TaskBoard: React.FC = () => {
    const {
        tasks,
        loading,
        columns,
        addTask,
        updateTask,
        deleteTask,
        moveTask,
        addColumn,
        moveColumn,
    } = useTaskStore();

    const [formVisible, setFormVisible] = useState<boolean>(false);
    const [searchText, setSearchText] = useState<string>('');
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [isOpenCreateColumn, setisOpenCreateColumn] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>('');

    const [assignees, setAssignees] = React.useState<TaskAssignee[]>([]);

    useEffect(() => {
        const fetchAsignees = async () => {
            const response = await fetch('/api/assignee');
            const data = await response.json();
            setAssignees(data);
        }
        fetchAsignees();
    }, []);

    const tasksByStatus = useMemo((): Record<string, Task[]> => {
        return columns.reduce((acc, column) => {
            acc[column.id] = tasks.filter(task => {
                const matchesStatus = task.status === column.id;
                const matchesSearch = !searchQuery ||
                    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    task.description?.toLowerCase().includes(searchQuery.toLowerCase());
                return matchesStatus && matchesSearch;
            });
            return acc;
        }, {} as Record<string, Task[]>);
    }, [tasks, searchQuery, columns]);

    const handleSearch = (value: string): void => {
        setSearchQuery(value);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value;
        setSearchText(value);
    };

    const handleDragEnd = (result: DropResult): void => {
        const { destination, source, draggableId, type } = result;

        if (!destination) return;
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const newStatus = destination.droppableId as string;
        if (type === TaskBoardDragType.COLUMN) {
            moveColumn(source.index, destination.index);
        } else {
            moveTask(draggableId, newStatus);
        }
    };

    const onCreateColumn = (): void => {
        setisOpenCreateColumn(true);
    };

    const handleCreateColumn = async (values: ColumnFormData): Promise<void> => {
        addColumn({ ...values, id: values.title });
        setisOpenCreateColumn(false);
    };

    const handleCancelCreateColumn = (): void => {
        setisOpenCreateColumn(false);
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
        const updateValues = {
            ...values,
            assignee: assignees.find(assignee => assignee.id === values.assignee)
        }
        if (editingTask) {
            await updateTask(editingTask.id, updateValues);
            setEditingTask(null);
        } else {
            await addTask(updateValues);
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
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={onCreateColumn}
                        size="large"
                        disabled={loading}
                    >
                        Add Column
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
                <Droppable
                    droppableId="columns"
                    direction="horizontal"
                    type='COLUMN'
                >
                    {(provided) => (
                        <div
                            className='flex gap-4 overflow-x-auto pb-2'
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {columns.map((column, index) => (
                                <Draggable
                                    draggableId={column.id.toString()}
                                    index={index}
                                    key={column.id}
                                >
                                    {(provided) => (
                                        <div
                                            className='min-w-[300px] max-w-[400px] w-full'
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            <TaskColumn
                                                status={column.id}
                                                title={column.title}
                                                color={column.color}
                                                tasks={tasksByStatus[column.id] || []}
                                                onEditTask={handleEditTask}
                                                onDeleteTask={handleDeleteTask}
                                                loading={loading}
                                            />
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                        </div>)}
                </Droppable>
            </DragDropContext>

            <TaskForm
                visible={formVisible}
                task={editingTask}
                onClose={handleCloseForm}
                onSubmit={handleFormSubmit}
                loading={loading}
                assignees={assignees}
            />
            <ColumnForm
                visible={isOpenCreateColumn}
                onClose={handleCancelCreateColumn}
                onCreateColumn={handleCreateColumn}
                loading={loading}
                assignees={assignees}
            />
        </div>
    );
};

export default TaskBoard;