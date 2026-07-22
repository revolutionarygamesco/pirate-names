import {describe, expect, it, vi} from 'vitest'
import { selectRandomElement, isWithinRange } from '@revolutionarygamesco/common'
import { weekdays } from '../../types/enums/weekday.ts'
import { type TwinStatus } from '../../types/twin.ts'
import Family from '../families/base.ts'
import BirthContext, { type BirthContextData } from './base.ts'

vi.mock('@revolutionarygamesco/common', async (importOriginal) => ({
  ...await importOriginal<typeof import('@revolutionarygamesco/common')>(),
  selectRandomElement: vi.fn()
}))

const mockRandom = vi.mocked(selectRandomElement)

describe('BirthContext', () => {
  describe('constructor', () => {
    const family = new Family({ size: 3 })

    it('creates a birth context instance', () => {
      const actual = new BirthContext()
      expect(actual).toBeInstanceOf(BirthContext)
    })

    it('can set birth order', () => {
      const actual = new BirthContext({ order: 1 })
      expect(actual.order).toBe(1)
    })

    it('randomizes birth order by default', () => {
      const actual = new BirthContext({}, family)
      expect(isWithinRange(actual.order, [1, 3])).toBe(true)
    })

    it.each([1, 2, false] as TwinStatus[])('can set twin status to %s', (twin) => {
      const actual = new BirthContext({ twin }, family)
      expect(actual.twin).toBe(twin)
    })

    it('randomizes twin status by default', () => {
      const actual = new BirthContext()
      expect([1, 2, false]).toContain(actual.twin)
    })

    it('won’t make you a twin in a family of 1', () => {
      const family = new Family({ size: 1 })
      const actual = new BirthContext({}, family)
      expect(actual.twin).toBe(false)
    })

    it('won’t make you the first-born if you’re the second twin', () => {
      const family = new Family({ size: 2 })
      const actual = new BirthContext({ order: 1, twin: 2 }, family)
      expect(actual.order).toBe(2)
      expect(actual.twin).toBe(2)
    })

    it('won’t make you the last-born if you’re the first twin', () => {
      const family = new Family({ size: 2 })
      const actual = new BirthContext({ order: 2, twin: 1 }, family)
      expect(actual.order).toBe(1)
      expect(actual.twin).toBe(1)
    })

    it('can set the day of the week', () => {
      const actual = new BirthContext({ weekday: 'Sunday' })
      expect(actual.weekday).toBe('Sunday')
    })

    it('randomizes the weekday by default', () => {
      const actual = new BirthContext()
      expect(weekdays).toContain(actual.weekday)
    })

    it('can set special circumstances', () => {
      const actual = new BirthContext({ special: 'testing' })
      expect(actual.special).toBe('testing')
    })

    it('can set special circumstances to null', () => {
      const actual = new BirthContext({ special: null })
      expect(actual.special).toBeNull()
    })
  })

  describe('Accessor methods', () => {
    describe('last', () => {
      const family = new Family({ size: 3 })

      it('returns true if this is the last birth in the family', () => {
        const instance = new BirthContext({ order: 3, twin: false }, family)
        expect(instance.last).toBe(true)
      })

      it('returns false if this is not the last birth in the family', () => {
        const instance = new BirthContext({ order: 1, twin: false }, family)
        expect(instance.last).toBe(false)
      })
    })
  })

  describe('Instance methods', () => {
    describe('toObject', () => {
      it('returns a data structure', () => {
        const family = new Family()
        const orig: BirthContextData = {
          family: family.toObject(),
          order: 1,
          twin: false,
          weekday: 'Sunday',
          special: null
        }

        const instance = new BirthContext(orig)
        const actual = instance.toObject()
        expect(actual).toEqual(orig)
        expect(actual).not.toBe(orig)
      })
    })
  })

  describe('Static methods', () => {
    describe('selectRandomCircumstance', () => {
      it('often sets special to null', () => {
        mockRandom.mockReturnValueOnce('')
        const actual = BirthContext.selectRandomCircumstance()
        expect(actual).toBeNull()
      })

      it('might return a special circumstance', () => {
        mockRandom.mockReturnValueOnce('sickly')
        const actual = BirthContext.selectRandomCircumstance()
        expect(actual).toBe('sickly')
      })
    })
  })
})
