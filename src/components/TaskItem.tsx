'use client'
import { Task } from '@/types/task';

type Props = {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  getCategoryColor: (name: string) => string;
};

export default function TaskItem({ task, onToggle, onDelete, onEdit, getCategoryColor }: Props) {
  return (
    <li
      className={`bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md mb-4 transition-all duration-300 hover:scale-[1.01] ${
        task.completed ? 'opacity-60' : ''
      }`}
    >
      <div className="flex justify-between items-start gap-6">
        {/* Treść zadania */}
        <div className="flex-1">
          <h3 className={`text-lg font-semibold mb-1 ${task.completed ? 'line-through text-gray-400' : 'text-gray-900 dark:text-white'}`}>
            {task.title}
          </h3>

          {task.category && (
            <div className="inline-flex items-center gap-2 text-sm font-medium mb-2">
              <span className={`w-2.5 h-2.5 rounded-full ${getCategoryColor(task.category)}`}></span>
              <span className="text-gray-700 dark:text-gray-300">{task.category}</span>
            </div>
          )}

          {task.description && (
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">
              {task.description}
            </p>
          )}

          {task.deadline && (
            <p className="text-xs text-gray-500 dark:text-gray-400 italic">
              Do: {new Date(task.deadline).toLocaleDateString()}
            </p>
          )}
        </div>

        {/* Przyciski */}
        <div className="flex flex-col items-end gap-2">
          <button
            className={`text-xs px-3 py-1 rounded font-medium ${
              task.completed ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
            } text-white transition`}
            onClick={() => onToggle(task.id)}
          >
            {task.completed ? 'Cofnij' : 'Zrobione'}
          </button>
          <button
            className="text-xs px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded font-medium transition"
            onClick={() => onEdit(task.id)}
          >
            Edytuj
          </button>
          <button
            className="text-xs px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded font-medium transition"
            onClick={() => onDelete(task.id)}
          >
            Usuń
          </button>
        </div>
      </div>
    </li>
  );
}
