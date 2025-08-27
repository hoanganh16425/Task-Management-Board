
'use client';

import {
  Avatar,
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Space
} from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import React, { useEffect } from 'react';
import { Task, TaskAssignee, TaskFormData, TaskPriority } from '../type/task';

const { TextArea } = Input;
const { Option } = Select;

interface TaskFormProps {
  visible: boolean;
  assignees: TaskAssignee[];
  task: Task | null;
  loading?: boolean;
  onClose: () => void;
  onSubmit: (values: TaskFormData) => Promise<void>;
}

interface FormValues {
  title: string;
  description?: string;
  status: string;
  priority: TaskPriority;
  assignee?: string;
  dueDate?: Dayjs | null;
}

interface StatusOption {
  value: string;
  label: string;
  emoji: string;
}

interface PriorityOption {
  value: TaskPriority;
  label: string;
  emoji: string;
}

const STATUS_OPTIONS: StatusOption[] = [
  { value: 'todo', label: 'To Do', emoji: '📋' },
  { value: 'in-progress', label: 'In Progress', emoji: '🚀' },
  { value: 'review', label: 'Review', emoji: '👀' },
  { value: 'done', label: 'Done', emoji: '✅' },
];

const PRIORITY_OPTIONS: PriorityOption[] = [
  { value: 'low', label: 'Low', emoji: '🟢' },
  { value: 'medium', label: 'Medium', emoji: '🟡' },
  { value: 'high', label: 'High', emoji: '🟠' },
  { value: 'urgent', label: 'Urgent', emoji: '🔴' },
];

const TaskForm: React.FC<TaskFormProps> = ({ 
  assignees,
  visible, 
  task, 
  loading = false,
  onClose, 
  onSubmit 
}) => {
  const [form] = Form.useForm<FormValues>();

  useEffect(() => {
    if (task && visible) {
      const formValues: FormValues = {
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        assignee: task.assignee?.id,
        dueDate: task.dueDate ? dayjs(task.dueDate) : null,
      };
      form.setFieldsValue(formValues);
    } else if (!task && visible) {
      form.resetFields();
    }
  }, [task, visible, form]);

  const handleSubmit = async (): Promise<void> => {
    try {
      const values = await form.validateFields();
      const taskFormData: TaskFormData = {
        title: values.title,
        description: values.description || '',
        status: values.status,
        priority: values.priority,
        assignee: values.assignee,
        dueDate: values.dueDate?.toISOString(),
      };
      
      await onSubmit(taskFormData);
      form.resetFields();
    } catch (error) {
      console.error('Form validation failed:', error);
    }
  };

  const handleCancel = (): void => {
    form.resetFields();
    onClose();
  };

  const disabledDate = (current: Dayjs): boolean => {
    return current && current < dayjs().startOf('day');
  };

  const renderStatusOption = (option: StatusOption): React.ReactNode => (
    <Option key={option.value} value={option.value}>
      {option.emoji} {option.label}
    </Option>
  );

  const renderPriorityOption = (option: PriorityOption): React.ReactNode => (
    <Option key={option.value} value={option.value}>
      {option.emoji} {option.label}
    </Option>
  );

  const renderAssigneeOption = (option: { id: string; name: string, avatar: string }): React.ReactNode => (
    <Option key={option.id} value={option.id} className='flex !items-center'>
      <Avatar size='small' src={option.avatar} className='!mr-2' />
      {option.name}
    </Option>
  );

  return (
    <Modal
      title={
        <Space>
          <span>{task ? 'Edit Task' : 'Create New Task'}</span>
        </Space>
      }
      open={visible}
      onCancel={handleCancel}
      confirmLoading={loading}
      width={600}
      footer={[
        <Button key="cancel" onClick={handleCancel} disabled={loading}>
          Cancel
        </Button>,
        <Button 
          key="submit" 
          type="primary" 
          onClick={handleSubmit}
          loading={loading}
        >
          {task ? 'Update Task' : 'Create Task'}
        </Button>,
      ]}
      destroyOnHidden
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          status: 'todo',
          priority: 'medium' as TaskPriority,
        }}
        requiredMark={false}
      >
        <Form.Item
          name="title"
          label="Task Title"
          rules={[
            { required: true, message: 'Please enter a task title' },
            { min: 3, message: 'Title must be at least 3 characters' },
            { max: 100, message: 'Title cannot exceed 100 characters' }
          ]}
        >
          <Input 
            placeholder="Enter a descriptive task title" 
            showCount 
            maxLength={100}
          />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[
            { max: 500, message: 'Description cannot exceed 500 characters' }
          ]}
        >
          <TextArea 
            rows={4} 
            placeholder="Provide additional details about this task..."
            showCount
            maxLength={500}
          />
        </Form.Item>

        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="status"
              label="Status"
              rules={[{ required: true, message: 'Please select a status' }]}
            >
              <Select placeholder="Select task status">
                {STATUS_OPTIONS.map(renderStatusOption)}
              </Select>
            </Form.Item>
          </Col>
          
          <Col xs={24} sm={12}>
            <Form.Item
              name="priority"
              label="Priority"
              rules={[{ required: true, message: 'Please select a priority' }]}
            >
              <Select placeholder="Select priority level">
                {PRIORITY_OPTIONS.map(renderPriorityOption)}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="assignee"
              label="Assignee"
              rules={[
                { max: 50, message: 'Assignee name cannot exceed 50 characters' }
              ]}
            >
              <Select placeholder="Select priority level" >
                {assignees.map(renderAssigneeOption)}
              </Select>
            </Form.Item>
          </Col>
          
          <Col xs={24} sm={12}>
            <Form.Item
              name="dueDate"
              label="Due Date"
            >
              <DatePicker 
                style={{ width: '100%' }}
                placeholder="Select due date"
                disabledDate={disabledDate}
                format="MMMM D, YYYY"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default TaskForm;