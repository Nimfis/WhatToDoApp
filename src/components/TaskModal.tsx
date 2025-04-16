import { Task } from '@/types/task';

type Props = {
  task: Task | null;
  onClose: () => void;
  getCategoryColor: (name: string) => string;
};

export default function TaskModal({ task, onClose, getCategoryColor }: Props) {
  if (!task) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center px-4">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg w-full relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-800 dark:hover:text-white"
        >
          ✖
        </button>

        <h2 className="text-xl font-bold mb-2">{task.title}</h2>

        {task.description && (
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            {task.description}
          </p>
        )}

        <div className="text-sm mb-2">
          <strong>Kategoria:</strong>{' '}
          <span
            className={`px-2 py-1 rounded-full text-white text-xs ${getCategoryColor(
              task.category
            )}`}
          >
            {task.category}
          </span>
        </div>

        <div className="text-sm">
          <strong>Termin:</strong>{' '}
          <span className="italic text-gray-500 dark:text-gray-400">
            {new Date(task.deadline).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
}
