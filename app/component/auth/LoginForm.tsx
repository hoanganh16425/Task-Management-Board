'use client';

import { useAuthStore } from '@/app/stores/authStore';
import {
    LockOutlined,
    UserOutlined
} from '@ant-design/icons';
import {
    Alert,
    Button,
    Card,
    Checkbox,
    Form,
    Input,
    Space,
    Typography
} from 'antd';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const { Text, Link } = Typography;

interface LoginFormData {
    email: string;
    password: string;
    remember: boolean;
}

const LoginForm: React.FC = () => {
    const [form] = Form.useForm();
    const router = useRouter();
    const { login, loading, error, clearError } = useAuthStore();
    const [showDemoCredentials, setShowDemoCredentials] = useState(false);

    const handleSubmit = async (values: LoginFormData) => {
        clearError();
        await login(values.email, values.password);
        const { isAuthenticated } = useAuthStore.getState();
        if (isAuthenticated) {
            router.refresh(); 
            router.push('/dashboard');
        }
    };

    const handleDemoLogin = (userType: 'admin' | 'user') => {
        const credentials = userType === 'admin'
            ? { email: 'admin@taskflow.com', password: 'password123' }
            : { email: 'user@taskflow.com', password: 'password123' };

        form.setFieldsValue(credentials);
    };

    return (
        <>
            {error && (
                <Alert
                    message={error}
                    type="error"
                    showIcon
                    closable
                    onClose={clearError}
                    className="mb-6"
                />
            )}

            <div className="mb-4 text-center">
                <Button
                    type="link"
                    size="small"
                    onClick={() => setShowDemoCredentials(!showDemoCredentials)}
                >
                    {showDemoCredentials ? "Hide" : "Show"} Demo Credentials
                </Button>
            </div>

            {showDemoCredentials && (
                <Card
                    size="small"
                    className="mb-6 bg-gray-50 border border-gray-200"
                >
                    <Space direction="vertical" className="w-full">
                        <Text strong className="text-xs">Demo Accounts:</Text>
                        <div>
                            <Button
                                size="small"
                                type="link"
                                className="!p-0 h-auto text-xs"
                                onClick={() => handleDemoLogin("admin")}
                            >
                                Admin: admin@taskflow.com / password123
                            </Button>
                        </div>
                        <div>
                            <Button
                                size="small"
                                type="link"
                                className="!p-0 h-auto text-xs"
                                onClick={() => handleDemoLogin("user")}
                            >
                                User: user@taskflow.com / password123
                            </Button>
                        </div>
                    </Space>
                </Card>
            )}
            <Form
                form={form}
                name="login"
                onFinish={handleSubmit}
                layout="vertical"
                requiredMark={false}
                initialValues={{ remember: true }}
            >
                <Form.Item
                    name="email"
                    label="Email Address"
                    rules={[
                        { required: true, message: "Please enter your email address" },
                        { type: "email", message: "Please enter a valid email address" },
                    ]}
                >
                    <Input
                        prefix={<UserOutlined className="text-gray-400" />}
                        placeholder="Enter your email"
                        size="large"
                    />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                        { required: true, message: "Please enter your password" },
                        { min: 6, message: "Password must be at least 6 characters" },
                    ]}
                >
                    <Input.Password
                        prefix={<LockOutlined className="text-gray-400" />}
                        placeholder="Enter your password"
                        size="large"
                    />
                </Form.Item>

                <Form.Item className="mb-4">
                    <div className="flex justify-between items-center">
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>
                        <Link href="/forgot-password" className="text-sm">
                            Forgot password?
                        </Link>
                    </div>
                </Form.Item>

                <Form.Item className="mb-4">
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        size="large"
                        className="w-full h-12"
                    >
                        Sign In
                    </Button>
                </Form.Item>
            </Form>
        </>


    );
};

export default LoginForm;