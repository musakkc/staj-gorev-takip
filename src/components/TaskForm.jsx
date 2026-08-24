import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { generateId } from '../utils/helpers'

const EMPTY_FORM = {
  title: '',
  description: '',
  priority: 'medium',
  dueDate: '',
  category: '',
}

export default function TaskForm({ isOpen, onClose, onSave, editingTask }) {
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (editingTask) {
      setForm({
        title: editingTask.title || '',
        description: editingTask.description || '',
        priority: editingTask.priority || 'medium',
        dueDate: editingTask.dueDate || '',
        category: editingTask.category || '',
      })
    } else {
      setForm(EMPTY_FORM)
    }
    setErrors({})
  }, [editingTask, isOpen])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const newErrors = {}
    if (!form.title.trim()) newErrors.title = 'Görev adı zorunludur.'
    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    const task = editingTask
      ? { ...editingTask, ...form, title: form.title.trim(), updatedAt: new Date().toISOString() }
      : {
        id: generateId(),
        ...form,
        title: form.title.trim(),
        completed: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

    onSave(task)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/30 dark:bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="relative bg-white dark:bg-slate-800 rounded-lg shadow-xl w-full max-w-md border border-slate-200 dark:border-slate-700">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-slate-700">
          <h2
            id="modal-title"
            className="text-sm font-semibold text-slate-900 dark:text-white"
          >
            {editingTask ? 'Görevi Düzenle' : 'Yeni Görev Ekle'}
          </h2>
          <button
            id="btn-close-modal"
            onClick={onClose}
            aria-label="Kapat"
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate>
          <div className="px-5 py-4 space-y-4">
            {/* Görev Adı */}
            <div>
              <label
                htmlFor="field-title"
                className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1"
              >
                Görev Adı <span className="text-red-500">*</span>
              </label>
              <input
                id="field-title"
                name="title"
                type="text"
                value={form.title}
                onChange={handleChange}
                placeholder="Görevi kısaca tanımlayın..."
                maxLength={100}
                className={`w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-700 border rounded-md text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 dark:focus:ring-slate-500 ${errors.title
                  ? 'border-red-400 dark:border-red-500'
                  : 'border-slate-200 dark:border-slate-600'
                  }`}
              />
              {errors.title && (
                <p className="mt-1 text-xs text-red-500">{errors.title}</p>
              )}
            </div>

            {/* Açıklama */}
            <div>
              <label
                htmlFor="field-description"
                className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1"
              >
                Açıklama
              </label>
              <textarea
                id="field-description"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Daha fazla detay ekleyin..."
                rows={3}
                maxLength={500}
                className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-md text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 dark:focus:ring-slate-500 resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              {/* Öncelik */}
              <div>
                <label
                  htmlFor="field-priority"
                  className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1"
                >
                  Öncelik
                </label>
                <select
                  id="field-priority"
                  name="priority"
                  value={form.priority}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-md text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-300 dark:focus:ring-slate-500 cursor-pointer"
                >
                  <option value="low">Düşük</option>
                  <option value="medium">Orta</option>
                  <option value="high">Yüksek</option>
                </select>
              </div>

              {/* Tarih */}
              <div>
                <label
                  htmlFor="field-due-date"
                  className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1"
                >
                  Son Tarih
                </label>
                <input
                  id="field-due-date"
                  name="dueDate"
                  type="date"
                  value={form.dueDate}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-md text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-300 dark:focus:ring-slate-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Kategori */}
            <div>
              <label
                htmlFor="field-category"
                className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1"
              >
                Kategori
              </label>
              <input
                id="field-category"
                name="category"
                type="text"
                value={form.category}
                onChange={handleChange}
                placeholder="Örnek: Frontend, Tasarım, API..."
                maxLength={50}
                className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-md text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 dark:focus:ring-slate-500"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="px-5 py-4 border-t border-slate-200 dark:border-slate-700 flex gap-2 justify-end">
            <button
              id="btn-cancel-form"
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-md font-medium"
            >
              İptal
            </button>
            <button
              id="btn-save-task"
              type="submit"
              className="px-4 py-2 text-sm text-white bg-slate-900 dark:bg-white dark:text-slate-900 hover:bg-slate-700 dark:hover:bg-slate-100 rounded-md font-medium"
            >
              {editingTask ? 'Kaydet' : 'Görev Ekle'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
