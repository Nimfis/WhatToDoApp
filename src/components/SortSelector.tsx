'use client'
type Props = {
  sort: string;
  onSortChange: (value: string) => void;
};

export default function SortSelector({ sort, onSortChange }: Props) {
  return (
    <div className="flex gap-2 mb-4 text-sm">
      <label>Sortuj:</label>
      <select
        className="border p-1 rounded bg-white dark:bg-gray-800"
        value={sort}
        onChange={(e) => onSortChange(e.target.value)}
      >
        <option value="">Domyślnie</option>
        <option value="title-asc">Tytuł A-Z</option>
        <option value="title-desc">Tytuł Z-A</option>
        <option value="date-asc">Data rosnąco</option>
        <option value="date-desc">Data malejąco</option>
      </select>
    </div>
  );
}
