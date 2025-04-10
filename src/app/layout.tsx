// src/app/layout.tsx
import '../styles/globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'WhatToDo App',
  description: 'Projekt zaliczeniowy z Next.js',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pl">
      <body className="bg-gray-100 text-black dark:bg-gray-900 dark:text-white font-sans">
        {children}
      </body>
    </html>
  );
}



