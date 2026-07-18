import { describe, beforeEach, it, expect, vi } from 'vitest'
import pickTwin from './twin.ts'

vi.mock('../randomizers/roll.ts', () => ({
  __esModule: true,
  default: async () => 5
}))

describe('pickTwin', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('returns false if not a twin', async () => {
    const actual = await pickTwin(0)
    expect(actual).toBe(false)
  })

  it('returns birth order if a twin', async () => {
    const expected = [1, 2]
    const actual = await pickTwin(100)
    expect(expected).toContain(actual)
  })
})
