import { beforeEach, describe, it, expect } from 'vitest'
import { mockTables } from '@revolutionarygamesco/common-foundryvtt/mocks'
import { genders, type Gender } from '../../enums/gender.ts'
import DutchPersonalName, { DutchPersonalNameTables, type DutchPersonalNameData } from './dutch.ts'

describe('DutchPersonalName', () => {
  const data: DutchPersonalNameData = {
    nationality: 'Dutch',
    gender: 'Masculine',
    full: 'Dirk Chivers',
    personal: 'Dirk',
    family: 'Chivers'
  }

  beforeEach(() => {
    mockTables({
      [DutchPersonalNameTables.Feminine]: { results: [{ description: 'Anna' } as foundry.documents.TableResult] },
      [DutchPersonalNameTables.Masculine]: { results: [{ description: 'Johannes' } as foundry.documents.TableResult] },
      [DutchPersonalNameTables.Surnames]: { results: [{ description: 'Smit' } as foundry.documents.TableResult] }
    })
  })

  describe('constructor', () => {
    it('creates a Dutch name', () => {
      const actual = new DutchPersonalName()
      expect(actual).toBeInstanceOf(DutchPersonalName)
    })

    it('sets nationality to Dutch', () => {
      const actual = new DutchPersonalName()
      expect(actual.nationality).toBe('Dutch')
    })

    it.each(genders)('can assign %s to gender', (gender: Gender) => {
      const actual = new DutchPersonalName({ gender })
      expect(actual.gender).toBe(gender)
    })

    it('randomizes the gender by default', () => {
      const actual = new DutchPersonalName()
      expect(genders).toContain(actual.gender)
    })

    it('can take a full name', () => {
      const actual = new DutchPersonalName({ full: 'Dirk Chivers' })
      expect(actual.full).toBe('Dirk Chivers')
    })

    it('defaults to Jan van den Berg for a masculine name', () => {
      const actual = new DutchPersonalName({ gender: 'Masculine' })
      expect(actual.full).toBe('Jan van den Berg')
    })

    it('defaults to Maria van den Berg for a feminine name', () => {
      const actual = new DutchPersonalName({ gender: 'Feminine' })
      expect(actual.full).toBe('Maria van den Berg')
    })

    it('can take a personal name', () => {
      const actual = new DutchPersonalName({ personal: 'Dirk' })
      expect(actual.personal).toBe('Dirk')
    })

    it('defaults to Jan for a masculine name', () => {
      const actual = new DutchPersonalName({ gender: 'Masculine' })
      expect(actual.personal).toBe('Jan')
    })

    it('defaults to Maria for a feminine name', () => {
      const actual = new DutchPersonalName({ gender: 'Feminine' })
      expect(actual.personal).toBe('Maria')
    })

    it('can take a family name', () => {
      const actual = new DutchPersonalName({ family: 'Chivers' })
      expect(actual.family).toBe('Chivers')
    })

    it('defaults to van den Berg', () => {
      const actual = new DutchPersonalName()
      expect(actual.family).toBe('van den Berg')
    })
  })

  describe('Instance methods', () => {
    describe('compose', () => {
      it('can compose a name with a surname', () => {
        const instance = new DutchPersonalName({ personal: 'Dirk', family: 'Chivers', gender: 'Masculine' })
        expect(instance.compose()).toBe('Dirk Chivers')
      })

      it('can compose a name with a patronymic', () => {
        const instance = new DutchPersonalName({ personal: 'Jan', father: 'Jan', gender: 'Masculine' })
        expect(instance.compose()).toBe('Jan Janszoon')
      })
    })

    describe('toObject', () => {
      it('returns a data object', () => {
        const instance = new DutchPersonalName(data)
        const actual = instance.toObject()
        expect(actual).toEqual(data)
        expect(actual).not.toBe(data)
      })
    })
  })

  describe('Static methods', () => {
    describe('renderPatronymic', () => {
      it('can render a son’s patronymic', () => {
        expect(DutchPersonalName.renderPatronymic('Jan', 'Masculine')).toBe('Janszoon')
      })

      it('can render a daughter’s patronymic', () => {
        expect(DutchPersonalName.renderPatronymic('Jan', 'Feminine')).toBe('Jansdochter')
      })
    })

    describe('generator', () => {
      it('can generate a masculine name with a surname', async () => {
        const actual = await DutchPersonalName.generate({ gender: 'Masculine', family: 'Bakker' })
        expect(actual.full).toBe('Johannes Bakker')
        expect(actual.personal).toBe('Johannes')
        expect(actual.family).toBe('Bakker')
      })

      it('can generate a masculine name with a patronymic', async () => {
        const actual = await DutchPersonalName.generate({ gender: 'Masculine', father: 'Piet' })
        expect(actual.full).toBe('Johannes Pietszoon')
        expect(actual.personal).toBe('Johannes')
        expect(actual.father).toBe('Piet')
      })

      it('can generate a feminine name with a surname', async () => {
        const actual = await DutchPersonalName.generate({ gender: 'Feminine', family: 'Bakker' })
        expect(actual.full).toBe('Anna Bakker')
        expect(actual.personal).toBe('Anna')
        expect(actual.family).toBe('Bakker')
      })

      it('can generate a feminine name with a patronymic', async () => {
        const actual = await DutchPersonalName.generate({ gender: 'Feminine', father: 'Piet' })
        expect(actual.full).toBe('Anna Pietsdochter')
        expect(actual.personal).toBe('Anna')
        expect(actual.father).toBe('Piet')
      })
    })
  })
})
