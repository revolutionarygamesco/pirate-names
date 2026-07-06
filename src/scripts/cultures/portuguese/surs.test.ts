import generatePortugueseSurames from './surs.ts'

jest.mock('../../randomizers/roll-table.ts', () => ({
  __esModule: true,
  default: async () => ({ description: 'Silva' })
}))

jest.mock('../../randomizers/roll.ts', () => ({
  __esModule: true,
  default: async () => 4
}))

describe('check', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('returns 1-4 surnames', async () => {
    const actual = await generatePortugueseSurames()
    expect(actual).toEqual(['Silva', 'Silva', 'Silva', 'Silva'])
  })
})
