
'use client';

import {
    ClearOutlined,
    DeleteOutlined,
    EditOutlined,
    MailOutlined,
    PhoneOutlined,
    ReloadOutlined,
    SearchOutlined,
    UserOutlined
} from '@ant-design/icons';
import {
    App,
    Avatar,
    Button,
    Card,
    Col,
    Divider,
    Form,
    Input,
    Modal,
    Popconfirm,
    Row,
    Select,
    Space,
    Table,
    Tag,
    Typography
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';

// Import Zustand store
import {
    User,
    useUserStore
} from '@/app/stores/userStore';
import { useShallow } from 'zustand/shallow';

const { Title } = Typography;
const { Option } = Select;

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


const UserActionRow = memo(({ user, onEdit, onDelete }: { user: User; onEdit: (user: User) => void; onDelete: (userId: string) => void }) => {
    const handleEdit = useCallback(() => onEdit(user), [user, onEdit]);
    const handleDelete = useCallback(() => onDelete(user.id), [user.id, onDelete]);
    return (
        <Space>
            <Button
                type="text"
                icon={<EditOutlined />}
                onClick={handleEdit}
                className="text-blue-500 hover:text-blue-700"
            />
            <Popconfirm
                title="Are you sure you want to delete this user?"
                onConfirm={handleDelete}
                okText="Yes"
                cancelText="No"
            >
                <Button
                    type="text"
                    icon={<DeleteOutlined />}
                    className="text-red-500 hover:text-red-700"
                />
            </Popconfirm>
        </Space>
    );
});
UserActionRow.displayName = 'UserActionRow';

const ActionButtons = memo(({
    user,
    onEdit,
    onDelete
}: {
    user: User;
    onEdit: (user: User) => void;
    onDelete: (userId: string) => void;
}) => {
    return <UserActionRow user={user} onEdit={onEdit} onDelete={onDelete} />;
});
ActionButtons.displayName = 'ActionButtons';

export default function TableUserFilterOptimized() {
    function BalanceCalculation(user: User) {
        let total = 0;
        for (let i = 0; i < 100000; i++) {
            total += (user.firstName.length + user.lastName.length + i) % 7;
        }
        return total;
    }

    const { filteredUsers, filters, loading } = useUserStore(useShallow((state) => ({
        filteredUsers: state.filteredUsers,
        filters: state.filters,
        loading: state.loading,
    })));
    const {
        loadUsers,
        setFilters,
        clearFilters,
    } = useUserStore();

    const balanceResults = useMemo(() => {
        return filteredUsers.reduce((acc, user) => {
            acc[user.id] = BalanceCalculation(user);
            return acc;
        }, {} as Record<string, number>);
    }, [filteredUsers]);

    const [form] = Form.useForm();
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [viewUserDetail, setViewUserDetail] = useState<User>();

    useEffect(() => {
        loadUsers();
    }, [loadUsers]);

    useEffect(() => {
        if (isOpenModal) {
            if (viewUserDetail) {
                form.setFieldsValue(viewUserDetail);
            }
            else {
                form.resetFields();
            }
        }
    }, [isOpenModal, viewUserDetail, form]);

    const handleViewUserDetail = useCallback((user: User) => {
        setIsOpenModal(true);
        setViewUserDetail(user);
    }, [setIsOpenModal]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters({ search: e.target.value });
    };

    const handleRoleChange = (value: string) => {
        setFilters({ role: value });
    };

    const handleStatusChange = (value: string) => {
        setFilters({ status: value });
    };

    const handleClearFilters = () => {
        clearFilters();
    };

    const handleModalCancel = () => {
        setIsOpenModal(false);
        setViewUserDetail(undefined);
        form.resetFields();
    };

    const handleRefresh = () => {
        loadUsers();
    };

    const UserRow = memo(({ user }: { user: User }) => {
        return <UserAvatar user={user} />;
    });


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
        {
            title: 'Balance',
            key: 'balance',
            align: 'center',
            render: (_, record) => (
                <span style={{ fontWeight: 500, color: '#d46b08' }}>{balanceResults[record.id].toLocaleString()}</span>
            ),
        },
        {
            title: 'View details',
            key: 'viewDetails',
            align: 'center',
            render: (_, record) => (
                <div style={{ display: 'flex', justifyContent: 'center' }} >
                    <Button type='primary' onClick={() => handleViewUserDetail(record)}>
                        View
                    </Button>
                </div>
            ),
        },
    ], [handleViewUserDetail]);



    const paginationConfig = useMemo(() => ({
        total: filteredUsers.length,
        pageSize: 10,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: (total: number, range: [number, number]) =>
            `${range[0]}-${range[1]} of ${total} users`,
    }), [filteredUsers.length]);

    const hasActiveFilters = useMemo(() => {
        return filters.search || filters.role || filters.status;
    }, [filters]);


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
                    <Col xs={24} sm={12} md={4}>
                        <Select
                            placeholder="Filter by role"
                            value={filters.role || undefined}
                            onChange={handleRoleChange}
                            allowClear
                            className="w-full"
                        >
                            <Option value="admin">Admin</Option>
                            <Option value="moderator">Moderator</Option>
                            <Option value="user">User</Option>
                        </Select>
                    </Col>
                    <Col xs={24} sm={12} md={4}>
                        <Select
                            placeholder="Filter by status"
                            value={filters.status || undefined}
                            onChange={handleStatusChange}
                            allowClear
                            className="w-full"
                        >
                            <Option value="active">Active</Option>
                            <Option value="inactive">Inactive</Option>
                        </Select>
                    </Col>
                    <Col xs={24} sm={12} md={10} className="flex justify-end">
                        <Space>
                            {hasActiveFilters && (
                                <Button
                                    icon={<ClearOutlined />}
                                    onClick={handleClearFilters}
                                >
                                    Clear Filters
                                </Button>
                            )}
                            <Button
                                icon={<ReloadOutlined />}
                                onClick={handleRefresh}
                                loading={loading}
                            >
                                Refresh
                            </Button>
                            {/* <Button
                                type="primary"
                                icon={<UserAddOutlined />}
                                onClick={handleAddUser}
                            >
                                Add User
                            </Button> */}
                        </Space>
                    </Col>
                </Row>

                <Divider />

                <Table
                    columns={columns}
                    dataSource={filteredUsers}
                    rowKey="id"
                    loading={loading}
                    pagination={paginationConfig}
                    scroll={{ x: 800 }}
                />
            </Card>

            <Modal
                title='View User Details'
                open={isOpenModal}
                onCancel={handleModalCancel}
                footer={null}
                width={600}
                destroyOnHidden
            >
                <Form
                    form={form}
                    layout="vertical"
                    // onFinish={handleSubmit}
                    className="mt-4"
                >
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="firstName"
                                label="First Name"
                                rules={[
                                    { required: true, message: 'Please enter first name!' },
                                    { min: 2, message: 'First name must be at least 2 characters!' }
                                ]}
                            >
                                <Input
                                    prefix={<UserOutlined />}
                                    placeholder="Enter first name"
                                    disabled={!!viewUserDetail}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="lastName"
                                label="Last Name"
                                rules={[
                                    { required: true, message: 'Please enter last name!' },
                                    { min: 2, message: 'Last name must be at least 2 characters!' }
                                ]}
                            >
                                <Input
                                    prefix={<UserOutlined />}
                                    placeholder="Enter last name"
                                    disabled={!!viewUserDetail}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            { required: true, message: 'Please enter email!' },
                            { type: 'email', message: 'Please enter a valid email!' }
                        ]}
                    >
                        <Input
                            prefix={<MailOutlined />}
                            placeholder="Enter email address"
                            disabled={!!viewUserDetail}
                        />
                    </Form.Item>

                    <Form.Item
                        name="phone"
                        label="Phone"
                        rules={[
                            { required: true, message: 'Please enter phone number!' }
                        ]}
                    >
                        <Input
                            prefix={<PhoneOutlined />}
                            placeholder="Enter phone number"
                            disabled={!!viewUserDetail}
                        />
                    </Form.Item>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="role"
                                label="Role"
                                rules={[{ required: true, message: 'Please select a role!' }]}
                            >
                                <Select placeholder="Select role" disabled={!!viewUserDetail}>
                                    <Option value="admin">Admin</Option>
                                    <Option value="moderator">Moderator</Option>
                                    <Option value="user">User</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="status"
                                label="Status"
                                rules={[{ required: true, message: 'Please select status!' }]}
                            >
                                <Select placeholder="Select status" disabled={!!viewUserDetail}>
                                    <Option value="active">Active</Option>
                                    <Option value="inactive">Inactive</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item
                        name="address"
                        label="Address"
                        rules={[{ required: true, message: 'Please enter address!' }]}
                    >
                        <Input.TextArea
                            rows={3}
                            placeholder="Enter full address"
                            disabled={!!viewUserDetail}
                        />
                    </Form.Item>

                    <Form.Item className="mb-0 text-right">
                        <Space>
                            <Button onClick={handleModalCancel}>
                                Cancel
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}