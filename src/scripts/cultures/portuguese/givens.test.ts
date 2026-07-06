import generatePortugueseGivenNames from './givens.ts'

jest.mock('../../randomizers/roll-table.ts', () => ({
  __esModule: true,
  default: async () => ({ description: 'Maria' })
}))

jest.mock('../../randomizers/roll.ts', () => ({
  __esModule: true,
  default: async () => 2
}))

describe('check', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('returns 1-2 given names', async () => {
    const actual = await generatePortugueseGivenNames('Feminine')
    expect(actual).toEqual(['Maria', 'Maria'])
  })
})
