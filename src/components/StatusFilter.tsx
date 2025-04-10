'use client'

type Props = {
  status: string;
  onChange: (value: string) => void;
};

export default function StatusFilter({ status, onChange }: Props) {
  const baseClass =
    'px-4 py-2 text-sm font-medium rounded-full transition-all focus:outline-none';

  const getClass = (value: string) =>
    `${baseClass} ${
      status === value
        ? 'bg-pink-600 text-white'
        : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600'
    }`;

  return (
    <div className="flex flex-wrap gap-3 mb-6">
      <button className={getClass('all')} onClick={() => onChange('all')}>
        Wszystkie
      </button>
      <button className={getClass('active')} onClick={() => onChange('active')}>
        Niezrobione
      </button>
      <button className={getClass('done')} onClick={() => onChange('done')}>
        Zrobione
      </button>
    </div>
  );
}
