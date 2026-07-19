import { describe, expect, it } from 'vitest'
import Person, { type PersonData } from './person.ts'

describe('Person', () => {
  const data: PersonData = {
    family: { size: 3, order: 2, twin: false },
    birth: { weekday: 'Sunday', special: 'road' },
    names: [{
      gender: 'Masculine',
      full: 'John Doe',
      personal: 'John',
      family: 'Doe'
    }],
    relationships: [
      {
        description: 'sister',
        person: {
          family: { size: 3, order: 1, twin: false },
          birth: { weekday: 'Tuesday', special: null },
          names: [{
            gender: 'Feminine',
            full: 'Jane Doe',
            personal: 'Jane',
            family: 'Doe'
          }],
          relationships: []
        }
      }
    ]
  }

  describe('constructor', () => {
    it('creates a person instance', () => {
      const actual = new Person()
      expect(actual).toBeInstanceOf(Person)
    })
  })

  describe('Instance methods', () => {
    describe('toObject', () => {
      it('returns a data structure', () => {
        const instance = new Person(data)
        const actual = instance.toObject()
        expect(actual).toEqual(data)
        expect(actual).not.toBe(data)
      })
    })
  })

  describe('Static methods', () => {
    describe('load', () => {
      it('converts a data structure into an instance', () => {
        const actual = new Person(data)
        expect(actual).toBeInstanceOf(Person)
        for (const key in Object.keys(data)) {
          expect(actual[key as keyof PersonData]).toBe(data[key as keyof PersonData])
        }
      })
    })
  })
})
