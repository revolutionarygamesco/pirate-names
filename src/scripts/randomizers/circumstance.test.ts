import roll from './roll.ts'
import pickCircumstance from './circumstance.ts'

jest.mock('./roll', () => ({
  __esModule: true,
  default: jest.fn(),
}))

const mockRoll = jest.mocked(roll)

describe('pickCircumstance', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('might return null', async () => {
    mockRoll.mockResolvedValueOnce(100)
    const actual = await pickCircumstance()
    expect(actual).toBeNull()
  })

  it('might return a special circumstance', async () => {
    mockRoll.mockResolvedValueOnce(1)
    const actual = await pickCircumstance()
    expect(actual).toBe('sickly')
  })
})
