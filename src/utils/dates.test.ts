import { describe, expect, it } from 'vitest'
import { isInPeriod, startOfWeek, toISODate } from './dates'

describe('toISODate', () => {
  it('formats local date without UTC shift', () => {
    expect(toISODate(new Date(2026, 0, 5))).toBe('2026-01-05')
  })
})

describe('startOfWeek', () => {
  it('returns Monday for a mid-week date', () => {
    // Wednesday 2026-07-22 -> Monday 2026-07-20
    expect(toISODate(startOfWeek(new Date(2026, 6, 22)))).toBe('2026-07-20')
  })

  it('returns Monday for a Sunday', () => {
    // Sunday 2026-07-26 -> Monday 2026-07-20
    expect(toISODate(startOfWeek(new Date(2026, 6, 26)))).toBe('2026-07-20')
  })
})

describe('isInPeriod', () => {
  const ref = new Date(2026, 6, 22)

  it('matches same day', () => {
    expect(isInPeriod('2026-07-22', 'day', ref)).toBe(true)
    expect(isInPeriod('2026-07-21', 'day', ref)).toBe(false)
  })

  it('matches within the week', () => {
    expect(isInPeriod('2026-07-20', 'week', ref)).toBe(true)
    expect(isInPeriod('2026-07-27', 'week', ref)).toBe(false)
  })

  it('matches within the month', () => {
    expect(isInPeriod('2026-07-01', 'month', ref)).toBe(true)
    expect(isInPeriod('2026-08-01', 'month', ref)).toBe(false)
  })
})
