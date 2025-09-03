import RegisterForm from '@/app/component/auth/RegisterForm';
import { GithubOutlined, GoogleOutlined } from '@ant-design/icons';
import { Button, Card, Divider, Space } from 'antd';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Sign In | TaskFlow',
    description: 'Sign in to your TaskFlow account',
};

export default function RegisterPage() {
    return <>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-400 to-purple-600 p-5">
            <Card className="w-full max-w-md shadow-2xl rounded-xl border-none">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-blue-500 rounded-xl flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                        TF
                    </div>
                    <h2 className="!m-0 !text-gray-800">
                        Welcome to TaskFlow
                    </h2>
                </div>
                <RegisterForm />
                <Divider plain>
                    <p className="text-xs">
                        Or continue with
                    </p>
                </Divider>

                <Space className="w-full justify-center">
                    <Button icon={<GoogleOutlined />} className="w-28">
                        Google
                    </Button>
                    <Button icon={<GithubOutlined />} className="w-28">
                        GitHub
                    </Button>
                </Space>

                <div className="text-center mt-6">
                    <p className="text-sm secondary">
                        Already have an account?{" "}
                        <Link href="/login" className="font-medium">
                            Sign in now
                        </Link>
                    </p>
                </div>
            </Card>
        </div>
    </>
}