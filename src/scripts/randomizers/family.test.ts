import { describe, beforeEach, it, expect, vi } from 'vitest'
import pickFamilySize from './family.ts'

vi.mock('../randomizers/roll.ts', () => ({
  __esModule: true,
  default: async () => Math.floor((Math.random() * 100) + 1)
}))

describe('pickFamilySize', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('returns a number between 1 and 13', async () => {
    const actual = await pickFamilySize()
    expect(actual).toBeGreaterThanOrEqual(1)
    expect(actual).toBeLessThanOrEqual(13)
  })
})
