import pickCircumstance, { options } from './circumstance.ts'

jest.mock('../randomizers/roll.ts', () => ({
  __esModule: true,
  default: async () => Math.floor((Math.random() * 100) + 1)
}))

describe('pickCircumstance', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('returns null or a potentially useful string', async () => {
    const actual = await pickCircumstance()
    const expected = options.map(option => option.circumstance)
    expect(expected).toContain(actual)
  })
})
