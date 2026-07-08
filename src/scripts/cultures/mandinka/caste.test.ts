import roll from '../../randomizers/roll.ts'
import selectRandomBetween from '../../randomizers/between.ts'
import pickCaste from './caste.ts'

jest.mock('../../randomizers/roll.ts', () => ({
  __esModule: true,
  default: jest.fn(),
}))

const mockRoll = jest.mocked(roll)

describe('check', () => {
  beforeEach(() => {
    mockRoll.mockReset()
  })

  it('sometimes picks Jakhanke', async () => {
    mockRoll.mockResolvedValueOnce(100)
    const actual = await pickCaste()
    expect(actual).toBe('Jakhanke')
  })

  it('sometimes picks Jali', async () => {
    mockRoll.mockResolvedValueOnce(99)
    const actual = await pickCaste()
    expect(actual).toBe('Jali')
  })

  it('sometimes picks Nyamakala', async () => {
    mockRoll.mockResolvedValueOnce(98)
    const actual = await pickCaste()
    expect(actual).toBe('Nyamakala')
  })

  it('usually picks foro', async () => {
    mockRoll.mockResolvedValueOnce(selectRandomBetween(1, 97))
    const actual = await pickCaste()
    expect(actual).toBe('Foro')
  })
})
