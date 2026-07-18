import { describe, beforeEach, it, expect, vi } from 'vitest'
import roll from '../../randomizers/roll.ts'
import selectRandomBetween from '../../randomizers/between.ts'
import pickCaste from './caste.ts'

vi.mock('../../randomizers/roll.ts', () => ({
  __esModule: true,
  default: vi.fn(),
}))

const mockRoll = vi.mocked(roll)

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
