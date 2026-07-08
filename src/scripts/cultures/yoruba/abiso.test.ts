import generateAbiso from './abiso.ts'

jest.mock('../../randomizers/roll.ts', () => ({
  __esModule: true,
  default: () => 1
}))

jest.mock('../../randomizers/roll-table.ts', () => ({
  __esModule: true,
  default: () => ({ description: 'Test' })
}))

describe('generateAbiso', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('constructs a Yoruba name', async () => {
    const actual = await generateAbiso('Masculine')
    expect(actual).toBe('TestTest')
  })
})
