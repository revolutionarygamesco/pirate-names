import { beforeEach, describe, it, expect } from 'vitest'
import { mockTables } from '@revolutionarygamesco/common-foundryvtt/mocks'
import { genders, type Gender } from '../../types/enums/gender.ts'
import IgboPersonalName, { IgboPersonalNameTables, type IgboPersonalNameData } from './igbo.ts'
import IgboFamily from '../families/igbo.ts'
import IgboBirthContext from '../birth/igbo.ts'

describe('IgboPersonalName', () => {
  const family = new IgboFamily({ patriarch: 'Equiano' })
  const birth = new IgboBirthContext({ igboWeekday: 'Afor' }, family)
  const data: IgboPersonalNameData = {
    nationality: 'Igbo',
    family: family.toObject(),
    birth: birth.toObject(),
    gender: 'Masculine',
    full: 'Okoafọ Olaudah Equiano',
    day: 'Okoafọ',
    personal: 'Olaudah'
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

    it('can take a personal name', () => {
      const actual = new IgboPersonalName({ personal: 'Olaudah' })
      expect(actual.personal).toBe('Olaudah')
    })
  })

  describe('Accessor methods', () => {
    describe('full', () => {
      it('returns the full name', () => {
        const instance = new IgboPersonalName(data, { family, birth })
        expect(instance.full).toBe('Okoafọ Olaudah Equiano')
      })
    })
  })

  describe('Instance methods', () => {
    describe('address', () => {
      it('concatenates the title with the personal name', () => {
        const instance = new IgboPersonalName(data, { family, birth })
        expect(instance.address('Mister')).toBe('Mister Olaudah')
      })
    })

    describe('toObject', () => {
      it('returns a data object', () => {
        const instance = new IgboPersonalName(data, { family, birth })
        const actual = instance.toObject()
        expect(actual).toEqual(data)
        expect(actual).not.toBe(data)
      })
    })
  })

  describe('Static methods', () => {
    describe('generator', () => {
      const context = { birth: new IgboBirthContext({ igboWeekday: 'Afor' }) }

      it('can generate a masculine name', async () => {
        const [actual] = await IgboPersonalName.generate({ gender: 'Masculine' }, context)
        expect(actual.full).toBe('Okoafọ Ougeromba Ougeromba')
        expect(actual.personal).toBe('Ougeromba')
      })

      it('can generate a feminine name', async () => {
        const [actual] = await IgboPersonalName.generate({ gender: 'Feminine' }, context)
        expect(actual.full).toBe('Mgbafor Houanizei Ougeromba')
        expect(actual.personal).toBe('Houanizei')
      })
    })
  })
})
