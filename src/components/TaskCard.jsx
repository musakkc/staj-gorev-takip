import { useState } from 'react'
import { Check, Pencil, Trash2, Calendar, Tag } from 'lucide-react'
import { formatDate, isOverdue, PRIORITY_LABELS } from '../utils/helpers'

const PRIORITY_STYLES = {
  high: {
    badge: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800',
    dot: 'bg-red-500',
    border: 'border-l-red-500',
  },
  medium: {
    badge: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800',
    dot: 'bg-amber-500',
    border: 'border-l-amber-500',
  },
  low: {
    badge: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800',
    dot: 'bg-emerald-500',
    border: 'border-l-emerald-500',
  },
}

export default function TaskCard({ task, onToggle, onEdit, onDelete }) {
  const [confirmDelete, setConfirmDelete] = useState(false)
  const styles = PRIORITY_STYLES[task.priority] || PRIORITY_STYLES.medium
  const overdue = !task.completed && isOverdue(task.dueDate)

  const handleDeleteClick = () => {
    if (confirmDelete) {
      onDelete(task.id)
    } else {
      setConfirmDelete(true)
      setTimeout(() => setConfirmDelete(false), 3000)
    }
  }

  return (
    <div
      className={`bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 border-l-4 ${styles.border} rounded-lg p-4 hover:shadow-sm transition-shadow ${task.completed ? 'opacity-60' : ''
        }`}
    >
      <div className="flex items-start gap-3">
        {/* Tamamlandı checkbox */}
        <button
          id={`btn-toggle-${task.id}`}
          onClick={() => onToggle(task.id)}
          aria-label={task.completed ? 'Tamamlanmamis olarak isaretle' : 'Tamamlandi olarak isaretle'}
          className={`mt-0.5 w-5 h-5 rounded border-2 flex-shrink-0 flex items-center justify-center transition-colors ${task.completed
            ? 'bg-slate-900 dark:bg-white border-slate-900 dark:border-white'
            : 'border-slate-300 dark:border-slate-600 hover:border-slate-500 dark:hover:border-slate-400'
            }`}
        >
          {task.completed && (
            <Check size={12} className="text-white dark:text-slate-900" strokeWidth={3} />
          )}
        </button>

        {/* İçerik */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3
              className={`text-sm font-medium text-slate-900 dark:text-white leading-snug ${task.completed ? 'line-through-text' : ''
                }`}
            >
              {task.title}
            </h3>

            {/* Aksiyon butonları */}
            <div className="flex items-center gap-1 flex-shrink-0">
              <button
                id={`btn-edit-${task.id}`}
                onClick={() => onEdit(task)}
                aria-label="Düzenle"
                className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 rounded"
              >
                <Pencil size={13} />
              </button>
              <button
                id={`btn-delete-${task.id}`}
                onClick={handleDeleteClick}
                aria-label={confirmDelete ? 'Onaylayın' : 'Sil'}
                className={`p-1.5 rounded transition-colors ${confirmDelete
                  ? 'text-red-600 bg-red-50 dark:bg-red-900/30 hover:bg-red-100'
                  : 'text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20'
                  }`}
              >
                <Trash2 size={13} />
              </button>
            </div>
          </div>

          {task.description && (
            <p
              className={`mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2 ${task.completed ? 'line-through-text' : ''
                }`}
            >
              {task.description}
            </p>
          )}

          {/* Meta bilgiler */}
          <div className="mt-2.5 flex flex-wrap items-center gap-2">
            {/* Öncelik badge */}
            <span
              className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded border font-medium ${styles.badge}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${styles.dot}`} />
              {PRIORITY_LABELS[task.priority]}
            </span>

            {/* Tarih */}
            {task.dueDate && (
              <span
                className={`inline-flex items-center gap-1 text-xs ${overdue
                  ? 'text-red-600 dark:text-red-400 font-medium'
                  : 'text-slate-500 dark:text-slate-400'
                  }`}
              >
                <Calendar size={11} />
                {overdue && 'Gecikti — '}
                {formatDate(task.dueDate)}
              </span>
            )}

            {/* Kategori */}
            {task.category && (
              <span className="inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                <Tag size={11} />
                {task.category}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Silme onay mesajı */}
      {confirmDelete && (
        <p className="mt-2 text-xs text-red-600 dark:text-red-400 text-right">
          Onaylamak için tekrar tıklayın.
        </p>
      )}
    </div>
  )
}
