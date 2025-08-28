import '@ant-design/v5-patch-for-react-19';
import 'antd/dist/reset.css';
import type { Metadata } from 'next';
import AntdProvider from './component/providers/AntdProvider';
import './globals.css';
export const metadata: Metadata = {
  title: 'TaskFlow - Modern Task Management',
  description: 'A powerful task management application with drag-and-drop functionality',
  keywords: ['task management', 'kanban', 'productivity', 'project management'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
          <AntdProvider>
            {children}
          </AntdProvider>
      </body>
    </html>
  );
}
