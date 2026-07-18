import { describe, beforeEach, it, expect, vi } from 'vitest'
import generateAbiso from './abiso.ts'

vi.mock('../../randomizers/roll.ts', () => ({
  __esModule: true,
  default: () => 1
}))

vi.mock('../../randomizers/roll-table.ts', () => ({
  __esModule: true,
  default: () => ({ description: 'Test' })
}))

describe('generateAbiso', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('constructs a Yoruba name', async () => {
    const actual = await generateAbiso('Masculine')
    expect(actual).toBe('TestTest')
  })
})
