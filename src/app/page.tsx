'use client'
import { useEffect, useState } from 'react';
import ThemeToggle from '@/components/ThemeToggle';
import Header from '@/components/Header';
import TaskForm from '@/components/TaskForm';
import TaskItem from '@/components/TaskItem';
import CategorySelector from '@/components/CategorySelector';
import SortSelector from '@/components/SortSelector';
import EditModal from '@/components/EditModal';
import BackupControls from '@/components/BackupControls';
import StatusFilter from '@/components/StatusFilter';
import { Task } from '@/types/task';
import { v4 as uuidv4 } from 'uuid';

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sort, setSort] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const handleDelete = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };
  const handleEdit = (id: string) => {
    const task = tasks.find((t) => t.id === id);
    if (task) {
      setTaskToEdit(task);
    }
  };
  const handleSaveEdited = (updated: Task) => {
    setTasks(tasks.map((t) => (t.id === updated.id ? updated : t)));
  };
  
  const getCategoryColor = (name: string) => {
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
      'bg-indigo-500', 'bg-orange-500', 'bg-emerald-500',
      'bg-teal-500', 'bg-rose-500', 'bg-lime-500',
      'bg-sky-500', 'bg-fuchsia-500', 'bg-violet-500',
    ];
    return colors[Math.abs(hash) % colors.length];
  };
  
  




  useEffect(() => {
    const stored = localStorage.getItem('tasks');
    if (stored) setTasks(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (title: string, description: string, category: string, deadline: string) => {
    setTasks([...tasks, { id: uuidv4(), title, description, category, deadline, completed: false }]);
  };


  const handleToggle = (id: string) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task))
    );
  };

  let filtered = selectedCategory
    ? tasks.filter((task) => task.category === selectedCategory)
    : [...tasks];

  if (sort === 'title-asc') {
    filtered.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sort === 'title-desc') {
    filtered.sort((a, b) => b.title.localeCompare(a.title));
  } else if (sort === 'date-asc') {
    filtered.sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
  } else if (sort === 'date-desc') {
    filtered.sort((a, b) => new Date(b.deadline).getTime() - new Date(a.deadline).getTime());
  }

  if (statusFilter === 'done') {
    filtered = filtered.filter(task => task.completed);
  } else if (statusFilter === 'active') {
    filtered = filtered.filter(task => !task.completed);
  }
  
  const categories = Array.from(new Set(tasks.map((t) => t.category)));

  return (
    <main className="max-w-xl mx-auto p-4">
      <ThemeToggle />
      <BackupControls tasks={tasks} onImport={setTasks} />
      <Header />
      <TaskForm onAdd={handleAddTask} />
      <CategorySelector
        categories={categories}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
        getColor={getCategoryColor}
      />
      <SortSelector sort={sort} onSortChange={setSort} />
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
      <EditModal
        task={taskToEdit}
        onClose={() => setTaskToEdit(null)}
        onSave={handleSaveEdited}
      />
    </main>
  );
}
