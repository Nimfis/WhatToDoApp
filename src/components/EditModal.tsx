'use client'
import { Task } from '@/types/task';
import { useEffect, useState } from 'react';

type Props = {
  task: Task | null;
  onClose: () => void;
  onSave: (updatedTask: Task) => void;
};

export default function EditModal({ task, onClose, onSave }: Props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setDeadline(task.deadline);
    }
  }, [task]);

  if (!task) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...task, title, description, deadline });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Edytuj zadanie</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            className="border p-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Tytuł"
          />
          <textarea
            className="border p-2 rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Opis"
          />
          <input
            type="date"
            className="border p-2 rounded"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 dark:bg-gray-600 px-4 py-2 rounded"
            >
              Anuluj
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Zapisz
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
