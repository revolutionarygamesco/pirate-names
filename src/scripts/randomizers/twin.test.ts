import pickTwin from './twin.ts'

jest.mock('../randomizers/roll.ts', () => ({
  __esModule: true,
  default: async () => 5
}))

describe('pickTwin', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('returns false if not a twin', async () => {
    const actual = await pickTwin(0)
    expect(actual).toBe(false)
  })

  it('returns birth order if a twin', async () => {
    const expected = [1, 2]
    const actual = await pickTwin(100)
    expect(expected).toContain(actual)
  })
})
