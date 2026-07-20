import { beforeEach, describe, it, expect } from 'vitest'
import { mockTables } from '@revolutionarygamesco/common-foundryvtt/mocks'
import { type NamedFamilyData } from './named.ts'
import EnglishFamily, { EnglishFamilyNames } from './english.ts'

describe('EnglishFamily', () => {
  const data: NamedFamilyData = {
    nationality: 'English',
    size: 3,
    order: 2,
    twin: false,
    name: 'Smith'
  }

  beforeEach(() => {
    mockTables({
      [EnglishFamilyNames]: { results: [{ description: 'Jones' } as foundry.documents.TableResult] }
    })
  })

  describe('constructor', () => {
    it('creates an English family', () => {
      const actual = new EnglishFamily()
      expect(actual).toBeInstanceOf(EnglishFamily)
    })

    it('sets nationality to English', () => {
      const actual = new EnglishFamily()
      expect(actual.nationality).toBe('English')
    })

    it('sets the family name to Smith by default', () => {
      const actual = new EnglishFamily()
      expect(actual.name).toBe('Smith')
    })
  })

  describe('Instance methods', () => {
    describe('toObject', () => {
      it('returns a data object', () => {
        const instance = new EnglishFamily(data)
        const actual = instance.toObject()
        expect(actual).toEqual(data)
        expect(actual).not.toBe(data)
      })
    })
  })

  describe('Static methods', () => {
    describe('generator', () => {
      it('generates an English family', async () => {
        const actual = await EnglishFamily.generate()
        expect(actual.name).toBe('Jones')
      })
    })
  })
})
