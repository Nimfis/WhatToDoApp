'use client';

import Image from 'next/image';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900 text-white dark:bg-black shadow-md px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <Image
          src="/icons/flower.gif"
          alt="Logo"
          width={40}
          height={40}
          className="rounded-full"
        />
        <span className="text-xl font-semibold whitespace-nowrap">WhatToDo App</span>
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggle />
      </div>
    </nav>
  );
}
