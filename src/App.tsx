import { useMemo, useState } from 'react'
import type { Expense, Period } from './types'
import { useExpenses } from './hooks/useExpenses'
import { periodLabel } from './utils/dates'
import {
  buildTrend,
  filterByPeriod,
  total,
  totalsByCategory,
} from './utils/summary'
import { PeriodTabs } from './components/PeriodTabs'
import { ExpenseForm } from './components/ExpenseForm'
import { ExpenseList } from './components/ExpenseList'
import { SummaryCards } from './components/SummaryCards'
import { CategoryChart } from './components/CategoryChart'
import { TrendChart } from './components/TrendChart'

function App() {
  const { expenses, addExpense, updateExpense, deleteExpense } = useExpenses()
  const [period, setPeriod] = useState<Period>('day')
  const [editing, setEditing] = useState<Expense | null>(null)

  const now = useMemo(() => new Date(), [])

  const filtered = useMemo(
    () => filterByPeriod(expenses, period, now),
    [expenses, period, now],
  )

  const periodTotal = useMemo(() => total(filtered), [filtered])
  const byCategory = useMemo(() => totalsByCategory(filtered), [filtered])
  const trend = useMemo(
    () => buildTrend(filtered, period, now),
    [filtered, period, now],
  )

  const handleSubmit = (input: Omit<Expense, 'id' | 'createdAt'>) => {
    if (editing) {
      updateExpense(editing.id, input)
      setEditing(null)
    } else {
      addExpense(input)
    }
  }

  return (
    <div className="min-h-screen">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-5">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              Mis Gastos
            </h1>
            <p className="text-sm text-slate-400">
              Control de gastos diarios, semanales y mensuales
            </p>
          </div>
          <PeriodTabs value={period} onChange={setPeriod} />
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-6">
        <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
          <div className="space-y-6">
            <ExpenseForm
              editing={editing}
              onSubmit={handleSubmit}
              onCancelEdit={() => setEditing(null)}
            />
          </div>

          <div className="space-y-6">
            <SummaryCards
              total={periodTotal}
              count={filtered.length}
              average={filtered.length ? periodTotal / filtered.length : 0}
              periodLabel={periodLabel(period, now)}
            />

            <div className="grid gap-6 xl:grid-cols-2">
              <TrendChart data={trend} period={period} />
              <CategoryChart data={byCategory} />
            </div>

            <div>
              <h2 className="mb-3 text-base font-semibold text-slate-900">
                Movimientos
              </h2>
              <ExpenseList
                expenses={filtered}
                onEdit={setEditing}
                onDelete={deleteExpense}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
