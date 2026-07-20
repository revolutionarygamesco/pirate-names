import { beforeEach, describe, it, expect } from 'vitest'
import { mockTables } from '@revolutionarygamesco/common-foundryvtt/mocks'
import { genders, type Gender } from '../../enums/gender.ts'
import EnglishPersonalName, { EnglishPersonalNameTables, type EnglishPersonalNameData } from './english.ts'

describe('EnglishPersonalName', () => {
  const data: EnglishPersonalNameData = {
    nationality: 'English',
    gender: 'Masculine',
    full: 'Edward Teach',
    personal: 'Edward'
  }

  beforeEach(() => {
    mockTables({
      [EnglishPersonalNameTables.Feminine]: { results: [{ description: 'Mary' } as foundry.documents.TableResult] },
      [EnglishPersonalNameTables.Masculine]: { results: [{ description: 'Edward' } as foundry.documents.TableResult] },
      [EnglishPersonalNameTables.Surnames]: { results: [{ description: 'Teach' } as foundry.documents.TableResult] }
    })
  })

  describe('constructor', () => {
    it('creates an English name', () => {
      const actual = new EnglishPersonalName()
      expect(actual).toBeInstanceOf(EnglishPersonalName)
    })

    it('sets nationality to English', () => {
      const actual = new EnglishPersonalName()
      expect(actual.nationality).toBe('English')
    })

    it.each(genders)('can assign %s to gender', (gender: Gender) => {
      const actual = new EnglishPersonalName({ gender })
      expect(actual.gender).toBe(gender)
    })

    it('randomizes the gender by default', () => {
      const actual = new EnglishPersonalName()
      expect(genders).toContain(actual.gender)
    })

    it('can take a full name', () => {
      const actual = new EnglishPersonalName({ full: 'Edward Teach' })
      expect(actual.full).toBe('Edward Teach')
    })

    it('defaults to John for a masculine name', () => {
      const actual = new EnglishPersonalName({ gender: 'Masculine' })
      expect(actual.full).toBe('John')
    })

    it('defaults to Jane for a feminine name', () => {
      const actual = new EnglishPersonalName({ gender: 'Feminine' })
      expect(actual.full).toBe('Jane')
    })

    it('can take a personal name', () => {
      const actual = new EnglishPersonalName({ personal: 'Edward' })
      expect(actual.personal).toBe('Edward')
    })

    it('defaults to John for a masculine name', () => {
      const actual = new EnglishPersonalName({ gender: 'Masculine' })
      expect(actual.personal).toBe('John')
    })

    it('defaults to Jane for a feminine name', () => {
      const actual = new EnglishPersonalName({ gender: 'Feminine' })
      expect(actual.personal).toBe('Jane')
    })
  })

  describe('Instance methods', () => {
    describe('toObject', () => {
      it('returns a data object', () => {
        const instance = new EnglishPersonalName(data)
        const actual = instance.toObject()
        expect(actual).toEqual(data)
        expect(actual).not.toBe(data)
      })
    })
  })

  describe('Static methods', () => {
    describe('generator', () => {
      it('can generate a masculine name', async () => {
        const [actual] = await EnglishPersonalName.generate({ gender: 'Masculine' })
        expect(actual.full).toBe('Edward Teach')
        expect(actual.personal).toBe('Edward')
      })

      it('can generate a feminine name', async () => {
        const [actual] = await EnglishPersonalName.generate({ gender: 'Feminine' })
        expect(actual.full).toBe('Mary Teach')
        expect(actual.personal).toBe('Mary')
      })
    })
  })
})
