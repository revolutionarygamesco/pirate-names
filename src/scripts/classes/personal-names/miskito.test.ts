import { beforeEach, describe, it, expect } from 'vitest'
import { mockTables } from '@revolutionarygamesco/common-foundryvtt/mocks'
import { genders, type Gender } from '../../enums/gender.ts'
import MiskitoPersonalName, { MiskitoPersonalNameTables, type MiskitoPersonalNameData } from './miskito.ts'

describe('MiskitoPersonalName', () => {
  const data: MiskitoPersonalNameData = {
    nationality: 'Miskito',
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

    it('can take a full name', () => {
      const actual = new MiskitoPersonalName({ full: 'Slilma Sangni' })
      expect(actual.full).toBe('Slilma Sangni')
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

  describe('Instance methods', () => {
    describe('toObject', () => {
      it('returns a data object', () => {
        const instance = new MiskitoPersonalName(data)
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
