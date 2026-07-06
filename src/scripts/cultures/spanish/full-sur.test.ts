import generateFullSpanishSurname from './full-sur.ts'

jest.mock('../../randomizers/roll.ts', () => ({
  __esModule: true,
  default: async () => 5
}))

jest.mock('../../randomizers/roll-table.ts', () => ({
  __esModule: true,
  default: async () => ({ description: 'Rodriguez' })
}))

describe('generateFullSpanishSurname', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('returns a full surname', async () => {
    const actual = await generateFullSpanishSurname()
    expect(actual).toBe('Rodriguez y Rodriguez')
  })
})
