'use client';

import React from 'react';
import { Row, Col, Card, Statistic, Progress, Typography, Space, Avatar, List } from 'antd';
import { 
  ProjectOutlined, 
  CheckCircleOutlined, 
  ClockCircleOutlined, 
  TeamOutlined,
  TrophyOutlined,
  CalendarOutlined
} from '@ant-design/icons';

const { Text } = Typography;

const DashboardContent: React.FC = () => {
  const stats = [
    {
      title: 'Total Tasks',
      value: 47,
      icon: <ProjectOutlined style={{ color: '#1890ff' }} />,
      color: '#1890ff'
    },
    {
      title: 'Completed',
      value: 23,
      icon: <CheckCircleOutlined style={{ color: '#52c41a' }} />,
      color: '#52c41a'
    },
    {
      title: 'In Progress',
      value: 18,
      icon: <ClockCircleOutlined style={{ color: '#faad14' }} />,
      color: '#faad14'
    },
    {
      title: 'Team Members',
      value: 8,
      icon: <TeamOutlined style={{ color: '#722ed1' }} />,
      color: '#722ed1'
    },
  ];

  const recentTasks = [
    { id: 1, title: 'Update user interface design', assignee: 'Alice Johnson', status: 'completed' },
    { id: 2, title: 'Implement authentication system', assignee: 'Bob Smith', status: 'in-progress' },
    { id: 3, title: 'Write API documentation', assignee: 'Carol White', status: 'pending' },
    { id: 4, title: 'Review code changes', assignee: 'David Brown', status: 'in-progress' },
  ];

  return (
    <div style={{ padding: '24px' }}>
      {/* Stats Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        {stats.map((stat, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card>
              <Statistic
                title={stat.title}
                value={stat.value}
                prefix={stat.icon}
                valueStyle={{ color: stat.color }}
              />
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[16, 16]}>
        {/* Project Progress */}
        <Col xs={24} lg={12}>
          <Card 
            title={
              <Space>
                <TrophyOutlined />
                <span>Project Progress</span>
              </Space>
            }
          >
            <div style={{ marginBottom: '16px' }}>
              <Text strong>Website Redesign</Text>
              <Progress percent={75} status="active" />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <Text strong>Mobile App Development</Text>
              <Progress percent={45} />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <Text strong>Database Migration</Text>
              <Progress percent={90} status="active" />
            </div>
            <div>
              <Text strong>API Integration</Text>
              <Progress percent={30} />
            </div>
          </Card>
        </Col>

        {/* Recent Tasks */}
        <Col xs={24} lg={12}>
          <Card 
            title={
              <Space>
                <CalendarOutlined />
                <span>Recent Tasks</span>
              </Space>
            }
          >
            <List
              itemLayout="horizontal"
              dataSource={recentTasks}
              renderItem={(task) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar style={{ backgroundColor: '#1890ff' }}>{task.assignee.charAt(0)}</Avatar>}
                    title={<Text>{task.title}</Text>}
                    description={
                      <Space>
                        <Text type="secondary">{task.assignee}</Text>
                        <span style={{ 
                          padding: '2px 8px', 
                          borderRadius: '4px', 
                          fontSize: '11px',
                          backgroundColor: task.status === 'completed' ? '#f6ffed' : 
                                          task.status === 'in-progress' ? '#e6f7ff' : '#fff7e6',
                          color: task.status === 'completed' ? '#52c41a' : 
                                 task.status === 'in-progress' ? '#1890ff' : '#faad14'
                        }}>
                          {task.status.replace('-', ' ').toUpperCase()}
                        </span>
                      </Space>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardContent;