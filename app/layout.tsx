import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import AntdProvider from './component/providers/AntdProvider';
import StoreProvider from './component/providers/StoreProvider';
import '@ant-design/v5-patch-for-react-19';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TaskFlow - Modern Task Management',
  description: 'A powerful task management application with drag-and-drop functionality',
  keywords: ['task management', 'kanban', 'productivity', 'project management'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <AntdProvider>
            {children}
          </AntdProvider>
        </StoreProvider>
      </body>
    </html>
  );
}