import { ClipboardList } from 'lucide-react'

export default function EmptyState({ hasFilters, onAdd }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-12 h-12 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center mb-4">
        <ClipboardList size={24} className="text-slate-400 dark:text-slate-500" />
      </div>

      {hasFilters ? (
        <>
          <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Sonuç bulunamadı.
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs">
            Filtre veya arama kriterlerinizle eşleşen görev bulunamadı. Filtreleri temizlemeyi deneyin.
          </p>
        </>
      ) : (
        <>
          <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Henüz görev yok
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mb-4">
            Staj sürecindeki görevlerinizi buraya ekleyerek takip etmeye başlayın.
          </p>
          <button
            id="btn-empty-add-task"
            onClick={onAdd}
            className="px-4 py-2 text-sm text-white bg-slate-900 dark:bg-white dark:text-slate-900 hover:bg-slate-700 dark:hover:bg-slate-100 rounded-md font-medium"
          >
            İlk Görevi Ekle
          </button>
        </>
      )}
    </div>
  )
}
