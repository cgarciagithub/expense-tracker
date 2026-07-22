import type { Expense, ExpenseCategory, Period } from '../types'
import { CATEGORY_MAP } from '../types'
import { isInPeriod, startOfWeek, toISODate } from './dates'

export function filterByPeriod(
  expenses: Expense[],
  period: Period,
  ref: Date,
): Expense[] {
  return expenses.filter((e) => isInPeriod(e.date, period, ref))
}

export function total(expenses: Expense[]): number {
  return expenses.reduce((sum, e) => sum + e.amount, 0)
}

export interface CategoryTotal {
  category: ExpenseCategory
  label: string
  color: string
  value: number
}

export function totalsByCategory(expenses: Expense[]): CategoryTotal[] {
  const map = new Map<ExpenseCategory, number>()
  for (const e of expenses) {
    map.set(e.category, (map.get(e.category) ?? 0) + e.amount)
  }
  return Array.from(map.entries())
    .map(([category, value]) => ({
      category,
      label: CATEGORY_MAP[category].label,
      color: CATEGORY_MAP[category].color,
      value,
    }))
    .sort((a, b) => b.value - a.value)
}

export interface TrendPoint {
  label: string
  key: string
  value: number
}

/**
 * Builds a bar-chart series for the given period:
 *  - day   -> hourly buckets are overkill, so show the 7 days of that week
 *  - week  -> each day (Mon..Sun)
 *  - month -> each day of the month
 */
export function buildTrend(
  expenses: Expense[],
  period: Period,
  ref: Date,
): TrendPoint[] {
  if (period === 'month') {
    const year = ref.getFullYear()
    const month = ref.getMonth()
    const days = new Date(year, month + 1, 0).getDate()
    const points: TrendPoint[] = []
    for (let d = 1; d <= days; d++) {
      const date = new Date(year, month, d)
      const key = toISODate(date)
      points.push({ key, label: String(d), value: 0 })
    }
    const byKey = new Map(points.map((p) => [p.key, p]))
    for (const e of expenses) {
      const p = byKey.get(e.date)
      if (p) p.value += e.amount
    }
    return points
  }

  // day and week both render the Mon..Sun of the reference week
  const start = startOfWeek(ref)
  const dayNames = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']
  const points: TrendPoint[] = []
  for (let i = 0; i < 7; i++) {
    const date = new Date(start)
    date.setDate(start.getDate() + i)
    points.push({ key: toISODate(date), label: dayNames[i], value: 0 })
  }
  const byKey = new Map(points.map((p) => [p.key, p]))
  for (const e of expenses) {
    const p = byKey.get(e.date)
    if (p) p.value += e.amount
  }
  return points
}
