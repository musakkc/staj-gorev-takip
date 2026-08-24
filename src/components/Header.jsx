import { Moon, Sun } from 'lucide-react'

export default function Header({ darkMode, onToggleDark }) {
  return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-slate-900 dark:bg-white rounded-md flex items-center justify-center">
            <span className="text-white dark:text-slate-900 text-sm font-bold select-none">G</span>
          </div>
          <div>
            <h1 className="text-base font-semibold text-slate-900 dark:text-white leading-tight">
              Staj Görev Takip
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-tight hidden sm:block">
              Görevlerini yönet, ilerlemeni takip et
            </p>
          </div>
        </div>

        <button
          id="btn-dark-mode-toggle"
          onClick={onToggleDark}
          aria-label="Tema değiştir"
          className="p-2 rounded-md text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </header>
  )
}
