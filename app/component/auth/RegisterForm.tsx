'use client';

import { useState } from 'react';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

interface RegisterFormValues {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    agreeToTerms: boolean;
}

export default function RegisterForm() {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values: RegisterFormValues) => {
        setLoading(true);
        
        try {
            const { confirmPassword, ...registerData } = values;
            await new Promise(resolve => setTimeout(resolve, 1000));
            message.success('Account created successfully!');
        } catch (error) {
            message.error('Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const validateConfirmPassword = (_: unknown, value: string) => {
        if (!value) {
            return Promise.reject(new Error('Please confirm your password!'));
        }
        if (value !== form.getFieldValue('password')) {
            return Promise.reject(new Error('Passwords do not match!'));
        }
        return Promise.resolve();
    };

    return (
        <Form
            form={form}
            name="register"
            onFinish={onFinish}
            layout="vertical"
            size="large"
            className="space-y-4"
            requiredMark={false}
        >
            <div className="grid grid-cols-2 gap-4">
                <Form.Item
                    name="firstName"
                    rules={[
                        { required: true, message: 'Please enter your first name!' },
                        { min: 2, message: 'First name must be at least 2 characters!' }
                    ]}
                >
                    <Input
                        prefix={<UserOutlined className="text-gray-400" />}
                        placeholder="First Name"
                        className="rounded-lg"
                    />
                </Form.Item>

                <Form.Item
                    name="lastName"
                    rules={[
                        { required: true, message: 'Please enter your last name!' },
                        { min: 2, message: 'Last name must be at least 2 characters!' }
                    ]}
                >
                    <Input
                        prefix={<UserOutlined className="text-gray-400" />}
                        placeholder="Last Name"
                        className="rounded-lg"
                    />
                </Form.Item>
            </div>

            <Form.Item
                name="email"
                rules={[
                    { required: true, message: 'Please enter your email!' },
                    { type: 'email', message: 'Please enter a valid email!' }
                ]}
            >
                <Input
                    prefix={<MailOutlined className="text-gray-400" />}
                    placeholder="Email Address"
                    className="rounded-lg"
                />
            </Form.Item>

            <Form.Item
                name="password"
                rules={[
                    { required: true, message: 'Please enter your password!' },
                    { min: 8, message: 'Password must be at least 8 characters!' },
                    {
                        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                        message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number!'
                    }
                ]}
            >
                <Input.Password
                    prefix={<LockOutlined className="text-gray-400" />}
                    placeholder="Password"
                    className="rounded-lg"
                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
            </Form.Item>

            <Form.Item
                name="confirmPassword"
                dependencies={['password']}
                rules={[
                    { required: true, message: 'Please confirm your password!' },
                    { validator: validateConfirmPassword }
                ]}
            >
                <Input.Password
                    prefix={<LockOutlined className="text-gray-400" />}
                    placeholder="Confirm Password"
                    className="rounded-lg"
                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
            </Form.Item>

            <Form.Item
                name="agreeToTerms"
                valuePropName="checked"
                rules={[
                    {
                        validator: (_, value) =>
                            value ? Promise.resolve() : Promise.reject(new Error('Please agree to the terms and conditions!')),
                    },
                ]}
            >
                <Checkbox className="text-sm">
                    I agree to the{' '}
                    <a href="/terms" className="text-blue-500 hover:text-blue-700">
                        Terms of Service
                    </a>
                    {' '}and{' '}
                    <a href="/privacy" className="text-blue-500 hover:text-blue-700">
                        Privacy Policy
                    </a>
                </Checkbox>
            </Form.Item>

            <Form.Item className="mb-0">
                <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    className="w-full h-12 rounded-lg bg-blue-500 hover:bg-blue-600 border-none text-white font-medium"
                >
                    {loading ? 'Creating Account...' : 'Create Account'}
                </Button>
            </Form.Item>
        </Form>
    );
}