import { beforeEach, describe, it, expect } from 'vitest'
import { loadYaml } from '@revolutionarygamesco/common/testing'
import { mockTables } from '@revolutionarygamesco/common-foundryvtt/mocks'
import getRollTableUUID from '../../get-rolltable-uuid.ts'
import AkanFamily, { AkanFamilyNames, type AkanFamilyData } from './akan.ts'

describe('AkanFamilyNames', () => {
  it('imports the right table', () => {
    const { _id } = loadYaml<{ _id: string }>('src/packs/rolltables/personal.akan.sur.yaml')
    expect(AkanFamilyNames).toBe(getRollTableUUID(_id))
  })
})

describe('AkanFamily', () => {
  const data: AkanFamilyData = {
    nationality: 'Akan',
    size: 3,
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
