'use client';

import React from 'react';
import { Card, Typography, Badge, Space, Empty } from 'antd';
import { Droppable } from '@hello-pangea/dnd';
import { TaskStatus, Task } from '../type/task';
import TaskCard from './TaskCard';

const { Title } = Typography;

interface TaskColumnProps {
  status: TaskStatus;
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
  onDeleteTask
}) => {
  return (
    <Card
      title={
        <Space>
          <Title level={5} style={{ margin: "0px"}}>
            {title}
          </Title>
          <Badge
            count={tasks.length}
            style={{ backgroundColor: color }}
            showZero
          />
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
    </Card>
  );
};

export default TaskColumn;