import pickBirthOrder from './birth-order.ts'

jest.mock('../randomizers/roll.ts', () => ({
  __esModule: true,
  default: async () => Math.floor((Math.random() * 100) + 1)
}))

describe('pickBirthOrder', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('returns a number between 1 and 13 or "last"', async () => {
    const actual = await pickBirthOrder()
    if (typeof actual === 'string') {
      expect(actual).toBe('last')
    } else {
      expect(actual).toBeGreaterThanOrEqual(1)
      expect(actual).toBeLessThanOrEqual(13)
    }
  })
})
