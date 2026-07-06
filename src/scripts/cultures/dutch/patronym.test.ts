import rollTable from '../../randomizers/roll-table.ts'
import generateDutchPatronym from './patronym.ts'

jest.mock('../../randomizers/roll-table.ts', () => ({
  __esModule: true,
  default: jest.fn(),
}))

const mockTable = jest.mocked(rollTable)

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
