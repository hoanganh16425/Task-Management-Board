'use client';

import React from 'react';
import { App, ConfigProvider, theme } from 'antd';
import { StyleProvider } from '@ant-design/cssinjs';
import { AntdRegistry } from '@ant-design/nextjs-registry';

interface AntdProviderProps {
  children: React.ReactNode;
}

const AntdProvider: React.FC<AntdProviderProps> = ({ children }) => {
  return (
    <StyleProvider hashPriority="high">
      <ConfigProvider
        theme={{
          algorithm: theme.defaultAlgorithm,
          token: {
            colorPrimary: '#1890ff',
            borderRadius: 8,
          },
          components: {
            Layout: {
              headerBg: '#ffffff',
            },
            Card: {
              borderRadiusLG: 12,
            },
          },
        }}
      >
        <AntdRegistry>
          <App>
            {children}
          </App>
        </AntdRegistry>
      </ConfigProvider>
    </StyleProvider>
  );
};

export default AntdProvider;