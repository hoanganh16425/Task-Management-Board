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
            }}
            width={260}
            collapsedWidth={80}
        >
            {/* Logo */}
            <div style={{
                height: '64px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: collapsed ? 'center' : 'flex-start',
                padding: collapsed ? '0' : '0 24px',
                borderBottom: '1px solid #303030'
            }}>
                {collapsed ? (
                    <div style={{
                        width: '32px',
                        height: '32px',
                        backgroundColor: '#1890ff',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: 'bold'
                    }}>
                        TF
                    </div>
                ) : (
                    <Space>
                        <div style={{
                            width: '32px',
                            height: '32px',
                            backgroundColor: '#1890ff',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontWeight: 'bold'
                        }}>
                            TF
                        </div>
                        <Title level={4} style={{ margin: 0, color: 'white' }}>
                            TaskFlow
                        </Title>
                    </Space>
                )}
            </div>

            {/* Toggle Button */}
            <div style={{ padding: '16px', borderBottom: '1px solid #303030' }}>
                <Button
                    type="text"
                    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    onClick={toggleCollapse}
                    style={{
                        fontSize: '16px',
                        width: '100%',
                        height: '40px',
                        color: 'white'
                    }}
                />
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