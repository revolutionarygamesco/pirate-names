import { describe, beforeEach, it, expect, vi } from 'vitest'
import generatePortugueseSurames from './surs.ts'

vi.mock('../../randomizers/roll-table.ts', () => ({
  __esModule: true,
  default: async () => ({ description: 'Silva' })
}))

vi.mock('../../randomizers/roll.ts', () => ({
  __esModule: true,
  default: async () => 4
}))

describe('check', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('returns 1-4 surnames', async () => {
    const actual = await generatePortugueseSurames()
    expect(actual).toEqual(['Silva', 'Silva', 'Silva', 'Silva'])
  })
})
