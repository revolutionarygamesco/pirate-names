import { beforeEach, describe, it, expect } from 'vitest'
import { mockTables } from '@revolutionarygamesco/common-foundryvtt/mocks'
import {type SpanishSurnameConjunction, spanishSurnameConjunctions} from '../../types/enums/ssconj.ts'
import SpanishFamily, { SpanishFamilyNames, type SpanishFamilyData, type SpanishSurname } from './spanish.ts'

describe('SpanishFamily', () => {
  const data: SpanishFamilyData = {
    nationality: 'Spanish',
    size: 3,
    name: 'Ortega',
    full: 'Ortega de Calderón y García-Iglesias'
  }

  beforeEach(() => {
    mockTables({
      [SpanishFamilyNames]: { results: [{ description: 'Diaz' } as foundry.documents.TableResult] }
    })
  })

  describe('constructor', () => {
    it('creates an Spanish family', () => {
      const actual = new SpanishFamily()
      expect(actual).toBeInstanceOf(SpanishFamily)
    })

    it('sets nationality to Spanish', () => {
      const actual = new SpanishFamily()
      expect(actual.nationality).toBe('Spanish')
    })

    it('sets the family name to Rodriguez by default', () => {
      const actual = new SpanishFamily()
      expect(actual.name).toBe('Rodriguez')
    })

    it('can set the full version', () => {
      const actual = new SpanishFamily(data)
      expect(actual.full).toBe(data.full)
    })

    it('defaults the full name to the family name', () => {
      const actual = new SpanishFamily()
      expect(actual.full).toBe(actual.name)
    })
  })

  describe('Instance methods', () => {
    describe('toObject', () => {
      it('returns a data object', () => {
        const instance = new SpanishFamily(data)
        const actual = instance.toObject()
        expect(actual).toEqual(data)
        expect(actual).not.toBe(data)
      })
    })
  })

  describe('Static methods', () => {
    describe('renderSurname', () => {
      const cases = spanishSurnameConjunctions
        .map(conj => {
          const str = conj === '-' ? conj : ` ${conj} `
          return [str, conj]
        }) as Array<[string, SpanishSurnameConjunction]>

      it.each(cases)('renders Garcia%sIglesias when given %s', (expected, conj) => {
        const surname: SpanishSurname = {
          names: ['Garcia', 'Iglesias'],
          conj
        }
        expect(SpanishFamily.renderSurname(surname)).toBe(`Garcia${expected}Iglesias`)
      })

      it('returns a single name if that’s all there is', () => {
        const surname: SpanishSurname = { names: ['Garcia'], conj: '-' }
        expect(SpanishFamily.renderSurname(surname)).toBe('Garcia')
      })
    })

    describe('generator', () => {
      it('generates an Spanish family', async () => {
        const actual = await SpanishFamily.generate()
        expect(actual.name).toBe('Diaz')
      })
    })
  })
})
