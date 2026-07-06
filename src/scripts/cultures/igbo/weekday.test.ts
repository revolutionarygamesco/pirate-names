import generateWeekdayName from './weekday.ts'

jest.mock('../../randomizers/roll-table.ts', () => ({
  __esModule: true,
  default: () => ({ description: 'Test' })
}))

describe('check', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('returns a weekday name', async () => {
    const actual = await generateWeekdayName('Masculine')
    expect(actual).toBe('Test')
  })
})
