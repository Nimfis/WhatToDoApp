'use client'
import { useState } from 'react';

type Props = {
  categories: string[];
  onAdd: (name: string) => void;
  onDelete: (name: string) => void;
};

export default function CategoryManager({ categories, onAdd, onDelete }: Props) {
  const [newCat, setNewCat] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCat && !categories.includes(newCat)) {
      onAdd(newCat);
      setNewCat('');
    }
  };

  return (
    <div className="flex-1 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Kategorie:</h3>
      <form onSubmit={handleSubmit} className="flex gap-3 mb-4">
        <input
          className="flex-grow p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900"
          value={newCat}
          onChange={(e) => setNewCat(e.target.value)}
          placeholder="Nowa kategoria"
        />
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2 rounded-lg transition"
        >
          Dodaj
        </button>
      </form>

      <ul className="space-y-2">
        {categories.map((cat) => (
          <li
            key={cat}
            className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg"
          >
            <span className="text-gray-800 dark:text-white">{cat}</span>
            <button
              onClick={() => onDelete(cat)}
              className="text-red-500 hover:text-red-600 font-medium transition"
            >
              Usuń
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
