'use client';

import { ReactNode } from 'react';
import ExportImportControls from './ExportImportControls';
import ThemeToggle from './ThemeToggle';
import { Task } from '@/types/task';
import { Toaster } from 'react-hot-toast';

interface Props {
  children: ReactNode;
  tasks: Task[];
  onImport: (tasks: Task[]) => void;
}

export default function AppWrapper({ children, tasks, onImport }: Props) {
  return (
    <>
      <Toaster position="top-right" />
      <main className="min-h-screen w-full bg-transparent">
        <div className="flex justify-between items-center px-6 pt-4">
          <ThemeToggle />
          <ExportImportControls tasks={tasks} onImport={onImport} />
        </div>
        {children}
      </main>
    </>
  );
}
