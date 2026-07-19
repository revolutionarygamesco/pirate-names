import { describe, expect, it, vi } from 'vitest'
import { isWithinRange, selectRandomBand } from '@revolutionarygamesco/common'
import FamilyContext, {type FamilyContextData} from './family.ts'

vi.mock('@revolutionarygamesco/common', async (importOriginal) => ({
  ...await importOriginal<typeof import('@revolutionarygamesco/common')>(),
  selectRandomBand: vi.fn()
}))

const mockRandom = vi.mocked(selectRandomBand)

describe('FamilyContext', () => {
  const data: FamilyContextData = { size: 3, order: 2, twin: false, nationality: 'English' }

  describe('constructor', () => {
    it('creates a family context instance', () => {
      const actual = new FamilyContext()
      expect(actual).toBeInstanceOf(FamilyContext)
    })

    it('can set the family size', () => {
      const actual = new FamilyContext({ size: 42 })
      expect(actual.size).toBe(42)
    })

    it('randomizes the family size by default', () => {
      const actual = new FamilyContext()
      expect(isWithinRange(actual.size, [1, 13])).toBe(true)
    })

    it('can set the birth order', () => {
      const actual = new FamilyContext({ size: 42, order: 17 })
      expect(actual.order).toBe(17)
    })

    it('won’t set birth order greater than size', () => {
      const actual = new FamilyContext({ size: 3, order: 4 })
      expect(actual.order).toBe(3)
    })

    it('randomizes birth order by default', () => {
      const actual = new FamilyContext()
      expect(isWithinRange(actual.order, [1, 13])).toBe(true)
    })

    it('can set the first twin', () => {
      const actual = new FamilyContext({ twin: 1 })
      expect(actual.twin).toBe(1)
    })

    it('can set the second twin', () => {
      const actual = new FamilyContext({ twin: 2 })
      expect(actual.twin).toBe(2)
    })

    it('can set that you are not a twin', () => {
      const actual = new FamilyContext({ twin: false })
      expect(actual.twin).toBe(false)
    })

    it('won’t allow family size less than 2 if you’re a twin', () => {
      const actual = new FamilyContext({ size: 1, twin: 1 })
      expect(actual.size).toBe(2)
    })

    it('randomizes twin status by default', () => {
      const actual = new FamilyContext()
      expect([1, 2, false]).toContain(actual.twin)
    })
  })

  describe('Accessors', () => {
    describe('isLast', () => {
      it('returns true if you’re the last born', () => {
        const actual = new FamilyContext({ size: 3, order: 3 })
        expect(actual.isLast).toBe(true)
      })

      it('returns false if you’re not the last born', () => {
        const actual = new FamilyContext({ size: 3, order: 2 })
        expect(actual.isLast).toBe(false)
      })
    })
  })

  describe('Instance methods', () => {
    describe('toObject', () => {
      it('returns a data structure', () => {
        const instance = new FamilyContext(data)
        const actual = instance.toObject()
        expect(actual).toEqual(data)
        expect(actual).not.toBe(data)
      })
    })

    describe('randomizeBirthOrder', () => {
      it('selects a random birth order between 1 and family size', () => {
        const actual = new FamilyContext({ size: 1 })
        actual.randomizeBirthOrder()
        expect(actual.order).toBe(1)
      })

      it('can take a minimum birth order', () => {
        const actual = new FamilyContext({ size: 3 })
        actual.randomizeBirthOrder(3)
        expect(actual.order).toBe(3)
      })

      it('sets you as last if you set minimum higher than size', () => {
        const actual = new FamilyContext({ size: 3 })
        actual.randomizeBirthOrder(4)
        expect(actual.order).toBe(3)
      })

      it('won’t make the second twin first-born', () => {
        const actual = new FamilyContext({ twin: 2, size: 2 })
        actual.randomizeBirthOrder()
        expect(actual.order).toBe(2)
      })
    })

    describe('randomizeTwinStatus', () => {
      it('might make you not a twin', () => {
        const actual = new FamilyContext()
        actual.randomizeTwinStatus(0)
        expect(actual.twin).toBe(false)
      })

      it('might make you a twin', () => {
        const expected = [1, 2]
        const actual = new FamilyContext({ size: 2 })
        actual.randomizeTwinStatus(1000)
        expect(expected).toContain(actual.twin)
      })

      it('won’t make you a twin in a family of 1', () => {
        const actual = new FamilyContext({ size: 1 })
        actual.randomizeTwinStatus(1000)
        expect(actual.twin).toBe(false)
      })
    })
  })

  describe('Static methods', () => {
    describe('load', () => {
      it('converts a data structure into an instance', () => {
        const actual = new FamilyContext(data)
        expect(actual).toBeInstanceOf(FamilyContext)
        for (const key in Object.keys(data)) {
          expect(actual[key as keyof FamilyContextData]).toBe(data[key as keyof FamilyContextData])
        }
      })
    })

    describe('selectRandomFamilySize', () => {
      it('returns a number between 1 and 13', () => {
        mockRandom.mockReturnValueOnce(7)
        const actual = FamilyContext.selectRandomFamilySize()
        expect(actual).toBe(7)
      })
    })
  })
})
