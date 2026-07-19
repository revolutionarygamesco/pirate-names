import { describe, it, expect } from 'vitest'
import selectRandomTwinStatus from './twin.ts'

describe('selectRandomTwinStatus', () => {
  it('returns false if not a twin', () => {
    const actual = selectRandomTwinStatus(0)
    expect(actual).toBe(false)
  })

  it('returns birth order if a twin', () => {
    const expected = [1, 2]
    const actual = selectRandomTwinStatus(100)
    expect(expected).toContain(actual)
  })
})
