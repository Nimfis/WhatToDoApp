'use client'
import { Task } from '@/types/task';

type Props = {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  getCategoryColor: (name: string) => string;
};

export default function TaskItem({ task, onToggle, onDelete, onEdit, getCategoryColor}: Props) {
  return (
    <li
      className={`bg-white dark:bg-gray-800 p-4 rounded shadow-md mb-3 transition-all duration-300 hover:scale-[1.01] ${task.completed ? 'opacity-60' : ''
        }`}
    >
      <div className="flex justify-between items-start gap-4 mb-2">
        <div>
          <h3 className={`text-lg font-semibold ${task.completed ? 'line-through text-gray-400' : ''}`}>
            {task.title}
          </h3>
          {task.category && (
            <span className={`inline-flex items-center gap-2 text-xs font-medium mt-1`}>
              <span className={`w-2.5 h-2.5 rounded-full ${getCategoryColor(task.category)}`}></span>
              {task.category}
            </span>
          )}
          {task.description && (
            <p className="text-sm text-gray-600 dark:text-gray-300">{task.description}</p>
          )}
          {task.deadline && (
            <p className="text-xs text-gray-500 dark:text-gray-400 italic">
              Do: {new Date(task.deadline).toLocaleDateString()}
            </p>
          )}
        </div>
        <div className="flex flex-col items-end gap-1">
          <button
            className={`text-xs px-2 py-1 rounded ${task.completed ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
              } text-white transition`}
            onClick={() => onToggle(task.id)}
          >
            {task.completed ? 'Cofnij' : 'Zrobione'}
          </button>
          <button
            className="text-xs px-2 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded transition"
            onClick={() => onEdit(task.id)}
          >
            Edytuj
          </button>
          <button
            className="text-xs px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded transition"
            onClick={() => onDelete(task.id)}
          >
            Usuń
          </button>
        </div>
      </div>
    </li>
  );
}
