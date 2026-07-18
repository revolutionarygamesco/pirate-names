import { describe, beforeEach, it, expect, vi } from 'vitest'
import rollTable from '../../randomizers/roll-table.ts'
import generateDutchPatronym from './patronym.ts'

vi.mock('../../randomizers/roll-table.ts', () => ({
  __esModule: true,
  default: vi.fn(),
}))

const mockTable = vi.mocked(rollTable)

describe('check', () => {
  beforeEach(() => {
    mockTable.mockReset()
  })

  it('returns a patronym for a son', async () => {
    mockTable.mockResolvedValueOnce({ description: 'Jan' })
    const actual = await generateDutchPatronym('Masculine')
    expect(actual).toBe('Janszoon')
  })

  it('returns a patronym for a daughter', async () => {
    mockTable.mockResolvedValueOnce({ description: 'Jan' })
    const actual = await generateDutchPatronym('Feminine')
    expect(actual).toBe('Jansdochter')
  })
})
