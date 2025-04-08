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
    <div className="flex flex-col sm:flex-row gap-2 mb-6">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        onClick={handleExport}
      >
        Eksportuj JSON
      </button>
      <label className="cursor-pointer bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
        Importuj JSON
        <input type="file" accept="application/json" onChange={handleImport} className="hidden" />
      </label>
    </div>
  );
}
