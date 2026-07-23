import { beforeEach, describe, it, expect } from 'vitest'
import { loadYaml } from '@revolutionarygamesco/common/testing'
import { mockTables } from '@revolutionarygamesco/common-foundryvtt/mocks'
import { genders, type Gender } from '../../types/enums/gender.ts'
import { igboWeekdays, type IgboWeekday } from '../../types/enums/igbo-weekday.ts'
import getRollTableUUID from '../../get-rolltable-uuid.ts'
import IgboFamily from '../families/igbo.ts'
import IgboBirthContext from '../birth/igbo.ts'
import IgboPersonalName, { IgboPersonalNameTables, type IgboPersonalNameParams } from './igbo.ts'

describe('IgboPersonalNameTables', () => {
  const abbr: Record<IgboWeekday, string> = { Eke: 'ek', Oye: 'oy', Afor: 'af', Nkwo: 'nk' }
  const tests: Array<[string, IgboWeekday, Gender, string]> = []
  for (const weekday of igboWeekdays) {
    tests.push(['boys', weekday, 'Masculine', [abbr[weekday], 'masc'].join('.')])
    tests.push(['girls', weekday, 'Feminine', [abbr[weekday], 'fem'].join('.')])
  }

  it.each(tests)('imports the right table for %s born on %s', (_label, day, gender, code) => {
    const { _id } = loadYaml<{ _id: string }>(`src/packs/rolltables/personal.igbo.week.${code}.yaml`)
    expect(IgboPersonalNameTables.WeekdayNames[day][gender]).toBe(getRollTableUUID(_id))
  })

  it('imports the Igbo feminine name table', () => {
    const { _id } = loadYaml<{ _id: string }>('src/packs/rolltables/personal.igbo.fem.yaml')
    expect(IgboPersonalNameTables.Feminine).toBe(getRollTableUUID(_id))
  })

  it('imports the Igbo masculine name table', () => {
    const { _id } = loadYaml<{ _id: string }>('src/packs/rolltables/personal.igbo.masc.yaml')
    expect(IgboPersonalNameTables.Masculine).toBe(getRollTableUUID(_id))
  })
})

describe('IgboPersonalName', () => {
  const family = new IgboFamily({ patriarch: 'Equiano' })
  const birth = new IgboBirthContext({ igboWeekday: 'Afor' }, family)
  const data: IgboPersonalNameParams = {
    nationality: 'Igbo',
    birth: birth.toObject(),
    gender: 'Masculine',
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
        const instance = new IgboPersonalName(data, birth)
        expect(instance.full).toBe('Okoafọ Olaudah Equiano')
      })
    })
  })

  describe('Instance methods', () => {
    describe('address', () => {
      it('concatenates the title with the personal name', () => {
        const instance = new IgboPersonalName(data, birth)
        expect(instance.address('Mister')).toBe('Mister Olaudah')
      })
    })

    describe('toObject', () => {
      it('returns a data object', () => {
        const instance = new IgboPersonalName(data, birth)
        const actual = instance.toObject({ mister: { Masculine: 'Mister', Feminine: 'Misses' } })
        expect(actual.birth).toEqual(birth.toObject())
        expect(actual.gender).toEqual(instance.gender)
        expect(actual.forms.personal).toBe('Olaudah')
        expect(actual.forms.full).toBe('Okoafọ Olaudah Equiano')
        expect(actual.forms.mister).toBe('Mister Olaudah')
      })
    })
  })

  describe('Static methods', () => {
    describe('getDefaultPersonalName', () => {
      it('returns Béké for women', () => {
        expect(IgboPersonalName.getDefaultPersonalName('Feminine')).toBe('Béké')
      })

      it('returns Vaniclei for men', () => {
        expect(IgboPersonalName.getDefaultPersonalName('Masculine')).toBe('Vaniclei')
      })
    })

    describe('getDefaultDayName', () => {
      it('returns Ekemma for women', () => {
        expect(IgboPersonalName.getDefaultDayName('Feminine')).toBe('Ekemma')
      })

      it('returns Okoeke for men', () => {
        expect(IgboPersonalName.getDefaultDayName('Masculine')).toBe('Okoeke')
      })
    })

    describe('generator', () => {
      const family = new IgboFamily()
      const context = new IgboBirthContext({ igboWeekday: 'Afor' }, family)

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
