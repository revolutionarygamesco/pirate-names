import { describe, expect, it } from 'vitest'
import { isWithinRange } from '@revolutionarygamesco/common'
import { castes } from '../cultures/mandinka/caste.ts'
import FamilyContext, {type FamilyContextData} from './family.ts'

describe('FamilyContext', () => {
  const data: FamilyContextData = { size: 3, order: 2, twin: false, caste: 'Foro' }

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

    it('can set the Mandinka caste', () => {
      const actual = new FamilyContext({ caste: 'Jali' })
      expect(actual.caste).toBe('Jali')
    })

    it('randomizes the caste by default', () => {
      const actual = new FamilyContext()
      expect(castes).toContain(actual.caste)
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
  })
})
