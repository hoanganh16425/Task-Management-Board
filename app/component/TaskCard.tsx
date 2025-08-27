'use client';

import {
  CalendarOutlined,
  ClockCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  UserOutlined
} from '@ant-design/icons';
import { Draggable } from '@hello-pangea/dnd';
import { Avatar, Button, Card, Modal, Space, Tag, Tooltip, Typography } from 'antd';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React, { useState } from 'react';
import { Task, TaskPriority } from '../type/task';

dayjs.extend(relativeTime);

const { Text } = Typography;

interface TaskCardProps {
  task: Task;
  index: number;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

const priorityColors: Record<TaskPriority, string> = {
  low: '#52c41a',
  medium: '#1890ff',
  high: '#faad14',
  urgent: '#ff4d4f',
};

const TaskCard: React.FC<TaskCardProps> = ({ task, index, onEdit, onDelete }) => {

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const isOverdue = task.dueDate && dayjs(task.dueDate).isBefore(dayjs());

  return (
    <>
      <Draggable draggableId={task.id} index={index} >
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{
              ...provided.draggableProps.style,
              marginBottom: '12px',
            }}
          >
            <Card
              size="small"
              hoverable
              className={`task-card ${snapshot.isDragging ? 'dragging' : ''}`}
              style={{
                backgroundColor: snapshot.isDragging ? '#f6ffed' : '#fff',
                boxShadow: snapshot.isDragging
                  ? '0 8px 24px rgba(0,0,0,0.2)'
                  : '0 2px 8px rgba(0,0,0,0.1)',
                transform: snapshot.isDragging ? 'rotate(3deg)' : 'none',
                transition: snapshot.isDragging ? 'none' : 'all 0.2s ease',
                border: snapshot.isDragging ? '2px solid #52c41a' : '1px solid #d9d9d9',
              }}
              actions={[
                <Button
                  key="more"
                  type="text"
                  icon={<EditOutlined />}
                  size="small"
                  color="primary"
                  variant='link'
                  onClick={() => onEdit(task)}
                />,
                <Button
                  key="more"
                  type="text"
                  icon={<DeleteOutlined />}
                  size="small"
                  variant='link'
                  color='red'
                  onClick={() => setIsModalOpen(true)}
                />
              ]}
            >
              <Space direction="vertical" size="small" style={{ width: '100%' }}>
                <div className="flex justify-between items-start gap-4">
                  <Text strong className="text-sm flex-1 text-ellipsis overflow-hidden max-w-[80px] whitespace-nowrap">
                    {task.title}
                  </Text>
                  <Tag color={priorityColors[task.priority]}>
                    {task.priority.toUpperCase()}
                  </Tag>
                </div>

                {task.description && (
                  <p
                    className="m-0 text-xs text-[#666] leading-[1.4]"
                    title={task.description}
                  >
                    {task.description}
                  </p>
                )}

                <div className="flex justify-between flex-col  flex-wrap gap-1">
                  {task.assignee && (
                    <Space size="small">
                      <Avatar size={16} src={task.assignee.avatar} icon={<UserOutlined />} />
                      <Text className="text-xs">{task.assignee?.name}</Text>
                    </Space>
                  )}

                  {task.dueDate ? (
                    <Tooltip title={dayjs(task.dueDate).format('MMMM D, YYYY')}>
                      <Space size="small">
                        <CalendarOutlined
                          className={`text-[11px] ${isOverdue ? 'text-[#ff4d4f]' : 'text-[#666]'}`}
                        />
                        <Text
                          className={`text-[11px] ${isOverdue ? 'text-[#ff4d4f]' : 'text-[#666]'}`}
                        >
                          {dayjs(task.dueDate).fromNow()}
                        </Text>
                      </Space>
                    </Tooltip>
                  ) : (
                    <Space size="small">
                      <Text className="text-[11px] text-[#666]">
                        No Due Date
                      </Text>
                    </Space>
                  )}
                </div>

                <div className="flex justify-between items-center mt-1 pt-1 border-t border-[#f0f0f0]">
                  <Tooltip title={`Created ${dayjs(task.createdAt).fromNow()}`}>
                    <Space size="small">
                      <ClockCircleOutlined className="text-[10px] text-[#999]" />
                      <Text className="text-[10px] text-[#999]">
                        {dayjs(task.createdAt).fromNow()}
                      </Text>
                    </Space>
                  </Tooltip>
                </div>
              </Space>
            </Card>
          </div>
        )}
      </Draggable>
      <Modal
        title="Confirm Deletion"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        okText='Yes'
        okType='danger'
        onOk={() => onDelete(task.id)}
        onCancel={() => setIsModalOpen(false)}
      >
        Are you sure to delete this task?
      </Modal>
    </>

  );
};

export default TaskCard;