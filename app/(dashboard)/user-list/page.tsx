'use client';

import { useEffect, useCallback, useMemo, memo, useState } from 'react';
import {
    Table,
    Button,
    Input,
    Select,
    Space,
    Card,
    Modal,
    Form,
    Avatar,
    Tag,
    Popconfirm,
    App,
    Row,
    Col,
    Typography,
    Divider,
    Alert
} from 'antd';
import {
    UserAddOutlined,
    SearchOutlined,
    EditOutlined,
    DeleteOutlined,
    UserOutlined,
    MailOutlined,
    PhoneOutlined,
    ReloadOutlined,
    ClearOutlined
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

// Import Zustand store
import {
    User,
    UserFormData,
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

const ActionButtons = memo(({
    user,
    onEdit,
    onDelete
}: {
    user: User;
    onEdit: (user: User) => void;
    onDelete: (userId: string) => void;
}) => {
    const handleEdit = useCallback(() => {
        onEdit(user);
    }, [user, onEdit]);

    const handleDelete = useCallback(() => {
        onDelete(user.id);
    }, [user.id, onDelete]);
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
ActionButtons.displayName = 'ActionButtons';

export default function UserListPage() {
    const { filteredUsers, filters, loading } = useUserStore(useShallow((state) => ({
        filteredUsers: state.filteredUsers,
        filters: state.filters,
        loading: state.loading,
    })));
    const { addUser,
        updateUser,
        deleteUser,
        loadUsers,
        setFilters,
        clearFilters,
    } = useUserStore();
    const [form] = Form.useForm();
    const { message } = App.useApp();
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [editingUser, setEditingUser] = useState<User>();

    useEffect(() => {
        loadUsers();
    }, [loadUsers]);

    useEffect(() => {
        if (isOpenModal) {
            if (editingUser) {
                form.setFieldsValue(editingUser);
            } else {
                form.resetFields();
            }
        }
    }, [isOpenModal, editingUser, form]);

    const handleAddUser = () => {
        setIsOpenModal(true);
    };

    const handleEditUser = useCallback((user: User) => {
        setIsOpenModal(true);
        setEditingUser(user);
    }, [setIsOpenModal]);

    const handleDeleteUser = useCallback(async (userId: string) => {
        try {
            await deleteUser(userId);
            message.success('User deleted successfully');
        } catch (error) {
            message.error('Failed to delete user');
        }
    }, [deleteUser, message]);

    const handleSubmit = useCallback(async (values: UserFormData) => {
        try {
            if (editingUser) {
                await updateUser(editingUser.id, values);
                message.success('User updated successfully');
            } else {
                await addUser(values);
                message.success('User added successfully');
            }
            form.resetFields();
        } catch (error) {
            message.error(editingUser ? 'Failed to update user' : 'Failed to add user');
        }
    }, [editingUser, addUser, updateUser, form, message]);

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
        form.resetFields();
    };

    const handleRefresh = () => {
        loadUsers();
    };

    const columns: ColumnsType<User> = useMemo(() => [
        {
            title: 'User',
            dataIndex: 'firstName',
            key: 'user',
            render: (_, record) => <UserAvatar user={record} />,
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            render: (role) => <RoleTag role={role} />,
        },
        {
            title: 'Status',
            dataIndex: 'status',
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
            render: (date) => new Date(date).toLocaleDateString(),
        },
        {
            title: 'Actions',
            key: 'actions',
            width: 120,
            render: (_, record) => (
                <ActionButtons
                    user={record}
                    onEdit={handleEditUser}
                    onDelete={handleDeleteUser}
                />
            ),
        },
    ], [handleEditUser, handleDeleteUser]);

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
                            <Button
                                type="primary"
                                icon={<UserAddOutlined />}
                                onClick={handleAddUser}
                            >
                                Add User
                            </Button>
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
                title={editingUser ? 'Edit User' : 'Add New User'}
                open={isOpenModal}
                onCancel={handleModalCancel}
                footer={null}
                width={600}
                destroyOnHidden
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
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
                        />
                    </Form.Item>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="role"
                                label="Role"
                                rules={[{ required: true, message: 'Please select a role!' }]}
                            >
                                <Select placeholder="Select role">
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
                                <Select placeholder="Select status">
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
                        />
                    </Form.Item>

                    <Form.Item className="mb-0 text-right">
                        <Space>
                            <Button onClick={handleModalCancel}>
                                Cancel
                            </Button>
                            <Button type="primary" htmlType="submit" loading={loading}>
                                {editingUser ? 'Update User' : 'Add User'}
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}