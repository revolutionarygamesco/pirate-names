import { describe, it, expect } from 'vitest'
import { isWithinRange } from '@revolutionarygamesco/common'
import selectRandomBirthOrder from './birth-order.ts'

describe('selectRandomBirthOrder', () => {
  it('returns a number between 1 and 13 or "last"', () => {
    expect(isWithinRange(selectRandomBirthOrder(), [1, 13])).toBe(true)
  })
})
