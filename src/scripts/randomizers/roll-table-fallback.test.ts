import rollTable from './roll-table.ts'
import rollTableWithFallback from './roll-table-fallback.ts'

jest.mock('./roll-table', () => ({
  __esModule: true,
  default: jest.fn(),
}))

const mockTable = jest.mocked(rollTable)

describe('rollTableWithFallback', () => {
  const description = 'Description'
  const fallback = 'Fallback'

  it('returns the description of the drawn result', async () => {
    mockTable.mockResolvedValueOnce({ description } as RollTableResult)
    const actual = await rollTableWithFallback('table-id', fallback)
    expect(actual).toBe(description)
  })

  it('returns the fallback when result is null', async () => {
    mockTable.mockResolvedValueOnce(null)
    const actual = await rollTableWithFallback('table-id', fallback)
    expect(actual).toBe(fallback)
  })
})
