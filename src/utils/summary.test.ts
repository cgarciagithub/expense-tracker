import { describe, expect, it } from 'vitest'
import type { Expense } from '../types'
import {
  buildTrend,
  filterByPeriod,
  total,
  totalsByCategory,
} from './summary'

function expense(partial: Partial<Expense>): Expense {
  return {
    id: Math.random().toString(36).slice(2),
    amount: 10,
    description: 'test',
    category: 'comida',
    date: '2026-07-22',
    createdAt: Date.now(),
    ...partial,
  }
}

// Reference date: Wednesday 2026-07-22 (week Mon 20 -> Sun 26)
const ref = new Date(2026, 6, 22)

describe('filterByPeriod', () => {
  const expenses = [
    expense({ date: '2026-07-22' }), // same day
    expense({ date: '2026-07-20' }), // same week (Monday)
    expense({ date: '2026-07-26' }), // same week (Sunday)
    expense({ date: '2026-07-15' }), // same month, other week
    expense({ date: '2026-06-30' }), // other month
  ]

  it('filters by day', () => {
    expect(filterByPeriod(expenses, 'day', ref)).toHaveLength(1)
  })

  it('filters by week (Mon-Sun)', () => {
    expect(filterByPeriod(expenses, 'week', ref)).toHaveLength(3)
  })

  it('filters by month', () => {
    expect(filterByPeriod(expenses, 'month', ref)).toHaveLength(4)
  })
})

describe('total', () => {
  it('sums amounts', () => {
    expect(total([expense({ amount: 5 }), expense({ amount: 2.5 })])).toBe(7.5)
  })

  it('returns 0 for empty', () => {
    expect(total([])).toBe(0)
  })
})

describe('totalsByCategory', () => {
  it('groups and sorts descending', () => {
    const result = totalsByCategory([
      expense({ category: 'comida', amount: 5 }),
      expense({ category: 'ocio', amount: 20 }),
      expense({ category: 'comida', amount: 5 }),
    ])
    expect(result[0]).toMatchObject({ category: 'ocio', value: 20 })
    expect(result[1]).toMatchObject({ category: 'comida', value: 10 })
  })
})

describe('buildTrend', () => {
  it('produces 7 points for week', () => {
    const points = buildTrend(
      [expense({ date: '2026-07-22', amount: 12 })],
      'week',
      ref,
    )
    expect(points).toHaveLength(7)
    // Wednesday is index 2 (Mon, Tue, Wed)
    expect(points[2]).toMatchObject({ label: 'Mié', value: 12 })
  })

  it('produces one point per day of the month', () => {
    const points = buildTrend([], 'month', ref)
    expect(points).toHaveLength(31) // July has 31 days
  })
})
