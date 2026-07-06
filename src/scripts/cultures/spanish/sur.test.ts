import roll from '../../randomizers/roll.ts'
import generateSpanishSurname from './sur.ts'

jest.mock('../../randomizers/roll.ts', () => ({
  __esModule: true,
  default: jest.fn(),
}))

jest.mock('../../randomizers/roll-table.ts', () => ({
  __esModule: true,
  default: async () => ({ description: 'Rodriguez' })
}))

const mockRoll = jest.mocked(roll)

describe('generateSpanishSurname', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('can return a single surname', async () => {
    mockRoll.mockResolvedValueOnce(6)
    const actual = await generateSpanishSurname()
    expect(actual).toBe('Rodriguez')
  })

  it('can return a compound surname', async () => {
    mockRoll.mockResolvedValueOnce(8)
    const actual = await generateSpanishSurname()
    expect(actual).toBe('Rodriguez-Rodriguez')
  })
})
