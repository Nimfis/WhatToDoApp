'use client'

type Props = {
  sort: string;
  onSortChange: (value: string) => void;
};

export default function SortSelector({ sort, onSortChange }: Props) {
  return (
    <div className="flex items-center gap-3 mb-6 text-sm">
      <label className="font-medium text-white">Sortuj:</label>
      <select
        value={sort}
        onChange={(e) => onSortChange(e.target.value)}
        className="min-w-[160px] px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition cursor-pointer"
      >
        <option value="">Domyślnie</option>
        <option value="title-asc">Tytuł A–Z</option>
        <option value="title-desc">Tytuł Z–A</option>
        <option value="date-asc">Data rosnąco</option>
        <option value="date-desc">Data malejąco</option>
      </select>
    </div>
  );
}
