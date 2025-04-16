'use client';

import { useEffect, useState } from 'react';
import { Task } from '@/types/task';
import AppWrapper from '@/components/AppWrapper';
import Navbar from '@/components/Navbar';
import TodayTasks from '@/components/TodayTasks';
import TaskItem from '@/components/TaskItem';
import TaskForm from '@/components/TaskForm';
import CategoryManager from '@/components/CategoryManager';
import SortSelector from '@/components/SortSelector';
import StatusFilter from '@/components/StatusFilter';
import EditModal from '@/components/EditModal';
import TaskModal from '@/components/TaskModal';
import ExportImportControls from '@/components/ExportImportControls';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';

export default function Page() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [previewTask, setPreviewTask] = useState<Task | null>(null);
  const [sort, setSort] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    const storedCategories = localStorage.getItem('categories');
    if (storedTasks) setTasks(JSON.parse(storedTasks));
    if (storedCategories) setCategories(JSON.parse(storedCategories));
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);

  const handleAddTask = (title: string, description: string, category: string, deadline: string) => {
    const newTask: Task = {
      id: uuidv4(),
      title,
      description,
      category,
      deadline,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    toast.success('Zadanie dodane!');
  };

  const handleDelete = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
    toast('Zadanie usunięte');
  };

  const handleToggle = (id: string) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const handleEdit = (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (task) setTaskToEdit(task);
  };

  const handleSaveEdited = (updated: Task) => {
    setTasks(tasks.map(t => t.id === updated.id ? updated : t));
  };

  const handleAddCategory = (name: string) => {
    if (!categories.includes(name)) {
      setCategories([...categories, name]);
      toast.success('Dodano kategorię!');
    }
  };

  const handleDeleteCategory = (name: string) => {
    if (tasks.some(t => t.category === name)) {
      toast.error('Nie można usunąć kategorii przypisanej do zadania!');
      return;
    }
    setCategories(categories.filter(c => c !== name));
  };

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const movedTask = tasks.find(t => t.id === result.draggableId);
    if (!movedTask) return;

    const updated = { ...movedTask, category: destination.droppableId };
    const newTasks = tasks.filter(t => t.id !== movedTask.id);
    newTasks.splice(destination.index, 0, updated);

    setTasks(newTasks);
  };

  const getCategoryColor = (() => {
    const cache = new Map<string, string>();
    const palette = [
      'bg-red-500', 'bg-blue-500', 'bg-green-500',
      'bg-yellow-500', 'bg-purple-500', 'bg-pink-500',
      'bg-orange-500', 'bg-teal-500', 'bg-rose-500',
    ];
    return (name: string) => {
      if (cache.has(name)) return cache.get(name)!;
      let hash = 0;
      for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
      const color = palette[Math.abs(hash) % palette.length];
      cache.set(name, color);
      return color;
    };
  })();

  const filteredTasks = (cat: string) => {
    let result = tasks.filter(t => t.category === cat);

    if (statusFilter === 'done') result = result.filter(t => t.completed);
    if (statusFilter === 'active') result = result.filter(t => !t.completed);

    if (sort === 'title-asc') result.sort((a, b) => a.title.localeCompare(b.title));
    if (sort === 'title-desc') result.sort((a, b) => b.title.localeCompare(a.title));
    if (sort === 'date-asc') result.sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
    if (sort === 'date-desc') result.sort((a, b) => new Date(b.deadline).getTime() - new Date(a.deadline).getTime());

    return result;
  };

  return (
    <AppWrapper tasks={tasks} onImport={setTasks}>
      <Navbar />

      <div className="mt-24 flex flex-col gap-4 w-full px-4">
        <TodayTasks
          tasks={tasks}
          onEdit={handleEdit}
          onPreview={setPreviewTask}
          getCategoryColor={getCategoryColor}
        />

        <div className="flex flex-col lg:flex-row gap-4">
          <CategoryManager
            categories={categories}
            onAdd={handleAddCategory}
            onDelete={handleDeleteCategory}
          />
          <TaskForm
            onAdd={handleAddTask}
            categories={categories}
          />
        </div>

        <SortSelector sort={sort} onSortChange={setSort} />
        <StatusFilter status={statusFilter} onChange={setStatusFilter} />

        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
            {categories.map(cat => (
              <Droppable key={cat} droppableId={cat}>
                {provided => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md min-h-[300px] flex flex-col"
                  >
                    <h3 className="text-md font-semibold mb-3 flex items-center gap-2">
                      <span className={`w-3 h-3 rounded-full ${getCategoryColor(cat)}`}></span>
                      {cat}
                    </h3>
                    <ul className="flex-1 space-y-2">
                      {filteredTasks(cat).map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {provided => (
                            <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                              <TaskItem
                                task={task}
                                onToggle={handleToggle}
                                onDelete={handleDelete}
                                onEdit={handleEdit}
                                onPreview={setPreviewTask}
                                getCategoryColor={getCategoryColor}
                              />
                            </li>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </ul>
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      </div>

      {/* Przyciski Export/Import przypięte do dolnego prawego rogu */}
      <div className="fixed bottom-4 right-4 z-50">
        <ExportImportControls tasks={tasks} onImport={setTasks} />
      </div>

      <EditModal
        task={taskToEdit}
        onClose={() => setTaskToEdit(null)}
        onSave={handleSaveEdited}
        categories={categories}
      />

      <TaskModal
        task={previewTask}
        onClose={() => setPreviewTask(null)}
        getCategoryColor={getCategoryColor}
      />
    </AppWrapper>
  );
}
