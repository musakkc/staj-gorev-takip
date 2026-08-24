import TaskCard from './TaskCard'
import EmptyState from './EmptyState'
import { PRIORITY_ORDER } from '../utils/helpers'

function applyFiltersAndSort(tasks, filters) {
  let result = [...tasks]

  // Arama
  if (filters.search.trim()) {
    const q = filters.search.toLowerCase()
    result = result.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        (t.description && t.description.toLowerCase().includes(q)) ||
        (t.category && t.category.toLowerCase().includes(q))
    )
  }

  // Öncelik filtresi
  if (filters.priority !== 'all') {
    result = result.filter((t) => t.priority === filters.priority)
  }

  // Durum filtresi
  if (filters.status === 'active') {
    result = result.filter((t) => !t.completed)
  } else if (filters.status === 'completed') {
    result = result.filter((t) => t.completed)
  } else if (filters.status === 'overdue') {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    result = result.filter((t) => !t.completed && t.dueDate && new Date(t.dueDate) < today)
  }

  // Sıralama
  result.sort((a, b) => {
    switch (filters.sort) {
      case 'date-desc':
        return (b.dueDate || '').localeCompare(a.dueDate || '')
      case 'date-asc':
        return (a.dueDate || '').localeCompare(b.dueDate || '')
      case 'priority':
        return (PRIORITY_ORDER[a.priority] ?? 1) - (PRIORITY_ORDER[b.priority] ?? 1)
      case 'created':
      default:
        return new Date(b.createdAt) - new Date(a.createdAt)
    }
  })

  return result
}

export default function TaskList({ tasks, filters, onToggle, onEdit, onDelete, onAdd }) {
  const filtered = applyFiltersAndSort(tasks, filters)
  const hasFilters =
    filters.search || filters.priority !== 'all' || filters.status !== 'all'

  if (filtered.length === 0) {
    return <EmptyState hasFilters={!!hasFilters} onAdd={onAdd} />
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {filtered.length} görev gösteriliyor
          {tasks.length !== filtered.length && ` (toplam ${tasks.length})`}
        </p>
      </div>
      <div className="space-y-2">
        {filtered.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onToggle={onToggle}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  )
}
