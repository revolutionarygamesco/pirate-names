import { describe, it, expect, vi } from 'vitest'
import { selectRandomBetween } from '@revolutionarygamesco/common'
import pickSpecialNames from './special.ts'

vi.mock('@revolutionarygamesco/common', async (importOriginal) => ({
  ...await importOriginal<typeof import('@revolutionarygamesco/common')>(),
  selectRandomBetween: vi.fn()
}))

const mockRandom = vi.mocked(selectRandomBetween)

describe('check', () => {
  it('sometimes calls for a santu name', () => {
    mockRandom.mockReturnValueOnce(1)
    const actual = pickSpecialNames()
    expect(actual).toBe('santu')
  })

  it('sometimes calls for an initiation name', () => {
    mockRandom.mockReturnValueOnce(20)
    const actual = pickSpecialNames()
    expect(actual).toBe('initiation')
  })

  it('sometimes doesn’t call for anything', () => {
    mockRandom.mockReturnValueOnce(12)
    const actual = pickSpecialNames()
    expect(actual).toBe(null)
  })
})
