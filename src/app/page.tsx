'use client';

import { useEffect, useState } from 'react';
import AppWrapper from '@/components/AppWrapper';
import TaskForm from '@/components/TaskForm';
import TaskItem from '@/components/TaskItem';
import CategorySelector from '@/components/CategorySelector';
import CategoryManager from '@/components/CategoryManager';
import SortSelector from '@/components/SortSelector';
import EditModal from '@/components/EditModal';
import StatusFilter from '@/components/StatusFilter';
import { Task } from '@/types/task';
import { toast } from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';

export default function Page() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sort, setSort] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    const stored = localStorage.getItem('tasks');
    if (stored) setTasks(JSON.parse(stored));
  }, []);

  useEffect(() => {
    const uniqueCategories = [...new Set(tasks.map(t => t.category))];
    setCategories(uniqueCategories);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (title: string, description: string, category: string, deadline: string) => {
    setTasks([...tasks, { id: uuidv4(), title, description, category, deadline, completed: false }]);
    toast.success('Zadanie dodane!');
  };

  const handleDelete = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
    toast('Zadanie usunięte');
  };

  const handleToggle = (id: string) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const handleEdit = (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (task) {
      setTaskToEdit(task);
      toast.success('Zadanie zaktualizowane!');
    }
  };

  const handleSaveEdited = (updated: Task) => {
    setTasks(tasks.map(t => t.id === updated.id ? updated : t));
  };

  const handleAddCategory = (name: string) => {
    if (!categories.includes(name)) {
      setCategories([...categories, name]);
      toast.success('Dodano nową kategorię!');
    }
  };

  const handleDeleteCategory = (name: string) => {
    if (tasks.some(t => t.category === name)) {
      toast.error('Nie możesz usunąć kategorii przypisanej do zadania!');
      return;
    }
    setCategories(categories.filter(c => c !== name));
  };

  //  unikalne kolory
  const getCategoryColor = (() => {
    const colorCache = new Map<string, string>();
    let lastColor = '';

    return (name: string) => {
      if (colorCache.has(name)) {
        return colorCache.get(name)!;
      }

      const encoder = new TextEncoder();
      const data = encoder.encode(name);
      let hash = 0;
      for (let i = 0; i < data.length; i++) {
        hash = (hash << 5) - hash + data[i];
        hash |= 0;
      }

      const colors = [
        'bg-red-500', 'bg-blue-500', 'bg-green-500',
        'bg-yellow-500', 'bg-purple-500', 'bg-pink-500',
        'bg-orange-500', 'bg-teal-500', 'bg-rose-500',
      ];

      let index = Math.abs(hash) % colors.length;

      if (colors[index] === lastColor) {
        index = (index + 1) % colors.length;
      }

      const chosen = colors[index];
      lastColor = chosen;
      colorCache.set(name, chosen);
      return chosen;
    };
  })();

  let filtered = selectedCategory ? tasks.filter(t => t.category === selectedCategory) : [...tasks];
  if (sort === 'title-asc') filtered.sort((a, b) => a.title.localeCompare(b.title));
  else if (sort === 'title-desc') filtered.sort((a, b) => b.title.localeCompare(a.title));
  else if (sort === 'date-asc') filtered.sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
  else if (sort === 'date-desc') filtered.sort((a, b) => new Date(b.deadline).getTime() - new Date(a.deadline).getTime());

  if (statusFilter === 'done') filtered = filtered.filter(t => t.completed);
  else if (statusFilter === 'active') filtered = filtered.filter(t => !t.completed);

  return (
    <AppWrapper
      tasks={tasks}
      onImport={setTasks}
    >
      <div className="mt-24 flex flex-col gap-4">
        <CategoryManager
          categories={categories}
          onAdd={handleAddCategory}
          onDelete={handleDeleteCategory}
        />

        <TaskForm
          onAdd={handleAddTask}
          categories={categories}
        />

        <SortSelector sort={sort} onSortChange={setSort} />

        <CategorySelector
          categories={categories}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
          getColor={getCategoryColor}
        />

        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
          Zrobione: {tasks.filter(t => t.completed).length} / {tasks.length}
        </p>

        <StatusFilter status={statusFilter} onChange={setStatusFilter} />

        <ul>
          {filtered.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={handleToggle}
              onDelete={handleDelete}
              onEdit={handleEdit}
              getCategoryColor={getCategoryColor}
            />
          ))}
        </ul>
      </div>

      <EditModal
        task={taskToEdit}
        onClose={() => setTaskToEdit(null)}
        onSave={handleSaveEdited}
      />
    </AppWrapper>
  );
}
