import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import type { CategoryTotal } from '../utils/summary'
import { formatCurrency } from '../utils/format'

interface Props {
  data: CategoryTotal[]
}

export function CategoryChart({ data }: Props) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-base font-semibold text-slate-900">
        Por categoría
      </h2>
      {data.length === 0 ? (
        <p className="py-10 text-center text-sm text-slate-400">
          Sin datos para mostrar.
        </p>
      ) : (
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <div className="h-48 w-48 shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="label"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                >
                  {data.map((entry) => (
                    <Cell key={entry.category} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => formatCurrency(value)}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <ul className="flex-1 space-y-2">
            {data.map((entry) => (
              <li
                key={entry.category}
                className="flex items-center gap-2 text-sm"
              >
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: entry.color }}
                />
                <span className="flex-1 text-slate-600">{entry.label}</span>
                <span className="font-medium text-slate-900">
                  {formatCurrency(entry.value)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
