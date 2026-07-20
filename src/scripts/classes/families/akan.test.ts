import { beforeEach, describe, it, expect } from 'vitest'
import { mockTables } from '@revolutionarygamesco/common-foundryvtt/mocks'
import { type NamedFamilyData } from './named.ts'
import AkanFamily, { AkanFamilyNames } from './akan.ts'

describe('AkanFamily', () => {
  const data: NamedFamilyData = {
    nationality: 'Akan',
    size: 3,
    order: 2,
    twin: false,
    name: 'Gyasi'
  }

  beforeEach(() => {
    mockTables({
      [AkanFamilyNames]: { results: [{ description: 'Appiah' } as foundry.documents.TableResult] }
    })
  })

  describe('constructor', () => {
    it('creates an Akan family', () => {
      const actual = new AkanFamily()
      expect(actual).toBeInstanceOf(AkanFamily)
    })

    it('sets nationality to Akan', () => {
      const actual = new AkanFamily()
      expect(actual.nationality).toBe('Akan')
    })

    it('sets the family name to Mensah by default', () => {
      const actual = new AkanFamily()
      expect(actual.name).toBe('Mensah')
    })
  })

  describe('Instance methods', () => {
    describe('toObject', () => {
      it('returns a data object', () => {
        const instance = new AkanFamily(data)
        const actual = instance.toObject()
        expect(actual).toEqual(data)
        expect(actual).not.toBe(data)
      })
    })
  })

  describe('Static methods', () => {
    describe('generator', () => {
      it('generates an Akan family', async () => {
        const actual = await AkanFamily.generate()
        expect(actual.name).toBe('Appiah')
      })
    })
  })
})
