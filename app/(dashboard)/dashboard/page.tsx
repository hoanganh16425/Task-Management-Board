import RecentTask from '@/app/component/dasboard/RecentTask';
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  ProjectOutlined,
  TeamOutlined,
  TrophyOutlined
} from '@ant-design/icons';
import { Card, Col, Progress, Row, Space, Statistic } from 'antd';
import React from 'react';

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
              <p>Website Redesign</p>
              <Progress percent={75} status="active" />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <p>Mobile App Development</p>
              <Progress percent={45} />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <p>Database Migration</p>
              <Progress percent={90} status="active" />
            </div>
            <div>
              <p>API Integration</p>
              <Progress percent={30} />
            </div>
          </Card>
        </Col>

        {/* Recent Tasks */}
        <Col xs={24} lg={12}>
          <RecentTask></RecentTask>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardContent;