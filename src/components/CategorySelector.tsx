'use client'

type Props = {
  categories: string[];
  selected: string;
  onSelect: (cat: string) => void;
  getColor: (name: string) => string;
};

export default function CategorySelector({ categories, selected, onSelect, getColor }: Props) {
  return (
    <div className="flex flex-wrap gap-2 my-6">
      <button
        onClick={() => onSelect('')}
        className={`px-4 py-2 rounded-full font-medium text-sm transition-all 
          ${selected === '' 
            ? 'bg-blue-600 text-white' 
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600'
          }`}
      >
        Wszystkie
      </button>

      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm transition-all
            ${selected === cat 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600'
            }`}
        >
          <span className={`w-2.5 h-2.5 rounded-full ${getColor(cat)}`}></span>
          {cat}
        </button>
      ))}
    </div>
  );
}
