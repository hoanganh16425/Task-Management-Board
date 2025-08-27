'use client';

import { Droppable } from '@hello-pangea/dnd';
import { Badge, Card, Empty, Space, Typography } from 'antd';
import React, { useState } from 'react';
import { Task } from '../../type/task';
import TaskCard from './TaskCard';
import { DeleteOutlined } from '@ant-design/icons';
import { useTaskStore } from '../../stores/taskStore';
import ConfirmDialog from '../shares/confirmDialog';

const { Title } = Typography;

interface TaskColumnProps {
  status: string;
  title: string;
  color: string;
  tasks: Task[];
  loading?: boolean;
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
}

const TaskColumn: React.FC<TaskColumnProps> = ({
  status,
  title,
  color,
  tasks,
  loading = false,
  onEditTask,
  onDeleteTask,
}) => {
  const { deleteColumn } = useTaskStore();

  const [isOpendeleteColumn, setisOpenDeleteColumn] = useState<boolean>(false);

  const onDeleteColumn = (): void => {
    setisOpenDeleteColumn(true);
  };

  const handleDeleteColumn = async (values: string): Promise<void> => {
    deleteColumn(values);
    setisOpenDeleteColumn(false);
  };

  return (
    <Card
      title={
        <Space className='flex items-center justify-between w-full'>
          <div className='flex items-center justify-between w-full align-middle gap-2'>
            <Title level={5} style={{ margin: "0px" }}>
              {title}
            </Title>
            <Badge
              count={tasks.length}
              style={{ backgroundColor: color }}
              showZero
            />
          </div>
          <DeleteOutlined className='!text-red-500' onClick={() => onDeleteColumn()} />
        </Space>
      }
      className="h-[600px] bg-[#fafafa]"
      styles={{
        body: {
          padding: '12px',
          height: 'calc(100% - 57px)',
          overflow: 'hidden'
        }
      }}
      loading={loading}
    >
      <Droppable droppableId={status}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`h-full overflow-y-auto rounded-lg p-2 transition-colors duration-200 ease-in-out ${snapshot.isDraggingOver ? 'bg-[#e6f7ff]' : 'bg-transparent'
              }`}
          >
            {tasks.length === 0 ? (
              <Empty
                description={`No ${title.toLowerCase()} tasks`}
                className="mt-[50px]"
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            ) : (
              tasks.map((task, index) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  index={index}
                  onEdit={onEditTask}
                  onDelete={onDeleteTask}
                />
              ))
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <ConfirmDialog
        title="Confirm Deletion"
        okText="Yes"
        okType="danger"
        confirmText="Are you sure to delete this column?"
        isModalOpen={isOpendeleteColumn}
        onConfirm={() => handleDeleteColumn(status)}
        onClose={() => setisOpenDeleteColumn(false)}
      />    
    </Card>
  );
};

export default TaskColumn;