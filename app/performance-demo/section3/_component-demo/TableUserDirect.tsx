'use client';

import {
    SearchOutlined,
    UserOutlined
} from '@ant-design/icons';
import {
    Avatar,
    Card,
    Col,
    Divider,
    Input,
    Row,
    Space,
    Table,
    Tag,
    Typography
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { memo, useEffect, useMemo, useState } from 'react';

// Import Zustand store
import {
    User,
    useUserStore
} from '@/app/stores/userStore';
import { useShallow } from 'zustand/shallow';
import ModalChartDemo from './ModalChart';

const { Title } = Typography;

const UserAvatar = memo(({ user }: { user: User }) => (
    <Space>
        <Avatar
            src={user.avatar}
            icon={<UserOutlined />}
            size="large"
        />
        <div>
            <div className="font-medium">
                {user.firstName} {user.lastName}
            </div>
            <div className="text-gray-500 text-sm">
                {user.email}
            </div>
        </div>
    </Space>
));
UserAvatar.displayName = 'UserAvatar';

const roleColors = { admin: 'red', moderator: 'orange', user: 'blue' };

type RoleType = keyof typeof roleColors;

const RoleTag = memo(({ role }: { role: RoleType | string }) => (
    <Tag color={roleColors[role as RoleType] || 'default'}>
        {role.toUpperCase()}
    </Tag>
));

RoleTag.displayName = 'RoleTag';

const StatusTag = memo(({ status }: { status: string }) => {
    return (
        <Tag color={status === 'active' ? 'green' : 'default'}>
            {status.toUpperCase()}
        </Tag>
    );
});
StatusTag.displayName = 'StatusTag';


export default function TableUserDirect() {
    const { filteredUsers, filters, loading } = useUserStore(useShallow((state) => ({
        filteredUsers: state.filteredUsers,
        filters: state.filters,
        loading: state.loading,
    })));
    const { 
        loadUsers,
        setFilters,
    } = useUserStore();

    const [isModalOpen, setIsModalOpen] = useState(false);


    useEffect(() => {
        loadUsers();
    }, [loadUsers]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters({ search: e.target.value });
    };

    const UserRow = ({ user }: { user: User }) => {
        return <UserAvatar user={user} />;
    };


    UserRow.displayName = 'UserRow';

    const columns: ColumnsType<User> = useMemo(() => [
        {
            title: 'User',
            dataIndex: 'firstName',
            key: 'user',
            width: 250,
            render: (_, record) => <UserRow user={record} />,
        },
        {
            title: 'Role',
            dataIndex: 'role',
            align: 'center',
            key: 'role',
            render: (role) => <RoleTag role={role} />,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            align: 'center',
            key: 'status',
            render: (status) => <StatusTag status={status} />,
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            ellipsis: true,
        },
        {
            title: 'Created Date',
            dataIndex: 'createdAt',
            key: 'createdAt',
            align: 'center',
            render: (date) => new Date(date).toLocaleDateString(),
        },
    ], []);



    const paginationConfig = useMemo(() => ({
        total: filteredUsers.length,
        pageSize: 10,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: (total: number, range: [number, number]) =>
            `${range[0]}-${range[1]} of ${total} users`,
    }), [filteredUsers.length]);

    return (
        <div className="p-6">
            <Card>
                <div className="mb-6">
                    <Title level={2} className="!mb-2">
                        User Management
                    </Title>
                    <p className="text-gray-600">
                        Manage and organize your users
                    </p>
                </div>

                <Row gutter={16} className="mb-4">
                    <Col xs={24} sm={12} md={6}>
                        <Input
                            placeholder="Search users..."
                            prefix={<SearchOutlined />}
                            value={filters.search}
                            onChange={handleSearchChange}
                            allowClear
                        />
                    </Col>
                </Row>
                <div onClick={() => setIsModalOpen(true)} style={{ cursor: 'pointer', color: '#1890ff', marginBottom: 16, textAlign: 'right' }}>
                    Show on Chart
                </div>

                <Divider />
                Direct

                <Table
                    columns={columns}
                    dataSource={filteredUsers}
                    rowKey="id"
                    loading={loading}
                    pagination={paginationConfig}
                    scroll={{ x: 800 }}
                />
            </Card>
            {isModalOpen && <ModalChartDemo isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} type='direct'/>}

        </div>
    );
}