import { describe, it, expect, vi } from 'vitest'
import { selectRandomBand } from '@revolutionarygamesco/common'
import { selectRandomMandinkaCaste } from './caste.ts'

vi.mock('@revolutionarygamesco/common', async (importOriginal) => ({
  ...await importOriginal<typeof import('@revolutionarygamesco/common')>(),
  selectRandomBand: vi.fn()
}))

const mockRandom = vi.mocked(selectRandomBand)

describe('selectRandomMandinkaCaste', () => {
  it('sometimes picks Jakhanke', () => {
    mockRandom.mockReturnValueOnce('Jakhanke')
    const actual = selectRandomMandinkaCaste()
    expect(actual).toBe('Jakhanke')
  })

  it('sometimes picks Jali', () => {
    mockRandom.mockReturnValueOnce('Jali')
    const actual = selectRandomMandinkaCaste()
    expect(actual).toBe('Jali')
  })

  it('sometimes picks Nyamakala', () => {
    mockRandom.mockReturnValueOnce('Nyamakala')
    const actual = selectRandomMandinkaCaste()
    expect(actual).toBe('Nyamakala')
  })

  it('usually picks Foro', () => {
    mockRandom.mockReturnValueOnce('Foro')
    const actual = selectRandomMandinkaCaste()
    expect(actual).toBe('Foro')
  })
})
