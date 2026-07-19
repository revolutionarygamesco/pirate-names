import { describe, it, expect } from 'vitest'
import pickTwin from './twin.ts'

describe('pickTwin', () => {
  it('returns false if not a twin', () => {
    const actual = pickTwin(0)
    expect(actual).toBe(false)
  })

  it('returns birth order if a twin', () => {
    const expected = [1, 2]
    const actual = pickTwin(100)
    expect(expected).toContain(actual)
  })
})
