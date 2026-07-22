import { describe, it, expect } from 'vitest'
import { primitives } from '@revolutionarygamesco/common/testing'
import {
  isIgboWeekday,
  selectRandomIgboWeekday,
  igboWeekdays,
  type IgboWeekday
} from './igbo-weekday.ts'

describe('isIgboWeekday', () => {
  it.each(primitives)('rejects %s', (_desc: string, candidate: any) => {
    expect(isIgboWeekday(candidate)).toBe(false)
  })

  it.each(igboWeekdays)('accepts %s', (weekday: IgboWeekday) => {
    expect(isIgboWeekday(weekday)).toBe(true)
  })
})

describe('selectRandomIgboWeekday', () => {
  it('picks a random weekday', () => {
    expect(igboWeekdays).toContain(selectRandomIgboWeekday())
  })
})
