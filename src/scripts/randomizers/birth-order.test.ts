import { describe, beforeEach, it, expect, vi } from 'vitest'
import { selectRandomBetween } from '@revolutionarygamesco/common'
import pickBirthOrder from './birth-order.ts'

vi.mock('../randomizers/roll.ts', () => ({
  __esModule: true,
  default: async () => selectRandomBetween(1, 100)
}))

describe('pickBirthOrder', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('returns a number between 1 and 13 or "last"', async () => {
    const actual = await pickBirthOrder()
    if (typeof actual === 'string') {
      expect(actual).toBe('last')
    } else {
      expect(actual).toBeGreaterThanOrEqual(1)
      expect(actual).toBeLessThanOrEqual(13)
    }
  })
})
