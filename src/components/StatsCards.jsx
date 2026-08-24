export default function StatsCards({ tasks }) {
  const total = tasks.length
  const completed = tasks.filter((t) => t.completed).length
  const inProgress = total - completed
  const highPriority = tasks.filter((t) => t.priority === 'high' && !t.completed).length

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const overdue = tasks.filter((t) => {
    if (!t.dueDate || t.completed) return false
    return new Date(t.dueDate) < today
  }).length

  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0

  const cards = [
    {
      id: 'stat-total',
      label: 'Toplam Görev',
      value: total,
      sub: 'kayıtlı görev',
      color: 'text-slate-700 dark:text-slate-200',
      bg: 'bg-white dark:bg-slate-800',
      bar: null,
    },
    {
      id: 'stat-completed',
      label: 'Tamamlanan',
      value: completed,
      sub: `${completionRate}% tamamlandı`,
      color: 'text-emerald-700 dark:text-emerald-400',
      bg: 'bg-white dark:bg-slate-800',
      bar: { value: completionRate, color: 'bg-emerald-500' },
    },
    {
      id: 'stat-inprogress',
      label: 'Devam Eden',
      value: inProgress,
      sub: 'bekleyen görev',
      color: 'text-blue-700 dark:text-blue-400',
      bg: 'bg-white dark:bg-slate-800',
      bar: null,
    },
    {
      id: 'stat-high',
      label: 'Yüksek Öncelik',
      value: highPriority,
      sub: 'acil görev',
      color: 'text-red-700 dark:text-red-400',
      bg: 'bg-white dark:bg-slate-800',
      bar: null,
    },
    {
      id: 'stat-overdue',
      label: 'Geciken',
      value: overdue,
      sub: 'tarihi geçmiş',
      color: overdue > 0 ? 'text-orange-700 dark:text-orange-400' : 'text-slate-500 dark:text-slate-400',
      bg: overdue > 0 ? 'bg-orange-50 dark:bg-orange-900/10' : 'bg-white dark:bg-slate-800',
      bar: null,
    },
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      {cards.map((card) => (
        <div
          key={card.id}
          id={card.id}
          className={`${card.bg} border border-slate-200 dark:border-slate-700 rounded-lg p-4`}
        >
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">
            {card.label}
          </p>
          <p className={`text-2xl font-bold ${card.color} mb-1`}>{card.value}</p>
          <p className="text-xs text-slate-400 dark:text-slate-500">{card.sub}</p>
          {card.bar && (
            <div className="mt-2 h-1 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
              <div
                className={`h-1 ${card.bar.color} rounded-full transition-all duration-500`}
                style={{ width: `${card.bar.value}%` }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
