import { describe, expect, it } from 'vitest'
import { genders } from '../enums/gender.ts'
import Name, { type NameData } from './name.ts'

describe('Name', () => {
  const data: NameData = {
    gender: 'Masculine',
    full: 'John Doe',
    personal: 'John',
    family: 'Doe'
  }

  describe('constructor', () => {
    it('creates a name instance', () => {
      const actual = new Name()
      expect(actual).toBeInstanceOf(Name)
    })

    it('can set the gender', () => {
      const actual = new Name({ gender: 'Feminine' })
      expect(actual.gender).toBe('Feminine')
    })

    it('randomizes the gender by default', () => {
      const actual = new Name()
      expect(genders).toContain(actual.gender)
    })

    it('can set the full name', () => {
      const actual = new Name({ full: 'John Jacob Jingleheimer-Schmidt' })
      expect(actual.full).toBe('John Jacob Jingleheimer-Schmidt')
    })

    it('sets the full name to John Doe by default for a masculine name', () => {
      const actual = new Name({ gender: 'Masculine' })
      expect(actual.full).toBe('John Doe')
    })

    it('sets the full name to Jane Doe by default for a feminine name', () => {
      const actual = new Name({ gender: 'Feminine' })
      expect(actual.full).toBe('Jane Doe')
    })

    it('can set the personal name', () => {
      const actual = new Name({ personal: 'Jacob' })
      expect(actual.personal).toBe('Jacob')
    })

    it('sets the personal name to John by default for a masculine name', () => {
      const actual = new Name({ gender: 'Masculine' })
      expect(actual.personal).toBe('John')
    })

    it('sets the personal name to Jane by default for a feminine name', () => {
      const actual = new Name({ gender: 'Feminine' })
      expect(actual.personal).toBe('Jane')
    })

    it('can set the family name', () => {
      const actual = new Name({ family: 'Jingleheimer-Schmidt' })
      expect(actual.family).toBe('Jingleheimer-Schmidt')
    })

    it('sets the family name to Doe by default', () => {
      const actual = new Name()
      expect(actual.family).toBe('Doe')
    })
  })

  describe('Instance methods', () => {
    describe('toObject', () => {
      it('returns a data structure', () => {
        const instance = new Name(data)
        const actual = instance.toObject()
        expect(actual).toEqual(data)
        expect(actual).not.toBe(data)
      })
    })
  })

  describe('Static methods', () => {
    describe('load', () => {
      it('converts a data structure into an instance', () => {
        const actual = new Name(data)
        expect(actual).toBeInstanceOf(Name)
        for (const key in Object.keys(data)) {
          expect(actual[key as keyof NameData]).toBe(data[key as keyof NameData])
        }
      })
    })
  })
})
