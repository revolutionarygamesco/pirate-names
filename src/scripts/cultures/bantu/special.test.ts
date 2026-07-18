import { describe, beforeEach, it, expect, vi } from 'vitest'
import roll from '../../randomizers/roll.ts'
import pickSpecialNames from './special.ts'

vi.mock('../../randomizers/roll.ts', () => ({
  __esModule: true,
  default: vi.fn(),
}))

const mockRoll = vi.mocked(roll)

describe('check', () => {
  beforeEach(() => {
    mockRoll.mockReset()
  })

  it('sometimes calls for a santu name', async () => {
    mockRoll.mockResolvedValueOnce(1)
    const actual = await pickSpecialNames()
    expect(actual).toBe('santu')
  })

  it('sometimes calls for an initiation name', async () => {
    mockRoll.mockResolvedValueOnce(20)
    const actual = await pickSpecialNames()
    expect(actual).toBe('initiation')
  })

  it('sometimes doesn’t call for anything', async () => {
    mockRoll.mockResolvedValueOnce(12)
    const actual = await pickSpecialNames()
    expect(actual).toBe(null)
  })
})
