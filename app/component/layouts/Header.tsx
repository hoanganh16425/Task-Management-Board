'use client';

import React from 'react';
import { Layout, Avatar, Dropdown, Button, Badge } from 'antd';
import {
    UserOutlined,
    BellOutlined,
    LogoutOutlined,
    ProfileOutlined,
    QuestionCircleOutlined,
} from '@ant-design/icons';
import { useAuthStore } from '@/app/stores/authStore';

const { Header } = Layout;

interface ClientHeaderProps {
    title?: string;
    subtitle?: string;
}

const ClientHeader: React.FC<ClientHeaderProps> = ({
    title = "Task Management Board",
}) => {
    const { user, logout } = useAuthStore();

    const handleLogout = () => {
        logout();
    };

    const userMenuItems = [
        {
            key: 'profile',
            icon: <UserOutlined />,
            label: 'Profile',
            onClick: () => {
                console.log('Navigate to profile');
            },
        },
        {
            key: 'account',
            icon: <ProfileOutlined />,
            label: 'Account Settings',
            onClick: () => {
                console.log('Navigate to account settings');
            },
        },
        {
            type: 'divider' as const,
        },
        {
            key: 'help',
            icon: <QuestionCircleOutlined />,
            label: 'Help & Support',
            onClick: () => {
                console.log('Navigate to help');
            },
        },
        {
            key: 'logout',
            icon: <LogoutOutlined />,
            label: 'Sign Out',
            danger: true,
            onClick: handleLogout,
        },
    ];

    return (
        <Header className="px-6 bg-white shadow-sm flex items-center justify-between sticky top-0 z-[100]">
            <div>
                <h4 className="font-semibold text-lg">{title}</h4>
            </div>

            <div className="flex items-center gap-4">
                <Badge count={3} size="small">
                    <Button
                        type="text"
                        icon={<BellOutlined />}
                        className="w-10 h-10 flex items-center justify-center"
                    />
                </Badge>

                {user && (
                    <Dropdown
                        menu={{ items: userMenuItems }}
                        trigger={["click"]}
                        placement="bottomRight"
                    >
                        <Button
                            type="text"
                            className="h-10 px-2 flex items-center gap-2"
                        >
                            <Avatar
                                size="small"
                                className="!bg-blue-500"
                                src={user.avatar}
                            >
                                {!user.avatar && user.name?.charAt(0)}
                            </Avatar>
                            <span>{user.name}</span>
                        </Button>
                    </Dropdown>
                )}
            </div>
        </Header>

    );
};

export default ClientHeader;