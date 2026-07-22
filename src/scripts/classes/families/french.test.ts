import { beforeEach, describe, it, expect } from 'vitest'
import { loadYaml } from '@revolutionarygamesco/common'
import { mockTables } from '@revolutionarygamesco/common-foundryvtt/mocks'
import getRollTableUUID from '../../get-rolltable-uuid.ts'
import FrenchFamily, { FrenchFamilyNames, type FrenchFamilyData } from './french.ts'

describe('FrenchFamilyNames', () => {
  it('imports the right tables', () => {
    const { _id } = loadYaml<{ _id: string }>('src/packs/rolltables/personal.french.sur.yaml')
    expect(FrenchFamilyNames).toBe(getRollTableUUID(_id))
  })
})

describe('FrenchFamily', () => {
  const data: FrenchFamilyData = {
    nationality: 'French',
    size: 3,
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
