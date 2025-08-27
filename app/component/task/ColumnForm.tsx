
'use client';

import {
    Button,
    ColorPicker,
    Form,
    Input,
    Modal,
    Space
} from 'antd';
import React from 'react';
import { ColumnFormData, TaskAssignee } from '../../type/task';

interface TaskFormProps {
  visible: boolean;
  assignees: TaskAssignee[];
  loading?: boolean;
  onClose: () => void;
  onCreateColumn: (values: ColumnFormData) => Promise<void>;
}


const ColumnForm: React.FC<TaskFormProps> = ({ 
  visible, 
  loading = false,
  onClose, 
  onCreateColumn 
}) => {
  const [form] = Form.useForm<ColumnFormData>();

  const handleSubmit = async (): Promise<void> => {
    try {
      const values = await form.validateFields();
      const columnFormData: ColumnFormData = {
        title: values.title,
        color: values.color,
      };
      await onCreateColumn(columnFormData);
      form.resetFields();
    } catch (error) {
      console.error('Form validation failed:', error);
    }
  };

  const handleCancel = (): void => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title={
        <Space>
          <span>Create New Column</span>
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
          Create Column
        </Button>,
      ]}
      destroyOnHidden
    >
      <Form
        form={form}
        layout="vertical"
        requiredMark={false}
      >
        <Form.Item
          name="title"
          label="Column Title"
          rules={[
            { required: true, message: 'Please enter a column title' },
            { min: 3, message: 'Title must be at least 3 characters' },
            { max: 100, message: 'Title cannot exceed 100 characters' }
          ]}
        >
          <Input 
            placeholder="Enter a descriptive column title" 
            showCount 
            maxLength={100}
          />
        </Form.Item>

        <Form.Item
          name="color"
          label="color"
          initialValue="#1677ff"
          getValueFromEvent={(_, hex) => hex}
        >
          <ColorPicker />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ColumnForm;