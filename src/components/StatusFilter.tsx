'use client'
type Props = {
  status: string;
  onChange: (value: string) => void;
};

export default function StatusFilter({ status, onChange }: Props) {
  return (
    <div className="flex gap-2 mb-4 flex-wrap">
      <button
        className={`px-3 py-1 rounded ${
          status === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 dark:text-white'
        }`}
        onClick={() => onChange('all')}
      >
        Wszystkie
      </button>
      <button
        className={`px-3 py-1 rounded ${
          status === 'active' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 dark:text-white'
        }`}
        onClick={() => onChange('active')}
      >
        Niezrobione
      </button>
      <button
        className={`px-3 py-1 rounded ${
          status === 'done' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 dark:text-white'
        }`}
        onClick={() => onChange('done')}
      >
        Zrobione
      </button>
    </div>
  );
}
