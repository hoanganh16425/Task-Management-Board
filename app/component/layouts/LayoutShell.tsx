import React from 'react';
import { Layout } from 'antd';

interface LayoutShellProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  header: React.ReactNode;
}

const LayoutShell: React.FC<LayoutShellProps> = ({ children, sidebar, header }) => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      {sidebar}
      <Layout>
        {header}
        <Layout.Content style={{
          margin: '0',
          backgroundColor: '#f5f5f5',
          minHeight: 'calc(100vh - 64px)',
          overflow: 'auto'
        }}>
          {children}
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default LayoutShell;