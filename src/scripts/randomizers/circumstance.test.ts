import {describe, it, expect, vi} from 'vitest'
import { selectRandomBand } from '@revolutionarygamesco/common'
import selectRandomCircumstance from './circumstance.ts'

vi.mock('@revolutionarygamesco/common', async (importOriginal) => ({
  ...await importOriginal<typeof import('@revolutionarygamesco/common')>(),
  selectRandomBand: vi.fn()
}))

const mockRandom = vi.mocked(selectRandomBand)

describe('selectRandomCircumstance', () => {
  it('might return null', () => {
    mockRandom.mockReturnValueOnce('')
    const actual = selectRandomCircumstance()
    expect(actual).toBeNull()
  })

  it('might return a special circumstance', () => {
    mockRandom.mockReturnValueOnce('sickly')
    const actual = selectRandomCircumstance()
    expect(actual).toBe('sickly')
  })

  it('can select between rarer circumstances', () => {
    mockRandom.mockReturnValueOnce('festival,festival,festival,festival,egungun,orisa')
    const expected = ['festival', 'egungun', 'orisa']
    const actual = selectRandomCircumstance()
    expect(expected).toContain(actual)
  })
})
