import { describe, it, expect } from 'vitest'
import selectRandomBirthOrder from './birth-order.ts'

describe('selectRandomBirthOrder', () => {
  it('returns a number between 1 and 13 or "last"', () => {
    const actual = selectRandomBirthOrder()
    if (typeof actual === 'string') {
      expect(actual).toBe('last')
    } else {
      expect(actual).toBeGreaterThanOrEqual(1)
      expect(actual).toBeLessThanOrEqual(13)
    }
  })
})
