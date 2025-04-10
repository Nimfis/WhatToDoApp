'use client';

import { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';
import ThemeToggle from './ThemeToggle';
import BackupControls from './BackupControls';
import Header from './Header';
import { Task } from '@/types/task';

type Props = {
  children: ReactNode;
  tasks: Task[];
  onImport: (tasks: Task[]) => void;
  controls?: ReactNode;
};

export default function AppWrapper({ children, tasks, onImport, controls }: Props) {
  return (
    <main className="flex flex-col md:flex-row h-screen">
      {/* Lewa kolumna */}
      <div
        className="md:w-1/2 w-full h-[300px] md:h-auto bg-cover bg-center relative"
        style={{ backgroundImage: "url('/suculent.jpg')" }}
      >
        <div className="flex flex-col items-center justify-start h-full pt-[120px]">
          <Header />
        </div>
      </div>

      {/* Prawa kolumna */}
      <div className="md:w-1/2 w-full relative p-6 md:p-8 overflow-y-auto flex flex-col">
        {/* ThemeToggle w prawym górnym rogu */}
        <div className="absolute top-4 right-4 z-10">
          <ThemeToggle />
        </div>

        {/* Główna treść */}
        <div className="flex-1 flex flex-col md:flex-row gap-6 pt-16 pb-24">
          {/* Formularze i lista */}
          <div className="flex-1 flex flex-col gap-4 max-w-xl w-full">
            {children}
          </div>

          {/* Panel boczny */}
          <div className="min-w-[180px] flex flex-col justify-start items-end gap-4 pt-4">
            {controls}
          </div>
        </div>

        {/* Backup kontrolki ZAWSZE WIDOCZNE */}
        <div className="fixed bottom-4 right-4 z-50">
          <BackupControls tasks={tasks} onImport={onImport} />
        </div>

        <Toaster position="top-right" />
      </div>
    </main>
  );
}
