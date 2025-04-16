'use client';

import { Task } from '@/types/task';
import { toast } from 'react-hot-toast';

interface Props {
  tasks: Task[];
  onImport: (tasks: Task[]) => void;
}

export default function ExportImportControls({ tasks, onImport }: Props) {
  const exportToJSON = () => {
    const dataStr = JSON.stringify(tasks, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'tasks.json';
    a.click();
  };

  const importFromJSON = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';

    input.onchange = async (e: any) => {
      const file = e.target.files[0];
      if (!file) return;

      try {
        const text = await file.text();
        const parsed = JSON.parse(text);

        if (Array.isArray(parsed)) {
          onImport(parsed);
          toast.success('Zaimportowano dane!');
        } else {
          toast.error('Plik musi zawierać tablicę zadań.');
        }
      } catch {
        toast.error('Błąd podczas importu pliku.');
      }
    };

    input.click();
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={exportToJSON}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Eksportuj JSON
      </button>
      <button
        onClick={importFromJSON}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
      >
        Importuj JSON
      </button>
    </div>
  );
}
