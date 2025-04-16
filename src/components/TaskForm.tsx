'use client'
import { useState } from 'react';

type Props = {
  onAdd: (title: string, description: string, category: string, deadline: string) => void;
  categories: string[];
};

export default function TaskForm({ onAdd, categories }: Props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [deadline, setDeadline] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !category) return;
    onAdd(title, description, category, deadline);
    setTitle('');
    setDescription('');
    setCategory('');
    setDeadline('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex-1 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md"
    >
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Nowe zadanie</h3>

      <input
        type="text"
        placeholder="Tytuł zadania"
        className="w-full p-3 mb-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Opis zadania"
        className="w-full p-3 mb-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full p-3 mb-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900"
      >
        <option value="">Wybierz kategorię</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      <input
        type="date"
        className="w-full p-3 mb-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />

      <button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition"
      >
        Dodaj zadanie
      </button>
    </form>
  );
}
