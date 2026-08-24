import { Search, X } from 'lucide-react'

const PRIORITY_OPTIONS = [
  { value: 'all', label: 'Tüm Öncelikler' },
  { value: 'high', label: 'Yüksek' },
  { value: 'medium', label: 'Orta' },
  { value: 'low', label: 'Düşük' },
]

const STATUS_OPTIONS = [
  { value: 'all', label: 'Tüm Durumlar' },
  { value: 'active', label: 'Devam Eden' },
  { value: 'completed', label: 'Tamamlanan' },
  { value: 'overdue', label: 'Geciken' },
]

const SORT_OPTIONS = [
  { value: 'date-desc', label: 'Tarihe Göre (Yeni)' },
  { value: 'date-asc', label: 'Tarihe Göre (Eski)' },
  { value: 'priority', label: 'Öncelik' },
  { value: 'created', label: 'Eklenme Sırası' },
]

export default function FilterBar({ filters, onChange }) {
  const handleSearch = (e) => onChange({ ...filters, search: e.target.value })
  const handlePriority = (e) => onChange({ ...filters, priority: e.target.value })
  const handleStatus = (e) => onChange({ ...filters, status: e.target.value })
  const handleSort = (e) => onChange({ ...filters, sort: e.target.value })
  const clearSearch = () => onChange({ ...filters, search: '' })

  const hasActiveFilters =
    filters.search || filters.priority !== 'all' || filters.status !== 'all'

  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-3">
      <div className="flex flex-col sm:flex-row gap-2">
        {/* Arama */}
        <div className="relative flex-1">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
          />
          <input
            id="input-search"
            type="text"
            placeholder="Görev ara..."
            value={filters.search}
            onChange={handleSearch}
            className="w-full pl-9 pr-8 py-2 text-sm bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-md text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 dark:focus:ring-slate-500"
          />
          {filters.search && (
            <button
              onClick={clearSearch}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              aria-label="Aramayı temizle"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Filtreler */}
        <div className="flex gap-2 flex-wrap sm:flex-nowrap">
          <select
            id="select-priority-filter"
            value={filters.priority}
            onChange={handlePriority}
            className="flex-1 sm:flex-none py-2 px-3 text-sm bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-md text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-300 dark:focus:ring-slate-500 cursor-pointer"
          >
            {PRIORITY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          <select
            id="select-status-filter"
            value={filters.status}
            onChange={handleStatus}
            className="flex-1 sm:flex-none py-2 px-3 text-sm bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-md text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-300 dark:focus:ring-slate-500 cursor-pointer"
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          <select
            id="select-sort"
            value={filters.sort}
            onChange={handleSort}
            className="flex-1 sm:flex-none py-2 px-3 text-sm bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-md text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-300 dark:focus:ring-slate-500 cursor-pointer"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {hasActiveFilters && (
        <div className="mt-2 flex items-center gap-2">
          <span className="text-xs text-slate-500 dark:text-slate-400">Aktif filtre var</span>
          <button
            id="btn-clear-filters"
            onClick={() =>
              onChange({ search: '', priority: 'all', status: 'all', sort: filters.sort })
            }
            className="text-xs text-slate-600 dark:text-slate-300 underline hover:no-underline"
          >
            Temizle
          </button>
        </div>
      )}
    </div>
  )
}
