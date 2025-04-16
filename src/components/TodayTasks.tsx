'use client';

import { Task } from '@/types/task';

type Props = {
  tasks: Task[];
  onEdit: (id: string) => void;
  onPreview: (task: Task) => void;
  getCategoryColor: (name: string) => string;
};

export default function TodayTasks({
  tasks,
  onEdit,
  onPreview,
  getCategoryColor,
}: Props) {
  const today = new Date().toISOString().slice(0, 10);
  const todayTasks = tasks.filter((t) => t.deadline === today);

  return (
    <section>
      <h2 className="text-lg font-bold text-white">
        Zadania na dziś: {new Date().toLocaleDateString('pl-PL')}
      </h2>

      {todayTasks.length === 0 ? (
        <p className="text-sm text-gray-500">Brak zadań na dziś.</p>
      ) : (
        <ul className="space-y-2">
          {todayTasks.map((task) => (
            <li
              key={task.id}
              onClick={() => onPreview(task)}
              className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-semibold">{task.title}</h3>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(task.id);
                  }}
                  className="text-sm px-2 py-1 bg-yellow-600 rounded"
                >
                  Edytuj
                </button>
              </div>

              {task.description && (
                <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
                  {task.description}
                </p>
              )}

              <div className="mt-2 flex items-center justify-between text-xs">
                <span
                  className={`px-2 py-1 rounded-full text-white ${getCategoryColor(
                    task.category
                  )}`}
                >
                  {task.category}
                </span>
                <span className="italic text-gray-500 dark:text-gray-400">
                  {new Date(task.deadline).toLocaleDateString()}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
