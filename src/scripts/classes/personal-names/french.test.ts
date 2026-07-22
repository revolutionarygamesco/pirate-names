import { beforeEach, describe, it, expect } from 'vitest'
import { loadYaml } from '@revolutionarygamesco/common'
import { mockTables } from '@revolutionarygamesco/common-foundryvtt/mocks'
import { genders, type Gender } from '../../types/enums/gender.ts'
import getRollTableUUID from '../../get-rolltable-uuid.ts'
import BirthContext from '../birth/base.ts'
import FrenchFamily from '../families/french.ts'
import FrenchPersonalName, {
  FrenchPersonalNameTables,
  FrenchCompoundNames,
  type FrenchPersonalNameData
} from './french.ts'

describe('FrenchPersonalNameTables', () => {
  it('imports the French surname table', () => {
    const { _id } = loadYaml<{ _id: string }>('src/packs/rolltables/personal.french.sur.yaml')
    expect(FrenchPersonalNameTables.Surnames).toBe(getRollTableUUID(_id))
  })

  it('imports the French feminine name table', () => {
    const { _id } = loadYaml<{ _id: string }>('src/packs/rolltables/personal.french.fem.yaml')
    expect(FrenchPersonalNameTables.Feminine).toBe(getRollTableUUID(_id))
  })

  it('imports the French masculine name table', () => {
    const { _id } = loadYaml<{ _id: string }>('src/packs/rolltables/personal.french.masc.yaml')
    expect(FrenchPersonalNameTables.Masculine).toBe(getRollTableUUID(_id))
  })
})

describe('FrenchPersonalName', () => {
  const family = new FrenchFamily({ name: 'Levasseur' })
  const birth = new BirthContext({}, family)
  const data: FrenchPersonalNameData = {
    nationality: 'French',
    family: family.toObject(),
    birth: birth.toObject(),
    gender: 'Masculine',
    full: 'Olivier Levasseur',
    personal: 'Olivier'
  }

  beforeEach(() => {
    mockTables({
      [FrenchPersonalNameTables.Feminine]: { results: [{ description: 'Marguerite' } as foundry.documents.TableResult] },
      [FrenchPersonalNameTables.Masculine]: { results: [{ description: 'Pierre' } as foundry.documents.TableResult] },
      [FrenchPersonalNameTables.Surnames]: { results: [{ description: 'Durand' } as foundry.documents.TableResult] }
    })
  })

  describe('constructor', () => {
    it('creates a French name', () => {
      const actual = new FrenchPersonalName()
      expect(actual).toBeInstanceOf(FrenchPersonalName)
    })

    it('sets nationality to French', () => {
      const actual = new FrenchPersonalName()
      expect(actual.nationality).toBe('French')
    })

    it.each(genders)('can assign %s to gender', (gender: Gender) => {
      const actual = new FrenchPersonalName({ gender })
      expect(actual.gender).toBe(gender)
    })

    it('randomizes the gender by default', () => {
      const actual = new FrenchPersonalName()
      expect(genders).toContain(actual.gender)
    })

    it('can take a personal name', () => {
      const actual = new FrenchPersonalName({ personal: 'Olivier' })
      expect(actual.personal).toBe('Olivier')
    })

    it('defaults to Jean for a masculine name', () => {
      const actual = new FrenchPersonalName({ gender: 'Masculine' })
      expect(actual.personal).toBe('Jean')
    })

    it('defaults to Marie for a feminine name', () => {
      const actual = new FrenchPersonalName({ gender: 'Feminine' })
      expect(actual.personal).toBe('Marie')
    })
  })

  describe('Accessor methods', () => {
    describe('full', () => {
      it('returns the full name', () => {
        const instance = new FrenchPersonalName(data, { family, birth })
        expect(instance.full).toBe('Olivier Levasseur')
      })
    })
  })

  describe('Instance methods', () => {
    describe('address', () => {
      it('concatenates the title with the family name', () => {
        const instance = new FrenchPersonalName(data, { family, birth })
        expect(instance.address('Monsieur')).toBe('Monsieur Levasseur')
      })
    })

    describe('toObject', () => {
      it('returns a data object', () => {
        const instance = new FrenchPersonalName(data, { family, birth })
        const actual = instance.toObject()
        expect(actual).toEqual(data)
        expect(actual).not.toBe(data)
      })
    })
  })

  describe('Static methods', () => {
    describe('getCompoundOptions', () => {
      it('returns nothing for Pierre', () => {
        const actual = FrenchPersonalName.getCompoundOptions('Pierre')
        expect(actual).toHaveLength(0)
      })

      it.each(Object.keys(FrenchCompoundNames).map(key => {
        return [FrenchCompoundNames[key].length, key]
      }) as Array<[number, string]>)('returns %d options for %s', (expected, name) => {
        const actual = FrenchPersonalName.getCompoundOptions(name)
        expect(actual).toHaveLength(expected)
      })
    })

    describe('generator', () => {
      it('can generate a masculine name', async () => {
        const [actual] = await FrenchPersonalName.generate({ gender: 'Masculine' })
        expect(actual.full).toBe('Pierre Durand')
        expect(actual.personal).toBe('Pierre')
      })

      it('can generate a feminine name', async () => {
        const [actual] = await FrenchPersonalName.generate({ gender: 'Feminine' })
        expect(actual.full).toBe('Marguerite Durand')
        expect(actual.personal).toBe('Marguerite')
      })

      it('can generate a compound name', async () => {
        const [actual] = await FrenchPersonalName.generate({ gender: 'Masculine', personal: 'Jean' })
        const expected = FrenchCompoundNames.Jean.map(compound => `Jean-${compound} Durand`)
        expect(['Jean Durand', ...expected]).toContain(actual.full)
      })
    })
  })
})
