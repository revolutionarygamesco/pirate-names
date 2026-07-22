import { beforeEach, describe, it, expect } from 'vitest'
import { loadYaml } from '@revolutionarygamesco/common/testing'
import { mockTables } from '@revolutionarygamesco/common-foundryvtt/mocks'
import getRollTableUUID from '../../get-rolltable-uuid.ts'
import MandinkaFamily, { Jamu, type MandinkaFamilyData } from './mandinka.ts'

describe('KalinagoMasculineNames', () => {
  it('imports the right tables for Foro jamu', () => {
    const { _id } = loadYaml<{ _id: string }>('src/packs/rolltables/personal.mandinka.jamu.foro.yaml')
    expect(Jamu.Foro).toBe(getRollTableUUID(_id))
  })

  it('imports the right tables for Jali jamu', () => {
    const { _id } = loadYaml<{ _id: string }>('src/packs/rolltables/personal.mandinka.jamu.griot.yaml')
    expect(Jamu.Jali).toBe(getRollTableUUID(_id))
  })

  it('imports the right tables for Jakhanke jamu', () => {
    const { _id } = loadYaml<{ _id: string }>('src/packs/rolltables/personal.mandinka.jamu.marabout.yaml')
    expect(Jamu.Jakhanke).toBe(getRollTableUUID(_id))
  })

  it('imports the right tables for Nyamakala jamu', () => {
    const { _id } = loadYaml<{ _id: string }>('src/packs/rolltables/personal.mandinka.jamu.blacksmith.yaml')
    expect(Jamu.Nyamakala).toBe(getRollTableUUID(_id))
  })
})

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
