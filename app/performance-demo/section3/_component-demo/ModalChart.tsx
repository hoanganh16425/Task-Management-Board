
import { Tabs, Modal, Spin } from 'antd';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { CheckCircleOutlined, ClockCircleOutlined, ProjectOutlined, TeamOutlined, BarChartOutlined, PieChartOutlined, LineChartOutlined } from '@ant-design/icons';

import PieChartDemo from './ChartDemo/PieChartDemo';
import BarChartDemo from './ChartDemo/BarChartDemo';
import LineChartDemo from './ChartDemo/LineChartDemo';


const DynamicPieChart = dynamic(() => import('./ChartDemo/PieChartDemo'), {
  loading: () => <Spin style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }} />,
});
const DynamicBarChart = dynamic(() => import('./ChartDemo/BarChartDemo'), {
  loading: () => <Spin style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }} />,
});
const DynamicLineChart = dynamic(() => import('./ChartDemo/LineChartDemo'), {
  loading: () => <Spin style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }} />,
});


type ModalChartDemoProps = {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  type?: string;
};

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



function ModalChartDemo({ isModalOpen, setIsModalOpen, type }: ModalChartDemoProps) {
  const [activeTab, setActiveTab] = useState('pie');

  return (
    <Modal
      title="Chart Data"
      open={isModalOpen}
      centered
      onOk={() => setIsModalOpen(false)}
      onCancel={() => setIsModalOpen(false)}
      width={700}
    >
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={[
          {
            key: 'pie',
            label: <span><PieChartOutlined /> Pie Chart</span>,
            children:
            type === 'direct' ? <PieChartDemo stats={stats} /> : <DynamicPieChart stats={stats} />
          },
          {
            key: 'bar',
            label: <span><BarChartOutlined /> Bar Chart</span>,
            children:
            type === 'direct' ? <BarChartDemo stats={stats} /> : <DynamicBarChart stats={stats} />,
          },
          {
            key: 'line',
            label: <span><LineChartOutlined /> Line Chart</span>,
            children: type === 'direct' ? <LineChartDemo stats={stats} /> : <DynamicLineChart stats={stats} />,
          },
        ]}
      />
    </Modal>
  );
}

export default ModalChartDemo;
