import type { Period } from '../types'

/** Local date as YYYY-MM-DD (avoids UTC off-by-one from toISOString). */
export function toISODate(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function todayISO(): string {
  return toISODate(new Date())
}

function parseISO(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d)
}

/** Monday as the first day of the week. */
export function startOfWeek(date: Date): Date {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  const day = d.getDay() // 0 = Sunday
  const diff = day === 0 ? -6 : 1 - day
  d.setDate(d.getDate() + diff)
  return d
}

export function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

/**
 * Whether an expense date falls within the given period relative to `ref`.
 */
export function isInPeriod(iso: string, period: Period, ref: Date): boolean {
  const date = parseISO(iso)
  switch (period) {
    case 'day':
      return toISODate(date) === toISODate(ref)
    case 'week': {
      const start = startOfWeek(ref)
      const end = new Date(start)
      end.setDate(start.getDate() + 6)
      return date >= start && date <= end
    }
    case 'month':
      return (
        date.getFullYear() === ref.getFullYear() &&
        date.getMonth() === ref.getMonth()
      )
  }
}

/** Human label for the current period, e.g. "Hoy", "Esta semana", "Julio 2026". */
export function periodLabel(period: Period, ref: Date): string {
  switch (period) {
    case 'day':
      return new Intl.DateTimeFormat('es-ES', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
      }).format(ref)
    case 'week': {
      const start = startOfWeek(ref)
      const end = new Date(start)
      end.setDate(start.getDate() + 6)
      const fmt = new Intl.DateTimeFormat('es-ES', {
        day: 'numeric',
        month: 'short',
      })
      return `${fmt.format(start)} – ${fmt.format(end)}`
    }
    case 'month':
      return new Intl.DateTimeFormat('es-ES', {
        month: 'long',
        year: 'numeric',
      }).format(ref)
  }
}
