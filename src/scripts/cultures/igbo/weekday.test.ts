import { describe, beforeEach, it, expect, vi } from 'vitest'
import generateWeekdayName from './weekday.ts'

vi.mock('../../randomizers/roll-table.ts', () => ({
  __esModule: true,
  default: () => ({ description: 'Test' })
}))

describe('generateWeekdayName', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('returns a weekday name', async () => {
    const actual = await generateWeekdayName('Masculine')
    expect(actual).toBe('Test')
  })
})
