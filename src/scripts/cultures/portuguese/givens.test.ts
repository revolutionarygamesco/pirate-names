import { describe, beforeEach, it, expect, vi } from 'vitest'
import generatePortugueseGivenNames from './givens.ts'

vi.mock('../../randomizers/roll-table.ts', () => ({
  __esModule: true,
  default: async () => ({ description: 'Maria' })
}))

vi.mock('../../randomizers/roll.ts', () => ({
  __esModule: true,
  default: async () => 2
}))

describe('check', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('returns 1-2 given names', async () => {
    const actual = await generatePortugueseGivenNames('Feminine')
    expect(actual).toEqual(['Maria', 'Maria'])
  })
})
