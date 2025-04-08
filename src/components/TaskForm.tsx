'use client'
import { useState } from 'react';

type Props = {
  onAdd: (title: string, description: string, category: string, deadline: string) => void;
};

export default function TaskForm({ onAdd }: Props) {
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 mb-6 bg-white dark:bg-gray-800 p-4 rounded shadow">
      <input
        type="text"
        placeholder="Tytuł zadania"
        className="border p-2 rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Opis zadania"
        className="border p-2 rounded"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="text"
        placeholder="Kategoria"
        className="border p-2 rounded"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <input
        type="date"
        className="border p-2 rounded"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />
      <button className="bg-green-600 text-white p-2 rounded hover:bg-green-700 transition">Dodaj zadanie</button>
    </form>
  );
}
