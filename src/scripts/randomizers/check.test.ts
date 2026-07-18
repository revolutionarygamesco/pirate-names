import { describe, beforeEach, it, expect, vi } from 'vitest'
import roll from './roll.ts'
import check from './check.ts'

vi.mock('./roll', () => ({
  __esModule: true,
  default: vi.fn(),
}))

const mockRoll = vi.mocked(roll)

describe('check', () => {
  beforeEach(() => {
    mockRoll.mockReset()
  })

  it('returns false if the check fails', async () => {
    mockRoll.mockResolvedValueOnce(8)
    const actual = await check('1d20', r => r > 10)
    expect(actual).toBe(false)
  })

  it('returns true if the check succeeds', async () => {
    mockRoll.mockResolvedValueOnce(12)
    const actual = await check('1d20', r => r > 10)
    expect(actual).toBe(true)
  })
})
