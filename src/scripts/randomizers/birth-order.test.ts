import { describe, it, expect } from 'vitest'
import pickBirthOrder from './birth-order.ts'

describe('pickBirthOrder', () => {
  it('returns a number between 1 and 13 or "last"', () => {
    const actual = pickBirthOrder()
    if (typeof actual === 'string') {
      expect(actual).toBe('last')
    } else {
      expect(actual).toBeGreaterThanOrEqual(1)
      expect(actual).toBeLessThanOrEqual(13)
    }
  })
})
