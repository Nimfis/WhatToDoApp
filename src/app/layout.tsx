import '../styles/globals.css';

export const metadata = {
  title: 'WhatToDo App',
  description: 'Projekt zaliczeniowy – aplikacja typu ToDo z Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body className="bg-gray-100 text-black dark:bg-gray-900 dark:text-white">
        {children}
      </body>
    </html>
  );
}
