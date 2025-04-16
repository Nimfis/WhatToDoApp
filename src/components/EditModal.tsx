'use client';

import { useEffect, useState } from 'react';
import { Task } from '@/types/task';

interface Props {
  task: Task | null;
  onClose: () => void;
  onSave: (updated: Task) => void;
  categories: string[];
}

export default function EditModal({ task, onClose, onSave, categories }: Props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setDeadline(task.deadline);
      setCategory(task.category);
    }
  }, [task]);

  if (!task) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...task,
      title,
      description,
      deadline,
      category,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-semibold mb-4 dark:text-white">Edytuj zadanie</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Tytuł"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
            required
          />

          <textarea
            placeholder="Opis"
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="w-full p-2 border rounded-md resize-none h-40 whitespace-pre-wrap break-words dark:bg-gray-700 dark:text-white"
            required
          />

          <input
            type="date"
            value={deadline}
            onChange={e => setDeadline(e.target.value)}
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
            required
          />

          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
            required
          >
            <option value="">Wybierz kategorię</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400 dark:hover:bg-gray-500"
            >
              Anuluj
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Zapisz
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
