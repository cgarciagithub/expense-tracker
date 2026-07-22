import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { Period } from '../types'
import type { TrendPoint } from '../utils/summary'
import { formatCurrency } from '../utils/format'

interface Props {
  data: TrendPoint[]
  period: Period
}

const TITLES: Record<Period, string> = {
  day: 'Gastos de la semana',
  week: 'Gastos por día',
  month: 'Gastos del mes',
}

export function TrendChart({ data, period }: Props) {
  const hasData = data.some((d) => d.value > 0)
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-base font-semibold text-slate-900">
        {TITLES[period]}
      </h2>
      {!hasData ? (
        <p className="py-10 text-center text-sm text-slate-400">
          Sin datos para mostrar.
        </p>
      ) : (
        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 8, right: 8, left: 8, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="label"
                tick={{ fontSize: 11, fill: '#94a3b8' }}
                interval={period === 'month' ? 2 : 0}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: '#94a3b8' }}
                tickLine={false}
                axisLine={false}
                width={40}
              />
              <Tooltip
                formatter={(value: number) => formatCurrency(value)}
                cursor={{ fill: '#f1f5f9' }}
              />
              <Bar dataKey="value" fill="#0f172a" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}
