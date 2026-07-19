import { describe, expect, it } from 'vitest'
import { weekdays } from '../enums/weekday.ts'
import BirthContext, { type BirthContextData } from './birth.ts'

describe('BirthContext', () => {
  const data: BirthContextData = { weekday: 'Sunday', special: 'road' }

  describe('constructor', () => {
    it('creates a birth context instance', () => {
      const actual = new BirthContext()
      expect(actual).toBeInstanceOf(BirthContext)
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
  })

  describe('Instance methods', () => {
    describe('toObject', () => {
      it('returns a data structure', () => {
        const instance = new BirthContext(data)
        const actual = instance.toObject()
        expect(actual).toEqual(data)
        expect(actual).not.toBe(data)
      })
    })
  })

  describe('Static methods', () => {
    describe('load', () => {
      it('converts a data structure into an instance', () => {
        const actual = new BirthContext(data)
        expect(actual).toBeInstanceOf(BirthContext)
        for (const key in Object.keys(data)) {
          expect(actual[key as keyof BirthContextData]).toBe(data[key as keyof BirthContextData])
        }
      })
    })
  })
})
