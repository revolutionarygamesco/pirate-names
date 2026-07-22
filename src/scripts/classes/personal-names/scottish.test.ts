import { beforeEach, describe, it, expect } from 'vitest'
import { loadYaml } from '@revolutionarygamesco/common/testing'
import { mockTables } from '@revolutionarygamesco/common-foundryvtt/mocks'
import { genders, type Gender } from '../../types/enums/gender.ts'
import getRollTableUUID from '../../get-rolltable-uuid.ts'
import BirthContext from '../birth/base.ts'
import ScottishFamily from '../families/scottish.ts'
import ScottishPersonalName, { ScottishPersonalNameTables, type ScottishPersonalNameData } from './scottish.ts'

describe('ScottishPersonalNameTables', () => {
  it('imports the Scottish surname table', () => {
    const { _id } = loadYaml<{ _id: string }>('src/packs/rolltables/personal.scottish.sur.yaml')
    expect(ScottishPersonalNameTables.Surnames).toBe(getRollTableUUID(_id))
  })

  it('imports the Scottish feminine name table', () => {
    const { _id } = loadYaml<{ _id: string }>('src/packs/rolltables/personal.scottish.fem.yaml')
    expect(ScottishPersonalNameTables.Feminine).toBe(getRollTableUUID(_id))
  })

  it('imports the Scottish masculine name table', () => {
    const { _id } = loadYaml<{ _id: string }>('src/packs/rolltables/personal.scottish.masc.yaml')
    expect(ScottishPersonalNameTables.Masculine).toBe(getRollTableUUID(_id))
  })
})

describe('ScottishPersonalName', () => {
  const family = new ScottishFamily({ name: 'Kidd' })
  const birth = new BirthContext({}, family)
  const data: ScottishPersonalNameData = {
    nationality: 'Scottish',
    family: family.toObject(),
    birth: birth.toObject(),
    gender: 'Masculine',
    full: 'William Kidd',
    personal: 'William'
  }

  beforeEach(() => {
    mockTables({
      [ScottishPersonalNameTables.Feminine]: { results: [{ description: 'Charlotte' } as foundry.documents.TableResult] },
      [ScottishPersonalNameTables.Masculine]: { results: [{ description: 'Ninian' } as foundry.documents.TableResult] },
      [ScottishPersonalNameTables.Surnames]: { results: [{ description: 'Kerr' } as foundry.documents.TableResult] }
    })
  })

  describe('constructor', () => {
    it('creates a Scottish name', () => {
      const actual = new ScottishPersonalName()
      expect(actual).toBeInstanceOf(ScottishPersonalName)
    })

    it('sets nationality to Scottish', () => {
      const actual = new ScottishPersonalName()
      expect(actual.nationality).toBe('Scottish')
    })

    it.each(genders)('can assign %s to gender', (gender: Gender) => {
      const actual = new ScottishPersonalName({ gender })
      expect(actual.gender).toBe(gender)
    })

    it('randomizes the gender by default', () => {
      const actual = new ScottishPersonalName()
      expect(genders).toContain(actual.gender)
    })

    it('can take a personal name', () => {
      const actual = new ScottishPersonalName({ personal: 'William' })
      expect(actual.personal).toBe('William')
    })

    it('defaults to John for a masculine name', () => {
      const actual = new ScottishPersonalName({ gender: 'Masculine' })
      expect(actual.personal).toBe('John')
    })

    it('defaults to Mary for a feminine name', () => {
      const actual = new ScottishPersonalName({ gender: 'Feminine' })
      expect(actual.personal).toBe('Mary')
    })
  })

  describe('Accessor methods', () => {
    describe('full', () => {
      it('returns the full name', () => {
        const instance = new ScottishPersonalName(data)
        expect(instance.full).toBe('William Kidd')
      })
    })
  })

  describe('Instance methods', () => {
    describe('address', () => {
      it('concatenates title and family name', () => {
        const instance = new ScottishPersonalName(data)
        expect(instance.address('Captain')).toBe('Captain Kidd')
      })
    })

    describe('toObject', () => {
      it('returns a data object', () => {
        const instance = new ScottishPersonalName(data, { family, birth })
        const actual = instance.toObject()
        expect(actual).toEqual(data)
        expect(actual).not.toBe(data)
      })
    })
  })

  describe('Static methods', () => {
    describe('generator', () => {
      it('can generate a masculine name', async () => {
        const [actual] = await ScottishPersonalName.generate({ gender: 'Masculine' })
        expect(actual.full).toBe('Ninian Kerr')
        expect(actual.personal).toBe('Ninian')
      })

      it('can generate a feminine name', async () => {
        const [actual] = await ScottishPersonalName.generate({ gender: 'Feminine' })
        expect(actual.full).toBe('Charlotte Kerr')
        expect(actual.personal).toBe('Charlotte')
      })
    })
  })
})
