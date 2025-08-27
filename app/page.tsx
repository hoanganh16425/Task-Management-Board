import { Metadata } from 'next';
import TaskBoardWrapper from './component/task/TaskBoardWrapper';

export const metadata: Metadata = {
  title: 'Task Board | TaskFlow',
  description: 'Manage your tasks efficiently with our drag-and-drop kanban board',
};

export default function HomePage() {
  return (
    <TaskBoardWrapper />
  );
}