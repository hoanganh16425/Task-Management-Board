'use client'
import { DEFAULT_IMAGE } from '@/app/constants/task-board.constant'
import { useTaskStore } from '@/app/stores/taskStore'
import { CalendarOutlined } from '@ant-design/icons'
import { Card, Space, List, Avatar, Typography } from 'antd'
import React from 'react'

const { Text } = Typography

const RecentTask: React.FC = () => {
    const { tasks } = useTaskStore();
    return (
        <Card
            title={
                <Space>
                    <CalendarOutlined />
                    <span>Recent Tasks</span>
                </Space>
            }
        >
            <List
                itemLayout="horizontal"
                dataSource={tasks}
                renderItem={(task) => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar style={{ backgroundColor: '#1890ff' }} src={task.assignee?.avatar ?? DEFAULT_IMAGE} alt={task.assignee?.name} />}
                            title={<Text>{task.title}</Text>}
                            description={
                                <Space>
                                    <Text type="secondary">{task.assignee?.name}</Text>
                                    <span style={{
                                        padding: '2px 8px',
                                        borderRadius: '4px',
                                        fontSize: '11px',
                                        backgroundColor: task.status === 'completed' ? '#f6ffed' :
                                            task.status === 'in-progress' ? '#e6f7ff' : '#fff7e6',
                                        color: task.status === 'completed' ? '#52c41a' :
                                            task.status === 'in-progress' ? '#1890ff' : '#faad14'
                                    }}>
                                        {task.status.replace('-', ' ').toUpperCase()}
                                    </span>
                                </Space>
                            }
                        />
                    </List.Item>
                )}
            />
        </Card>
    )
}

export default RecentTask