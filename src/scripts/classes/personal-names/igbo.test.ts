import { beforeEach, describe, it, expect } from 'vitest'
import { mockTables } from '@revolutionarygamesco/common-foundryvtt/mocks'
import { genders, type Gender } from '../../enums/gender.ts'
import IgboPersonalName, { IgboPersonalNameTables, type IgboPersonalNameData } from './igbo.ts'

describe('IgboPersonalName', () => {
  const data: IgboPersonalNameData = {
    nationality: 'Igbo',
    gender: 'Masculine',
    full: 'Olaudah Equiano',
    personal: 'Olaudah',
    father: 'Equiano',
    weekday: 'Afor'
  }

  beforeEach(() => {
    mockTables({
      [IgboPersonalNameTables.WeekdayNames.Afor.Feminine]: { results: [{ description: 'Mgbafor' } as foundry.documents.TableResult] },
      [IgboPersonalNameTables.WeekdayNames.Afor.Masculine]: { results: [{ description: 'Okoafọ' } as foundry.documents.TableResult] },
      [IgboPersonalNameTables.Feminine]: { results: [{ description: 'Houanizei' } as foundry.documents.TableResult] },
      [IgboPersonalNameTables.Masculine]: { results: [{ description: 'Ougeromba' } as foundry.documents.TableResult] }
    })
  })

  describe('constructor', () => {
    it('creates an Igbo name', () => {
      const actual = new IgboPersonalName()
      expect(actual).toBeInstanceOf(IgboPersonalName)
    })

    it('sets nationality to Igbo', () => {
      const actual = new IgboPersonalName()
      expect(actual.nationality).toBe('Igbo')
    })

    it.each(genders)('can assign %s to gender', (gender: Gender) => {
      const actual = new IgboPersonalName({ gender })
      expect(actual.gender).toBe(gender)
    })

    it('randomizes the gender by default', () => {
      const actual = new IgboPersonalName()
      expect(genders).toContain(actual.gender)
    })

    it('can take a full name', () => {
      const actual = new IgboPersonalName({ full: 'Olaudah Equiano' })
      expect(actual.full).toBe('Olaudah Equiano')
    })

    it('defaults to Ougeromba Ougeromba for a masculine name', () => {
      const actual = new IgboPersonalName({ gender: 'Masculine' })
      expect(actual.full).toBe('Ougeromba Ougeromba')
    })

    it('defaults to Houanizei Ougeromba for a feminine name', () => {
      const actual = new IgboPersonalName({ gender: 'Feminine' })
      expect(actual.full).toBe('Houanizei Ougeromba')
    })

    it('can take a personal name', () => {
      const actual = new IgboPersonalName({ personal: 'Olaudah' })
      expect(actual.personal).toBe('Olaudah')
    })

    it('defaults to Ougeromba for a masculine name', () => {
      const actual = new IgboPersonalName({ gender: 'Masculine' })
      expect(actual.personal).toBe('Ougeromba')
    })

    it('defaults to Houanizei for a feminine name', () => {
      const actual = new IgboPersonalName({ gender: 'Feminine' })
      expect(actual.personal).toBe('Houanizei')
    })

    it('can take a father’s name', () => {
      const actual = new IgboPersonalName({ father: 'Equiano' })
      expect(actual.father).toBe('Equiano')
    })

    it('defaults to Ougeromba', () => {
      const actual = new IgboPersonalName()
      expect(actual.father).toBe('Ougeromba')
    })
  })

  describe('Instance methods', () => {
    describe('toObject', () => {
      it('returns a data object', () => {
        const instance = new IgboPersonalName(data)
        const actual = instance.toObject()
        expect(actual).toEqual(data)
        expect(actual).not.toBe(data)
      })
    })
  })

  describe('Static methods', () => {
    describe('generator', () => {
      it('can generate a masculine name', async () => {
        const [actual] = await IgboPersonalName.generate({ gender: 'Masculine', weekday: 'Afor' })
        expect(actual.full).toBe('Okoafọ Ougeromba Ougeromba')
        expect(actual.personal).toBe('Ougeromba')
        expect(actual.father).toBe('Ougeromba')
      })

      it('can generate a feminine name', async () => {
        const [actual] = await IgboPersonalName.generate({ gender: 'Feminine', weekday: 'Afor' })
        expect(actual.full).toBe('Mgbafor Houanizei Ougeromba')
        expect(actual.personal).toBe('Houanizei')
        expect(actual.father).toBe('Ougeromba')
      })
    })
  })
})
