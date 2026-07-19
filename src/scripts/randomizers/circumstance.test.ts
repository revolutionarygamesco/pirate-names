import {describe, it, expect, vi} from 'vitest'
import { selectRandomBand } from '@revolutionarygamesco/common'
import pickCircumstance from './circumstance.ts'

vi.mock('@revolutionarygamesco/common', async (importOriginal) => ({
  ...await importOriginal<typeof import('@revolutionarygamesco/common')>(),
  selectRandomBand: vi.fn()
}))

const mockRandom = vi.mocked(selectRandomBand)

describe('pickCircumstance', () => {
  it('might return null', () => {
    mockRandom.mockReturnValueOnce('')
    const actual = pickCircumstance()
    expect(actual).toBeNull()
  })

  it('might return a special circumstance', () => {
    mockRandom.mockReturnValueOnce('sickly')
    const actual = pickCircumstance()
    expect(actual).toBe('sickly')
  })

  it('can select between rarer circumstances', () => {
    mockRandom.mockReturnValueOnce('festival,festival,festival,festival,egungun,orisa')
    const expected = ['festival', 'egungun', 'orisa']
    const actual = pickCircumstance()
    expect(expected).toContain(actual)
  })
})
