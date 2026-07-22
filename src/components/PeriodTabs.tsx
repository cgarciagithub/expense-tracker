import type { Period } from '../types'

const TABS: { id: Period; label: string }[] = [
  { id: 'day', label: 'Diario' },
  { id: 'week', label: 'Semanal' },
  { id: 'month', label: 'Mensual' },
]

interface Props {
  value: Period
  onChange: (period: Period) => void
}

export function PeriodTabs({ value, onChange }: Props) {
  return (
    <div className="inline-flex rounded-xl bg-slate-100 p-1">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onChange(tab.id)}
          className={`rounded-lg px-4 py-1.5 text-sm font-medium transition ${
            value === tab.id
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
