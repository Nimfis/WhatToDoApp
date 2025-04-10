'use client'
import { Task } from '@/types/task';

type Props = {
  tasks: Task[];
  onImport: (tasks: Task[]) => void;
};

export default function BackupControls({ tasks, onImport }: Props) {
  const handleExport = () => {
    const blob = new Blob([JSON.stringify(tasks, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'todo_backup.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        if (Array.isArray(data)) {
          onImport(data);
        } else {
          alert('Nieprawidłowy format pliku!');
        }
      } catch {
        alert('Błąd podczas wczytywania pliku!');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex flex-wrap gap-3 mb-6">
      <button
        onClick={handleExport}
        className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-2 rounded-lg shadow transition focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-800"
      >
        Eksportuj JSON
      </button>

      <label className="relative bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-5 py-2 rounded-lg shadow transition cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-300 dark:focus:ring-green-800">
        Importuj JSON
        <input
          type="file"
          accept="application/json"
          onChange={handleImport}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
      </label>
    </div>
  );
}
