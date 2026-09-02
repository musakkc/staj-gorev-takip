import { Moon, Sun, RotateCcw } from 'lucide-react'

export default function Header({ darkMode, onToggleDark, onResetDefaults }) {
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

        <div className="flex items-center gap-1">
          {/* Örnek verileri sıfırla */}
          <button
            id="btn-reset-defaults"
            onClick={onResetDefaults}
            aria-label="Örnek verileri geri yükle"
            title="Örnek Verileri Geri Yükle"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-200 rounded-md transition-colors"
          >
            <RotateCcw size={13} />
            <span>Örnek Verileri Sıfırla</span>
          </button>

          {/* Mobil için sadece ikon */}
          <button
            id="btn-reset-defaults-mobile"
            onClick={onResetDefaults}
            aria-label="Örnek verileri geri yükle"
            title="Örnek Verileri Geri Yükle"
            className="sm:hidden p-2 rounded-md text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <RotateCcw size={16} />
          </button>

          {/* Dark mode toggle */}
          <button
            id="btn-dark-mode-toggle"
            onClick={onToggleDark}
            aria-label="Tema değiştir"
            className="p-2 rounded-md text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </header>
  )
}
