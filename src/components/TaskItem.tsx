import { Task } from '@/types/task';

type Props = {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  onPreview: (task: Task) => void;
  getCategoryColor: (name: string) => string;
};

export default function TaskItem({
  task,
  onToggle,
  onDelete,
  onEdit,
  onPreview,
  getCategoryColor,
}: Props) {
  return (
    <div
      className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition"
      onClick={() => onPreview(task)}
    >
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg">{task.title}</h3>
        <button
          className="text-sm px-2 py-1 bg-blue-600 text-white rounded"
          onClick={(e) => {
            e.stopPropagation();
            onToggle(task.id);
          }}
        >
          {task.completed ? 'Cofnij' : 'Zrobione'}
        </button>
      </div>

      {task.description && (
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 truncate">
          {task.description}
        </p>
      )}

      <div className="mt-2 flex justify-between items-center text-sm">
        <span
          className={`px-2 py-1 rounded-full text-white text-xs ${getCategoryColor(
            task.category
          )}`}
        >
          {task.category}
        </span>
        <span className="text-gray-500 dark:text-gray-400 text-xs italic">
          {new Date(task.deadline).toLocaleDateString()}
        </span>
      </div>

      <div className="mt-2 flex justify-end space-x-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit(task.id);
          }}
          className="px-2 py-1 text-sm bg-yellow-600 rounded text-white"
        >
          Edytuj
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(task.id);
          }}
          className="px-2 py-1 text-sm bg-red-500 text-white rounded"
        >
          Usuń
        </button>
      </div>
    </div>
  );
}


















