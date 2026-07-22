import { beforeEach, describe, it, expect } from 'vitest'
import { loadYaml } from '@revolutionarygamesco/common/testing'
import { mockTables } from '@revolutionarygamesco/common-foundryvtt/mocks'
import getRollTableUUID from '../../get-rolltable-uuid.ts'
import BantuFamily, { Nkumbu, type BantuFamilyData } from './bantu.ts'

describe('Nkumbu', () => {
  it('imports the right table', () => {
    const { _id } = loadYaml<{ _id: string }>('src/packs/rolltables/personal.bantu.nkumbu.yaml')
    expect(Nkumbu).toBe(getRollTableUUID(_id))
  })
})

describe('BantuFamily', () => {
  const data: BantuFamilyData = {
    nationality: 'Bantu',
    size: 3,
    patriarch: 'Nzala'
  }

  beforeEach(() => {
    mockTables({
      [Nkumbu]: { results: [{ description: 'Mayangi' } as foundry.documents.TableResult] }
    })
  })

  describe('constructor', () => {
    it('creates a Bantu family', () => {
      const actual = new BantuFamily()
      expect(actual).toBeInstanceOf(BantuFamily)
    })

    it('sets nationality to Bantu', () => {
      const actual = new BantuFamily()
      expect(actual.nationality).toBe('Bantu')
    })

    it('sets the patriarch’s name to Zola by default', () => {
      const actual = new BantuFamily()
      expect(actual.patriarch).toBe('Zola')
    })
  })

  describe('Instance methods', () => {
    describe('renderPatronym', () => {
      it('returns the patronym', () => {
        const instance = new BantuFamily()
        expect(instance.renderPatronym()).toBe('a Zola')
      })
    })

    describe('toObject', () => {
      it('returns a data object', () => {
        const instance = new BantuFamily(data)
        const actual = instance.toObject()
        expect(actual).toEqual(data)
        expect(actual).not.toBe(data)
      })
    })
  })

  describe('Static methods', () => {
    describe('generator', () => {
      it('generates an Akan family', async () => {
        const actual = await BantuFamily.generate()
        expect(actual.patriarch).toBe('Mayangi')
      })
    })
  })
})
