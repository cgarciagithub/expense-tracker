import type { Expense } from '../types'
import { CATEGORY_MAP } from '../types'
import { formatCurrency, formatDate } from '../utils/format'

interface Props {
  expenses: Expense[]
  onEdit: (expense: Expense) => void
  onDelete: (id: string) => void
}

export function ExpenseList({ expenses, onEdit, onDelete }: Props) {
  if (expenses.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-10 text-center">
        <p className="text-sm text-slate-400">
          No hay gastos en este periodo. Añade el primero desde el formulario.
        </p>
      </div>
    )
  }

  const sorted = [...expenses].sort((a, b) =>
    a.date === b.date ? b.createdAt - a.createdAt : a.date < b.date ? 1 : -1,
  )

  return (
    <ul className="divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {sorted.map((expense) => {
        const cat = CATEGORY_MAP[expense.category]
        return (
          <li
            key={expense.id}
            className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50"
          >
            <span
              className="h-9 w-9 shrink-0 rounded-full"
              style={{ backgroundColor: `${cat.color}22` }}
              aria-hidden
            >
              <span
                className="mx-auto mt-3 block h-3 w-3 rounded-full"
                style={{ backgroundColor: cat.color }}
              />
            </span>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-slate-900">
                {expense.description}
              </p>
              <p className="text-xs text-slate-400">
                {cat.label} · {formatDate(expense.date)}
              </p>
            </div>

            <span className="text-sm font-semibold text-slate-900">
              {formatCurrency(expense.amount)}
            </span>

            <div className="flex gap-1">
              <button
                type="button"
                onClick={() => onEdit(expense)}
                className="rounded-md p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                aria-label={`Editar ${expense.description}`}
                title="Editar"
              >
                <PencilIcon />
              </button>
              <button
                type="button"
                onClick={() => onDelete(expense.id)}
                className="rounded-md p-1.5 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                aria-label={`Eliminar ${expense.description}`}
                title="Eliminar"
              >
                <TrashIcon />
              </button>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

function PencilIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
  )
}

function TrashIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  )
}
