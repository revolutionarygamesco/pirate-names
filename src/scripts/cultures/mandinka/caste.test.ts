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

  it('sometimes picks marabout', async () => {
    mockRoll.mockResolvedValueOnce(100)
    const actual = await pickCaste()
    expect(actual).toBe('Marabout')
  })

  it('sometimes picks griot', async () => {
    mockRoll.mockResolvedValueOnce(99)
    const actual = await pickCaste()
    expect(actual).toBe('Griot')
  })

  it('sometimes picks blacksmith', async () => {
    mockRoll.mockResolvedValueOnce(98)
    const actual = await pickCaste()
    expect(actual).toBe('Blacksmith')
  })

  it('usually picks foro', async () => {
    mockRoll.mockResolvedValueOnce(selectRandomBetween(1, 97))
    const actual = await pickCaste()
    expect(actual).toBe('Foro')
  })
})
