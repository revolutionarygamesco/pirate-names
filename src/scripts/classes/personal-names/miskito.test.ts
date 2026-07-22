import { beforeEach, describe, it, expect } from 'vitest'
import { loadYaml } from '@revolutionarygamesco/common'
import { mockTables } from '@revolutionarygamesco/common-foundryvtt/mocks'
import { genders, type Gender } from '../../types/enums/gender.ts'
import getRollTableUUID from '../../get-rolltable-uuid.ts'
import BirthContext from '../birth/base.ts'
import PatrilinealFamily from '../families/patrilineal.ts'
import MiskitoPersonalName, { MiskitoPersonalNameTables, type MiskitoPersonalNameData } from './miskito.ts'

describe('MiskitoPersonalNameTables', () => {
  it('imports the Mandinka feminine subjects table', () => {
    const { _id } = loadYaml<{ _id: string }>('src/packs/rolltables/personal.miskito.subj.fem.yaml')
    expect(MiskitoPersonalNameTables.Feminine.Subjects).toBe(getRollTableUUID(_id))
  })

  it('imports the Mandinka feminine modifiers table', () => {
    const { _id } = loadYaml<{ _id: string }>('src/packs/rolltables/personal.miskito.mod.fem.yaml')
    expect(MiskitoPersonalNameTables.Feminine.Modifiers).toBe(getRollTableUUID(_id))
  })

  it('imports the Mandinka masculine subjects table', () => {
    const { _id } = loadYaml<{ _id: string }>('src/packs/rolltables/personal.miskito.subj.masc.yaml')
    expect(MiskitoPersonalNameTables.Masculine.Subjects).toBe(getRollTableUUID(_id))
  })

  it('imports the Mandinka masculine modifiers table', () => {
    const { _id } = loadYaml<{ _id: string }>('src/packs/rolltables/personal.miskito.mod.masc.yaml')
    expect(MiskitoPersonalNameTables.Masculine.Modifiers).toBe(getRollTableUUID(_id))
  })
})

describe('MiskitoPersonalName', () => {
  const family = new PatrilinealFamily()
  const birth = new BirthContext({}, family)
  const data: MiskitoPersonalNameData = {
    nationality: 'Miskito',
    family: family.toObject(),
    birth: birth.toObject(),
    gender: 'Feminine',
    full: 'Slilma Sangni',
    personal: 'Slilma Sangni'
  }

  beforeEach(() => {
    mockTables({
      [MiskitoPersonalNameTables.Masculine.Subjects]: { results: [{ description: 'Kwasku' } as foundry.documents.TableResult] },
      [MiskitoPersonalNameTables.Masculine.Modifiers]: { results: [{ description: 'Isti' } as foundry.documents.TableResult] },
      [MiskitoPersonalNameTables.Feminine.Subjects]: { results: [{ description: 'Yu' } as foundry.documents.TableResult] },
      [MiskitoPersonalNameTables.Feminine.Modifiers]: { results: [{ description: 'Pauni' } as foundry.documents.TableResult] }
    })
  })

  describe('constructor', () => {
    it('creates a Miskito name', () => {
      const actual = new MiskitoPersonalName()
      expect(actual).toBeInstanceOf(MiskitoPersonalName)
    })

    it('sets nationality to Miskito', () => {
      const actual = new MiskitoPersonalName()
      expect(actual.nationality).toBe('Miskito')
    })

    it.each(genders)('can assign %s to gender', (gender: Gender) => {
      const actual = new MiskitoPersonalName({ gender })
      expect(actual.gender).toBe(gender)
    })

    it('randomizes the gender by default', () => {
      const actual = new MiskitoPersonalName()
      expect(genders).toContain(actual.gender)
    })

    it('defaults to Lapta Tara for a masculine name', () => {
      const actual = new MiskitoPersonalName({ gender: 'Masculine' })
      expect(actual.personal).toBe('Lapta Tara')
      expect(actual.full).toBe('Lapta Tara')
    })

    it('defaults to Kati Pihni for a feminine name', () => {
      const actual = new MiskitoPersonalName({ gender: 'Feminine' })
      expect(actual.personal).toBe('Kati Pihni')
      expect(actual.full).toBe('Kati Pihni')
    })
  })

  describe('Accessor methods', () => {
    describe('full', () => {
      it('returns the full name', () => {
        const instance = new MiskitoPersonalName(data, { family, birth })
        expect(instance.full).toBe('Slilma Sangni')
      })
    })
  })

  describe('Instance methods', () => {
    describe('address', () => {
      it('returns the concatenation of the title and personal name', () => {
        const instance = new MiskitoPersonalName(data, { family, birth })
        expect(instance.address('Mister')).toBe('Mister Slilma Sangni')
      })
    })

    describe('toObject', () => {
      it('returns a data object', () => {
        const instance = new MiskitoPersonalName(data, { family, birth })
        const actual = instance.toObject()
        expect(actual).toEqual(data)
        expect(actual).not.toBe(data)
      })
    })
  })

  describe('Static methods', () => {
    describe('generator', () => {
      it('can generate a masculine name', async () => {
        const [actual] = await MiskitoPersonalName.generate({ gender: 'Masculine' })
        expect(actual.full).toBe('Kwasku Isti')
        expect(actual.personal).toBe('Kwasku Isti')
      })

      it('can generate a feminine name', async () => {
        const [actual] = await MiskitoPersonalName.generate({ gender: 'Feminine' })
        expect(actual.full).toBe('Yu Pauni')
        expect(actual.personal).toBe('Yu Pauni')
      })
    })
  })
})
