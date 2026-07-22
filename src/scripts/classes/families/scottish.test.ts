import { beforeEach, describe, it, expect } from 'vitest'
import { loadYaml } from '@revolutionarygamesco/common'
import { mockTables } from '@revolutionarygamesco/common-foundryvtt/mocks'
import getRollTableUUID from '../../get-rolltable-uuid.ts'
import ScottishFamily, { ScottishFamilyNames, type ScottishFamilyData } from './scottish.ts'

describe('ScottishFamilyNames', () => {
  it('imports the right tables', () => {
    const { _id } = loadYaml<{ _id: string }>('src/packs/rolltables/personal.scottish.sur.yaml')
    expect(ScottishFamilyNames).toBe(getRollTableUUID(_id))
  })
})

describe('ScottishFamily', () => {
  const data: ScottishFamilyData = {
    nationality: 'Scottish',
    size: 3,
    name: 'Smith'
  }

  beforeEach(() => {
    mockTables({
      [ScottishFamilyNames]: { results: [{ description: 'Stewart' } as foundry.documents.TableResult] }
    })
  })

  describe('constructor', () => {
    it('creates an Scottish family', () => {
      const actual = new ScottishFamily()
      expect(actual).toBeInstanceOf(ScottishFamily)
    })

    it('sets nationality to Scottish', () => {
      const actual = new ScottishFamily()
      expect(actual.nationality).toBe('Scottish')
    })

    it('sets the family name to Smith by default', () => {
      const actual = new ScottishFamily()
      expect(actual.name).toBe('Smith')
    })
  })

  describe('Instance methods', () => {
    describe('toObject', () => {
      it('returns a data object', () => {
        const instance = new ScottishFamily(data)
        const actual = instance.toObject()
        expect(actual).toEqual(data)
        expect(actual).not.toBe(data)
      })
    })
  })

  describe('Static methods', () => {
    describe('generator', () => {
      it('generates an Scottish family', async () => {
        const actual = await ScottishFamily.generate()
        expect(actual.name).toBe('Stewart')
      })
    })
  })
})
