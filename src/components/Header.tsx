export default function Header() {
  return (
    <header className="text-center mb-6">
      <h1 className="text-4xl font-hand flex justify-center items-center gap-3">
        WhatToDo
        <img
          src="/icons/What.gif" 
          alt="Ikonka"
          className="w-12 h-13 inline-block rounded-full"
        />
        App
      </h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
        Zaliczenie z Interfejsów Webowych
      </p>
    </header>
  );
}
