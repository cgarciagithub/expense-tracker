import { useCallback } from 'react'
import type { Expense } from '../types'
import { useLocalStorage } from './useLocalStorage'

const STORAGE_KEY = 'expense-tracker:expenses'

export type NewExpense = Omit<Expense, 'id' | 'createdAt'>

function createId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`
}

export function useExpenses() {
  const [expenses, setExpenses] = useLocalStorage<Expense[]>(STORAGE_KEY, [])

  const addExpense = useCallback(
    (input: NewExpense) => {
      const expense: Expense = {
        ...input,
        id: createId(),
        createdAt: Date.now(),
      }
      setExpenses((prev) => [expense, ...prev])
    },
    [setExpenses],
  )

  const updateExpense = useCallback(
    (id: string, input: NewExpense) => {
      setExpenses((prev) =>
        prev.map((e) => (e.id === id ? { ...e, ...input } : e)),
      )
    },
    [setExpenses],
  )

  const deleteExpense = useCallback(
    (id: string) => {
      setExpenses((prev) => prev.filter((e) => e.id !== id))
    },
    [setExpenses],
  )

  const clearAll = useCallback(() => setExpenses([]), [setExpenses])

  return { expenses, addExpense, updateExpense, deleteExpense, clearAll }
}
