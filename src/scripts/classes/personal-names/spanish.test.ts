import { beforeEach, describe, it, expect } from 'vitest'
import { mockTables } from '@revolutionarygamesco/common-foundryvtt/mocks'
import { genders, type Gender } from '../../types/enums/gender.ts'
import BirthContext from '../birth/base.ts'
import SpanishFamily from '../families/spanish.ts'
import SpanishPersonalName, {
  SpanishPersonalNameTables,
  SpanishCompoundNames,
  type SpanishPersonalNameData
} from './spanish.ts'

describe('SpanishPersonalName', () => {
  const family = new SpanishFamily({ name: 'Pargo', full: 'Rodríguez-Felipe y Tejera Machado' })
  const birth = new BirthContext({}, family)
  const data: SpanishPersonalNameData = {
    nationality: 'Spanish',
    family: family.toObject(),
    birth: birth.toObject(),
    gender: 'Masculine',
    full: 'Amaro Rodríguez-Felipe y Tejera Machado',
    short: 'Amaro Pargo',
    personal: 'Amaro'
  }

  beforeEach(() => {
    mockTables({
      [SpanishPersonalNameTables.Feminine]: { results: [{ description: 'Francisca' } as foundry.documents.TableResult] },
      [SpanishPersonalNameTables.Masculine]: { results: [{ description: 'Cristóbal' } as foundry.documents.TableResult] },
      [SpanishPersonalNameTables.Surnames]: { results: [{ description: 'Perez' } as foundry.documents.TableResult] }
    })
  })

  describe('constructor', () => {
    it('creates a Spanish name', () => {
      const actual = new SpanishPersonalName()
      expect(actual).toBeInstanceOf(SpanishPersonalName)
    })

    it('sets nationality to Spanish', () => {
      const actual = new SpanishPersonalName()
      expect(actual.nationality).toBe('Spanish')
    })

    it.each(genders)('can assign %s to gender', (gender: Gender) => {
      const actual = new SpanishPersonalName({ gender })
      expect(actual.gender).toBe(gender)
    })

    it('randomizes the gender by default', () => {
      const actual = new SpanishPersonalName()
      expect(genders).toContain(actual.gender)
    })

    it('can take a personal name', () => {
      const actual = new SpanishPersonalName({ personal: 'Amaro' })
      expect(actual.personal).toBe('Amaro')
    })

    it('defaults to Juan for a masculine name', () => {
      const actual = new SpanishPersonalName({ gender: 'Masculine' })
      expect(actual.personal).toBe('Juan')
    })

    it('defaults to María for a feminine name', () => {
      const actual = new SpanishPersonalName({ gender: 'Feminine' })
      expect(actual.personal).toBe('María')
    })
  })

  describe('Accessor methods', () => {
    describe('full', () => {
      it('returns the full name', () => {
        const instance = new SpanishPersonalName(data, { family, birth })
        expect(instance.full).toBe('Amaro Rodríguez-Felipe y Tejera Machado')
      })
    })

    describe('short', () => {
      it('returns a shortened version', () => {
        const instance = new SpanishPersonalName(data, { family, birth })
        expect(instance.short).toBe('Amaro Pargo')
      })
    })
  })

  describe('Instance methods', () => {
    describe('address', () => {
      it('concatenates the title with the family name', () => {
        const instance = new SpanishPersonalName(data, { family, birth })
        expect(instance.address('Señor')).toBe('Señor Pargo')
      })
    })

    describe('toObject', () => {
      it('returns a data object', () => {
        const instance = new SpanishPersonalName(data, { family, birth })
        const actual = instance.toObject()
        expect(actual).toEqual(data)
        expect(actual).not.toBe(data)
      })
    })
  })

  describe('Static methods', () => {
    describe('getCompoundOptions', () => {
      it('returns nothing for Francisco', () => {
        const actual = SpanishPersonalName.getCompoundOptions('Francisco')
        expect(actual).toHaveLength(0)
      })

      it.each(Object.keys(SpanishCompoundNames).map(key => {
        return [SpanishCompoundNames[key].length, key]
      }) as Array<[number, string]>)('returns %d options for %s', (expected, name) => {
        const actual = SpanishPersonalName.getCompoundOptions(name)
        expect(actual).toHaveLength(expected)
      })
    })

    describe('generator', () => {
      it('can generate a masculine name', async () => {
        const [actual] = await SpanishPersonalName.generate({ gender: 'Masculine' })
        expect(actual.full).toBe('Cristóbal Perez')
        expect(actual.personal).toBe('Cristóbal')
      })

      it('can generate a feminine name', async () => {
        const [actual] = await SpanishPersonalName.generate({ gender: 'Feminine' })
        expect(actual.full).toBe('Francisca Perez')
        expect(actual.personal).toBe('Francisca')
      })

      it('can generate a compound name', async () => {
        const [actual] = await SpanishPersonalName.generate({ gender: 'Masculine', personal: 'Juan' })
        const expected = SpanishCompoundNames.Juan.map(compound => `Juan ${compound} Perez`)
        expect(['Juan Perez', ...expected]).toContain(actual.full)
      })
    })
  })
})
