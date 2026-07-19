import { describe, it, expect, vi } from 'vitest'
import { selectRandomBand } from '@revolutionarygamesco/common'
import selectRandomMandinkaCaste from './caste.ts'

vi.mock('@revolutionarygamesco/common', async (importOriginal) => ({
  ...await importOriginal<typeof import('@revolutionarygamesco/common')>(),
  selectRandomBand: vi.fn()
}))

const mockRandom = vi.mocked(selectRandomBand)

describe('selectRandomMandinkaCaste', () => {
  it('sometimes picks Jakhanke', async () => {
    mockRandom.mockResolvedValueOnce('Jakhanke')
    const actual = await selectRandomMandinkaCaste()
    expect(actual).toBe('Jakhanke')
  })

  it('sometimes picks Jali', async () => {
    mockRandom.mockResolvedValueOnce('Jali')
    const actual = await selectRandomMandinkaCaste()
    expect(actual).toBe('Jali')
  })

  it('sometimes picks Nyamakala', async () => {
    mockRandom.mockResolvedValueOnce('Nyamakala')
    const actual = await selectRandomMandinkaCaste()
    expect(actual).toBe('Nyamakala')
  })

  it('usually picks Foro', async () => {
    mockRandom.mockResolvedValueOnce('Foro')
    const actual = await selectRandomMandinkaCaste()
    expect(actual).toBe('Foro')
  })
})
