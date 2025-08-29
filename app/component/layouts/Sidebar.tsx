'use client';

import React, { useState } from 'react';
import { Layout, Menu, Typography, Space, Avatar, Button } from 'antd';
import {
    DashboardOutlined,
    ProjectOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/app/stores/authStore';

const { Sider } = Layout;
const { Title, Text } = Typography;

interface ClientSidebarProps {
    onCollapseChange?: (collapsed: boolean) => void;
}

const ClientSidebar: React.FC<ClientSidebarProps> = ({ onCollapseChange }) => {
    const [collapsed, setCollapsed] = useState(false);
    const pathname = usePathname();
    const { user } = useAuthStore();

    const menuItems = [
        {
            key: '/dashboard',
            icon: <DashboardOutlined />,
            label: <Link href="/dashboard">Dashboard</Link>,
        },
        {
            key: '/task-board',
            icon: <ProjectOutlined />,
            label: <Link href="/task-board">Task Board</Link>,
        }
    ];

    const toggleCollapse = () => {
        const newCollapsed = !collapsed;
        setCollapsed(newCollapsed);
        onCollapseChange?.(newCollapsed);
    };

    return (
        <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            style={{
                backgroundColor: '#001529',
                boxShadow: '2px 0 8px rgba(0,0,0,0.15)',
                maxHeight: '100vh'
            }}
            width={260}
            breakpoint="sm"
            onBreakpoint={(broken) => {
                setCollapsed(broken);
            }}
            collapsedWidth={60}
        >
            {/* Logo */}
            <div style={{
                height: '64px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: collapsed ? 'center' : 'space-between',
                padding: collapsed ? '0' : '0 24px',
                borderBottom: '1px solid #303030'
            }}>

                <Title level={4} style={{
                    margin: 0,
                    color: 'white',
                    opacity: collapsed ? 0 : 1,
                    transition: collapsed ? "none" : "opacity 0.5s ease-in",
                }}>
                    TaskFlow
                </Title>
                {/* Toggle Button */}
                <div style={{ padding: '16px' }}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={toggleCollapse}
                        style={{
                            fontSize: '16px',
                            width: '100%',
                            height: '40px',
                            color: 'white',
                            transform: collapsed ? "translateX(-10px)" : "",
                        }}
                    />
                </div>
            </div>

            <Menu
                theme="dark"
                mode="inline"
                selectedKeys={[pathname]}
                style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    marginTop: '16px'
                }}
                items={menuItems}
            />

            {!collapsed && user && (
                <div style={{
                    position: 'absolute',
                    bottom: '16px',
                    left: '16px',
                    right: '16px',
                    padding: '16px',
                    backgroundColor: '#1f1f1f',
                    borderRadius: '8px',
                    border: '1px solid #303030'
                }}>
                    <Space>
                        <Avatar
                            size="small"
                            style={{ backgroundColor: '#1890ff' }}
                            src={user.avatar}
                        >
                            {!user.avatar && user.name?.charAt(0)}
                        </Avatar>
                        <div>
                            <Text style={{ color: 'white', display: 'block', fontSize: '14px' }}>
                                {user.name}
                            </Text>
                            <Text style={{ color: '#999', fontSize: '12px' }}>
                                {user.role}
                            </Text>
                        </div>
                    </Space>
                </div>
            )}
        </Sider>
    );
};

export default ClientSidebar;