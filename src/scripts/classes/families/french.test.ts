import { beforeEach, describe, it, expect } from 'vitest'
import { mockTables } from '@revolutionarygamesco/common-foundryvtt/mocks'
import { type NamedFamilyData } from './named.ts'
import FrenchFamily, { FrenchFamilyNames } from './french.ts'

describe('FrenchFamily', () => {
  const data: NamedFamilyData = {
    nationality: 'French',
    size: 3,
    order: 2,
    twin: false,
    name: 'Durand'
  }

  beforeEach(() => {
    mockTables({
      [FrenchFamilyNames]: { results: [{ description: 'Dubois' } as foundry.documents.TableResult] }
    })
  })

  describe('constructor', () => {
    it('creates an French family', () => {
      const actual = new FrenchFamily()
      expect(actual).toBeInstanceOf(FrenchFamily)
    })

    it('sets nationality to French', () => {
      const actual = new FrenchFamily()
      expect(actual.nationality).toBe('French')
    })

    it('sets the family name to Dupont by default', () => {
      const actual = new FrenchFamily()
      expect(actual.name).toBe('Dupont')
    })
  })

  describe('Instance methods', () => {
    describe('toObject', () => {
      it('returns a data object', () => {
        const instance = new FrenchFamily(data)
        const actual = instance.toObject()
        expect(actual).toEqual(data)
        expect(actual).not.toBe(data)
      })
    })
  })

  describe('Static methods', () => {
    describe('generator', () => {
      it('generates an French family', async () => {
        const actual = await FrenchFamily.generate()
        expect(actual.name).toBe('Dubois')
      })
    })
  })
})
