import { useEffect, useState } from 'react'
import type { Expense, ExpenseCategory } from '../types'
import { CATEGORIES } from '../types'
import type { NewExpense } from '../hooks/useExpenses'
import { todayISO } from '../utils/dates'

interface Props {
  editing: Expense | null
  onSubmit: (expense: NewExpense) => void
  onCancelEdit: () => void
}

const emptyForm = () => ({
  amount: '',
  description: '',
  category: 'comida' as ExpenseCategory,
  date: todayISO(),
})

export function ExpenseForm({ editing, onSubmit, onCancelEdit }: Props) {
  const [form, setForm] = useState(emptyForm)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (editing) {
      setForm({
        amount: String(editing.amount),
        description: editing.description,
        category: editing.category,
        date: editing.date,
      })
      setError(null)
    } else {
      setForm(emptyForm())
    }
  }, [editing])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const amount = parseFloat(form.amount.replace(',', '.'))
    if (!Number.isFinite(amount) || amount <= 0) {
      setError('Introduce un importe válido mayor que 0.')
      return
    }
    if (!form.description.trim()) {
      setError('Añade una descripción.')
      return
    }
    onSubmit({
      amount: Math.round(amount * 100) / 100,
      description: form.description.trim(),
      category: form.category,
      date: form.date,
    })
    setForm(emptyForm())
    setError(null)
  }

  const inputClass =
    'w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-200'

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
    >
      <h2 className="mb-4 text-base font-semibold text-slate-900">
        {editing ? 'Editar gasto' : 'Nuevo gasto'}
      </h2>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-slate-500">
            Importe (€)
          </span>
          <input
            type="text"
            inputMode="decimal"
            placeholder="0,00"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            className={inputClass}
            aria-label="Importe"
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-xs font-medium text-slate-500">
            Fecha
          </span>
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className={inputClass}
            aria-label="Fecha"
          />
        </label>

        <label className="block sm:col-span-2">
          <span className="mb-1 block text-xs font-medium text-slate-500">
            Descripción
          </span>
          <input
            type="text"
            placeholder="Ej. Café con leche"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            className={inputClass}
            aria-label="Descripción"
          />
        </label>

        <label className="block sm:col-span-2">
          <span className="mb-1 block text-xs font-medium text-slate-500">
            Categoría
          </span>
          <select
            value={form.category}
            onChange={(e) =>
              setForm({
                ...form,
                category: e.target.value as ExpenseCategory,
              })
            }
            className={inputClass}
            aria-label="Categoría"
          >
            {CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

      <div className="mt-4 flex gap-2">
        <button
          type="submit"
          className="flex-1 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
        >
          {editing ? 'Guardar cambios' : 'Añadir gasto'}
        </button>
        {editing && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  )
}
