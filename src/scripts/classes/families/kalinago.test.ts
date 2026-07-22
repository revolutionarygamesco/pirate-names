import { beforeEach, describe, it, expect } from 'vitest'
import { loadYaml } from '@revolutionarygamesco/common'
import { mockTables } from '@revolutionarygamesco/common-foundryvtt/mocks'
import getRollTableUUID from '../../get-rolltable-uuid.ts'
import KalinagoFamily, { KalinagoMasculineNames, type KalinagoFamilyData } from './kalinago.ts'

describe('KalinagoMasculineNames', () => {
  it('imports the right tables', () => {
    const { _id } = loadYaml<{ _id: string }>('src/packs/rolltables/personal.kalinago.masc.yaml')
    expect(KalinagoMasculineNames).toBe(getRollTableUUID(_id))
  })
})

describe('KalinagoFamily', () => {
  const data: KalinagoFamilyData = {
    nationality: 'Kalinago',
    size: 3,
    patriarch: 'Weyu'
  }

  beforeEach(() => {
    mockTables({
      [KalinagoMasculineNames]: { results: [{ description: 'Nonum' } as foundry.documents.TableResult] }
    })
  })

  describe('constructor', () => {
    it('creates a Kalinago family', () => {
      const actual = new KalinagoFamily()
      expect(actual).toBeInstanceOf(KalinagoFamily)
    })

    it('sets nationality to Kalinago', () => {
      const actual = new KalinagoFamily()
      expect(actual.nationality).toBe('Kalinago')
    })

    it('sets the patriarch’s name to Wukeri by default', () => {
      const actual = new KalinagoFamily()
      expect(actual.patriarch).toBe('Wukeri')
    })
  })

  describe('Instance methods', () => {
    describe('renderPatronym', () => {
      it('returns the patronym', () => {
        const instance = new KalinagoFamily()
        expect(instance.renderPatronym()).toBe('Wukeri')
      })
    })

    describe('toObject', () => {
      it('returns a data object', () => {
        const instance = new KalinagoFamily(data)
        const actual = instance.toObject()
        expect(actual).toEqual(data)
        expect(actual).not.toBe(data)
      })
    })
  })

  describe('Static methods', () => {
    describe('generator', () => {
      it('generates a Kalinago family', async () => {
        const actual = await KalinagoFamily.generate()
        expect(actual.patriarch).toBe('Nonum')
      })
    })
  })
})
