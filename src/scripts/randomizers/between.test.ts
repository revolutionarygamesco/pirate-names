import { describe, it, expect } from '@jest/globals'
import selectRandomBetween from './between.ts'

describe('selectRandomBetween', () => {
  it('selects a random number between x and y', () => {
    const actual = selectRandomBetween(1, 6)
    expect(actual).toBeGreaterThanOrEqual(1)
    expect(actual).toBeLessThanOrEqual(6)
  })
})
