import { useState, useEffect } from 'react'
import { Plus } from 'lucide-react'
import Header from './components/Header'
import StatsCards from './components/StatsCards'
import FilterBar from './components/FilterBar'
import TaskList from './components/TaskList'
import TaskForm from './components/TaskForm'
import { useLocalStorage } from './hooks/useLocalStorage'
import { DEFAULT_TASKS } from './data/defaultTasks'

const DEFAULT_FILTERS = {
  search: '',
  priority: 'all',
  status: 'all',
  sort: 'created',
}

export default function App() {
  const [tasks, setTasks] = useLocalStorage('staj-tasks', [])
  const [darkMode, setDarkMode] = useLocalStorage('staj-dark-mode', false)
  const [formOpen, setFormOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [filters, setFilters] = useState(DEFAULT_FILTERS)

  // İlk açılışta LocalStorage boşsa örnek verileri yükle
  useEffect(() => {
    const stored = window.localStorage.getItem('staj-tasks')
    if (!stored || JSON.parse(stored).length === 0) {
      setTasks(DEFAULT_TASKS)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Örnek verileri sıfırla
  const handleResetToDefaults = () => {
    if (window.confirm('Tüm görevler silinerek örnek veriler yüklenecek. Devam etmek istiyor musunuz?')) {
      setTasks(DEFAULT_TASKS)
    }
  }

  // Dark mode uygula
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  // CREATE & UPDATE
  const handleSave = (task) => {
    setTasks((prev) => {
      const exists = prev.find((t) => t.id === task.id)
      if (exists) {
        return prev.map((t) => (t.id === task.id ? task : t))
      }
      return [task, ...prev]
    })
  }

  // DELETE
  const handleDelete = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }

  // TOGGLE tamamlandı
  const handleToggle = (id) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, completed: !t.completed, updatedAt: new Date().toISOString() }
          : t
      )
    )
  }

  const handleEdit = (task) => {
    setEditingTask(task)
    setFormOpen(true)
  }

  const handleAdd = () => {
    setEditingTask(null)
    setFormOpen(true)
  }

  const handleCloseForm = () => {
    setFormOpen(false)
    setEditingTask(null)
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Header darkMode={darkMode} onToggleDark={() => setDarkMode(!darkMode)} onResetDefaults={handleResetToDefaults} />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-5">
        {/* İstatistikler */}
        <StatsCards tasks={tasks} />

        {/* Kontroller: Filtre + Yeni Görev */}
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex-1">
            <FilterBar filters={filters} onChange={setFilters} />
          </div>
          <button
            id="btn-add-task"
            onClick={handleAdd}
            className="flex items-center justify-center gap-2 px-4 py-2 text-sm text-white bg-slate-900 dark:bg-white dark:text-slate-900 hover:bg-slate-700 dark:hover:bg-slate-100 rounded-lg font-medium whitespace-nowrap self-start sm:self-stretch"
          >
            <Plus size={16} />
            Yeni Gorev
          </button>
        </div>

        {/* Görev Listesi */}
        <TaskList
          tasks={tasks}
          filters={filters}
          onToggle={handleToggle}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onAdd={handleAdd}
        />
      </main>

      {/* Modal */}
      <TaskForm
        isOpen={formOpen}
        onClose={handleCloseForm}
        onSave={handleSave}
        editingTask={editingTask}
      />
    </div>
  )
}
