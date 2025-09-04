'use client'
import React from 'react';
import { Layout } from 'antd';
import PerformanceTestGuide from '../shares/PerformanceTestGuide';

interface LayoutShellProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  header: React.ReactNode;
}

const LayoutShell: React.FC<LayoutShellProps> = ({ children, sidebar, header }) => {
  return (
    <Layout style={{ minHeight: '100vh', flexDirection: 'row' }}>
      {sidebar}
      <Layout>
        {header}
        <Layout.Content style={{
          margin: '0',
          backgroundColor: '#f5f5f5',
          maxHeight: 'calc(100vh - 64px)',
          overflow: 'auto'
        }}>
          {children}
        </Layout.Content>
        <PerformanceTestGuide />
      </Layout>
    </Layout>
  );
};

export default LayoutShell;