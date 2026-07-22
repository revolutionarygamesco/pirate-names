import { describe, it, expect } from 'vitest'
import { primitives } from '@revolutionarygamesco/common/testing'
import {
  isWeekday,
  selectRandomWeekday,
  weekdays,
  type Weekday
} from './weekday.ts'

describe('isWeekday', () => {
  it.each(primitives)('rejects %s', (_desc: string, candidate: any) => {
    expect(isWeekday(candidate)).toBe(false)
  })

  it.each(weekdays)('accepts %s', (weekday: Weekday) => {
    expect(isWeekday(weekday)).toBe(true)
  })
})

describe('selectRandomWeekday', () => {
  it('picks a random weekday', () => {
    expect(weekdays).toContain(selectRandomWeekday())
  })
})
