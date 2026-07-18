import { describe, beforeEach, it, expect, vi } from 'vitest'
import generateFullSpanishSurname from './full-sur.ts'

vi.mock('../../randomizers/roll.ts', () => ({
  __esModule: true,
  default: async () => 5
}))

vi.mock('../../randomizers/roll-table.ts', () => ({
  __esModule: true,
  default: async () => ({ description: 'Rodriguez' })
}))

describe('generateFullSpanishSurname', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('returns a full surname', async () => {
    const actual = await generateFullSpanishSurname()
    expect(actual).toBe('Rodriguez y Rodriguez')
  })
})
