import { describe, expect, it, vi } from 'vitest'
import { isWithinRange, selectRandomBand } from '@revolutionarygamesco/common'
import Family, { type FamilyData } from './base.ts'

vi.mock('@revolutionarygamesco/common', async (importOriginal) => ({
  ...await importOriginal<typeof import('@revolutionarygamesco/common')>(),
  selectRandomBand: vi.fn()
}))

const mockRandom = vi.mocked(selectRandomBand)

describe('Family', () => {
  const data: FamilyData = { size: 3, nationality: 'English' }

  describe('constructor', () => {
    it('creates a family context instance', () => {
      const actual = new Family()
      expect(actual).toBeInstanceOf(Family)
    })

    it('can set the family size', () => {
      const actual = new Family({ size: 42 })
      expect(actual.size).toBe(42)
    })

    it('randomizes the family size by default', () => {
      const actual = new Family()
      expect(isWithinRange(actual.size, [1, 13])).toBe(true)
    })
  })

  describe('Instance methods', () => {
    describe('toObject', () => {
      it('returns a data structure', () => {
        const instance = new Family(data)
        const actual = instance.toObject()
        expect(actual).toEqual(data)
        expect(actual).not.toBe(data)
      })
    })
  })

  describe('Static methods', () => {
    describe('selectRandomFamilySize', () => {
      it('returns a number between 1 and 13', () => {
        mockRandom.mockReturnValueOnce(7)
        const actual = Family.selectRandomFamilySize()
        expect(actual).toBe(7)
      })
    })
  })
})
