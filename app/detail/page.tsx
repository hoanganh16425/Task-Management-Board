'use client'
import React from 'react'
import { useTaskStore } from '../stores/taskStore';

function Page() {
    const {
        tasks,
    } = useTaskStore();
    console.log(tasks);
    
    return (
        <div>Page</div>
    )
}

export default Page