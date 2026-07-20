import { beforeEach, describe, it, expect } from 'vitest'
import { mockTables } from '@revolutionarygamesco/common-foundryvtt/mocks'
import { genders, type Gender } from '../../enums/gender.ts'
import FrenchPersonalName, {
  FrenchPersonalNameTables,
  FrenchCompoundNames,
  type FrenchPersonalNameData
} from './french.ts'

describe('FrenchPersonalName', () => {
  const data: FrenchPersonalNameData = {
    nationality: 'French',
    gender: 'Masculine',
    full: 'Olivier Levasseur',
    personal: 'Olivier',
    family: 'Levasseur'
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

    it('can take a full name', () => {
      const actual = new FrenchPersonalName({ full: 'Olivier Levasseur' })
      expect(actual.full).toBe('Olivier Levasseur')
    })

    it('defaults to Jean Dupont for a masculine name', () => {
      const actual = new FrenchPersonalName({ gender: 'Masculine' })
      expect(actual.full).toBe('Jean Dupont')
    })

    it('defaults to Marie Dupont for a feminine name', () => {
      const actual = new FrenchPersonalName({ gender: 'Feminine' })
      expect(actual.full).toBe('Marie Dupont')
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

    it('can take a family name', () => {
      const actual = new FrenchPersonalName({ family: 'Levasseur' })
      expect(actual.family).toBe('Levasseur')
    })

    it('defaults to Dupont', () => {
      const actual = new FrenchPersonalName()
      expect(actual.family).toBe('Dupont')
    })
  })

  describe('Instance methods', () => {
    describe('toObject', () => {
      it('returns a data object', () => {
        const instance = new FrenchPersonalName(data)
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
        const actual = await FrenchPersonalName.generate({ gender: 'Masculine' })
        expect(actual.full).toBe('Pierre Durand')
        expect(actual.personal).toBe('Pierre')
        expect(actual.family).toBe('Durand')
      })

      it('can generate a feminine name', async () => {
        const actual = await FrenchPersonalName.generate({ gender: 'Feminine' })
        expect(actual.full).toBe('Marguerite Durand')
        expect(actual.personal).toBe('Marguerite')
        expect(actual.family).toBe('Durand')
      })

      it('can generate a compound name', async () => {
        const actual = await FrenchPersonalName.generate({ gender: 'Masculine', personal: 'Jean' })
        const expected = FrenchCompoundNames.Jean.map(compound => `Jean-${compound} Durand`)
        expect(['Jean Durand', ...expected]).toContain(actual.full)
      })
    })
  })
})
