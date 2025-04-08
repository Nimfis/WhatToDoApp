'use client'

type Props = {
  categories: string[];
  selected: string;
  onSelect: (cat: string) => void;
  getColor: (name: string) => string;
};

export default function CategorySelector({ categories, selected, onSelect, getColor }: Props) {
  return (
    <div className="flex gap-2 my-4 flex-wrap">
      <button
        className={`px-3 py-1 rounded ${selected === '' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        onClick={() => onSelect('')}
      >
        Wszystkie
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          className={`flex items-center gap-2 px-3 py-1 rounded ${selected === cat ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 dark:text-white'
            }`}
          onClick={() => onSelect(cat)}
        >
          <span className={`w-2.5 h-2.5 rounded-full ${getColor(cat)}`}></span>
          {cat}
        </button>
      ))}
    </div>
  );
}
