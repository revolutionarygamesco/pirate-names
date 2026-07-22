import { beforeEach, describe, it, expect } from 'vitest'
import { loadYaml } from '@revolutionarygamesco/common'
import { mockTables } from '@revolutionarygamesco/common-foundryvtt/mocks'
import getRollTableUUID from '../../get-rolltable-uuid.ts'
import WelshFamily, { WelshFamilyNames, type WelshFamilyData } from './welsh.ts'

describe('WelshFamilyNames', () => {
  it('imports the right tables', () => {
    const { _id } = loadYaml<{ _id: string }>('src/packs/rolltables/personal.welsh.sur.yaml')
    expect(WelshFamilyNames).toBe(getRollTableUUID(_id))
  })
})

describe('WelshFamily', () => {
  const data: WelshFamilyData = {
    nationality: 'Welsh',
    size: 3,
    name: 'Jones'
  }

  beforeEach(() => {
    mockTables({
      [WelshFamilyNames]: { results: [{ description: 'Morgan' } as foundry.documents.TableResult] }
    })
  })

  describe('constructor', () => {
    it('creates an Welsh family', () => {
      const actual = new WelshFamily()
      expect(actual).toBeInstanceOf(WelshFamily)
    })

    it('sets nationality to Welsh', () => {
      const actual = new WelshFamily()
      expect(actual.nationality).toBe('Welsh')
    })

    it('sets the family name to Jones by default', () => {
      const actual = new WelshFamily()
      expect(actual.name).toBe('Jones')
    })
  })

  describe('Instance methods', () => {
    describe('toObject', () => {
      it('returns a data object', () => {
        const instance = new WelshFamily(data)
        const actual = instance.toObject()
        expect(actual).toEqual(data)
        expect(actual).not.toBe(data)
      })
    })
  })

  describe('Static methods', () => {
    describe('generator', () => {
      it('generates an Welsh family', async () => {
        const actual = await WelshFamily.generate()
        expect(actual.name).toBe('Morgan')
      })
    })
  })
})
