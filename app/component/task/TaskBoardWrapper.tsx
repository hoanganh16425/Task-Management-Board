'use client';
import dynamic from 'next/dynamic';
import LoadingSpinner from '../../loading';

const TaskBoard = dynamic(() => import('./TaskBoard'), {
  ssr: false,
  loading: () => <LoadingSpinner />
});

export default function TaskBoardWrapper() {
  return <TaskBoard />;
}