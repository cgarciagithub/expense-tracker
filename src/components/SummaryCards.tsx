import { formatCurrency } from '../utils/format'

interface Props {
  total: number
  count: number
  average: number
  periodLabel: string
}

export function SummaryCards({ total, count, average, periodLabel }: Props) {
  const cards = [
    { label: 'Total gastado', value: formatCurrency(total), accent: true },
    { label: 'Nº de gastos', value: String(count), accent: false },
    { label: 'Gasto medio', value: formatCurrency(average), accent: false },
  ]

  return (
    <div>
      <p className="mb-3 text-sm capitalize text-slate-500">{periodLabel}</p>
      <div className="grid grid-cols-3 gap-3">
        {cards.map((card) => (
          <div
            key={card.label}
            className={`rounded-2xl border p-4 shadow-sm ${
              card.accent
                ? 'border-slate-900 bg-slate-900 text-white'
                : 'border-slate-200 bg-white text-slate-900'
            }`}
          >
            <p
              className={`text-xs font-medium ${
                card.accent ? 'text-slate-300' : 'text-slate-500'
              }`}
            >
              {card.label}
            </p>
            <p className="mt-1 text-lg font-semibold sm:text-2xl">
              {card.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
