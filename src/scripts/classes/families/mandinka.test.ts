import { beforeEach, describe, it, expect } from 'vitest'
import { mockTables } from '@revolutionarygamesco/common-foundryvtt/mocks'
import MandinkaFamily, { Jamu, type MandinkaFamilyData } from './mandinka.ts'

describe('MandinkaFamily', () => {
  const data: MandinkaFamilyData = {
    nationality: 'Mandinka',
    size: 3,
    name: 'Jarra',
    caste: 'Foro'
  }

  beforeEach(() => {
    mockTables({
      [Jamu.Foro]: { results: [{ description: 'Jara' } as foundry.documents.TableResult] }
    })
  })

  describe('constructor', () => {
    it('creates an Mandinka family', () => {
      const actual = new MandinkaFamily()
      expect(actual).toBeInstanceOf(MandinkaFamily)
    })

    it('sets nationality to Mandinka', () => {
      const actual = new MandinkaFamily()
      expect(actual.nationality).toBe('Mandinka')
    })

    it('sets the family name to Trawally by default', () => {
      const actual = new MandinkaFamily()
      expect(actual.name).toBe('Trawally')
    })

    it('sets the caste to Foro by default', () => {
      const actual = new MandinkaFamily()
      expect(actual.caste).toBe('Foro')
    })
  })

  describe('Instance methods', () => {
    describe('toObject', () => {
      it('returns a data object', () => {
        const instance = new MandinkaFamily(data)
        const actual = instance.toObject()
        expect(actual).toEqual(data)
        expect(actual).not.toBe(data)
      })
    })
  })

  describe('Static methods', () => {
    describe('generator', () => {
      it('generates an Mandinka family', async () => {
        const actual = await MandinkaFamily.generate({ caste: 'Foro' })
        expect(actual.name).toBe('Jara')
      })
    })
  })
})
