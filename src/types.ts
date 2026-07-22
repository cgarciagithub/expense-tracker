export type ExpenseCategory =
  | 'comida'
  | 'transporte'
  | 'hogar'
  | 'ocio'
  | 'salud'
  | 'compras'
  | 'servicios'
  | 'otros'

export interface Expense {
  id: string
  amount: number
  description: string
  category: ExpenseCategory
  /** ISO date string (YYYY-MM-DD) */
  date: string
  /** epoch millis when the record was created */
  createdAt: number
}

export type Period = 'day' | 'week' | 'month'

export interface CategoryInfo {
  id: ExpenseCategory
  label: string
  color: string
}

export const CATEGORIES: CategoryInfo[] = [
  { id: 'comida', label: 'Comida', color: '#f97316' },
  { id: 'transporte', label: 'Transporte', color: '#3b82f6' },
  { id: 'hogar', label: 'Hogar', color: '#14b8a6' },
  { id: 'ocio', label: 'Ocio', color: '#a855f7' },
  { id: 'salud', label: 'Salud', color: '#ef4444' },
  { id: 'compras', label: 'Compras', color: '#ec4899' },
  { id: 'servicios', label: 'Servicios', color: '#eab308' },
  { id: 'otros', label: 'Otros', color: '#64748b' },
]

export const CATEGORY_MAP: Record<ExpenseCategory, CategoryInfo> =
  CATEGORIES.reduce(
    (acc, c) => {
      acc[c.id] = c
      return acc
    },
    {} as Record<ExpenseCategory, CategoryInfo>,
  )
