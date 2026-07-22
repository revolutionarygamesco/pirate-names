import { beforeEach, describe, it, expect } from 'vitest'
import { loadYaml } from '@revolutionarygamesco/common/testing'
import { mockTables } from '@revolutionarygamesco/common-foundryvtt/mocks'
import { genders, type Gender } from '../../types/enums/gender.ts'
import { weekdays, type Weekday } from '../../types/enums/weekday.ts'
import { type TwinStatus } from '../../types/twin.ts'
import getRollTableUUID from '../../get-rolltable-uuid.ts'
import BirthContext from '../birth/base.ts'
import AkanFamily, { AkanFamilyNames } from '../families/akan.ts'
import AkanPersonalName, {
  circumstanceNames,
  birthOrderNames,
  AkanPersonalNameTables,
  type AkanPersonalNameData
} from './akan.ts'

describe('AkanPersonalNameTables', () => {
  const abbr: Record<Weekday, string> = { Sunday: 'su', Monday: 'mo',
    Tuesday: 'tu', Wednesday: 'we', Thursday: 'th', Friday: 'fr',
    Saturday: 'sa' }
  const tests: Array<[string, Weekday, Gender, string]> = []
  for (const weekday of weekdays) {
    tests.push(['boys', weekday, 'Masculine', [abbr[weekday], 'masc'].join('.')])
    tests.push(['girls', weekday, 'Feminine', [abbr[weekday], 'fem'].join('.')])
  }

  it.each(tests)('imports the right table for %s born on %s', (_label, day, gender, code) => {
    const { _id } = loadYaml<{ _id: string }>(`src/packs/rolltables/personal.akan.week.${code}.yaml`)
    expect(AkanPersonalNameTables[day][gender]).toBe(getRollTableUUID(_id))
  })
})

describe('AkanPersonalName', () => {
  const family = new AkanFamily({ size: 14, name: 'Asamoah' })
  const birth = new BirthContext({ order: 10, special: null, twin: false }, family)

  const data: AkanPersonalNameData = {
    nationality: 'Akan',
    gender: 'Masculine',
    personal: 'Kofi',
    family: family.toObject(),
    birth: birth.toObject(),
    order: 'Badú',
    circumstance: null,
    twin: null,
    full: 'Kofi Badú Asamoah'
  }

  beforeEach(() => {
    mockTables({
      [AkanPersonalNameTables.Monday.Masculine]: { results: [{ description: 'Kwadwo' } as foundry.documents.TableResult] },
      [AkanPersonalNameTables.Monday.Feminine]: { results: [{ description: 'Adwoa' } as foundry.documents.TableResult] },
      [AkanFamilyNames]: { results: [{ description: 'Abrafi' } as foundry.documents.TableResult] }
    })
  })

  describe('constructor', () => {
    it('creates an Akan name', () => {
      const actual = new AkanPersonalName()
      expect(actual).toBeInstanceOf(AkanPersonalName)
    })

    it('sets nationality to Akan', () => {
      const actual = new AkanPersonalName()
      expect(actual.nationality).toBe('Akan')
    })

    it.each(genders)('can assign %s to gender', (gender: Gender) => {
      const actual = new AkanPersonalName({ gender })
      expect(actual.gender).toBe(gender)
    })

    it('randomizes the gender by default', () => {
      const actual = new AkanPersonalName()
      expect(genders).toContain(actual.gender)
    })

    it('can take a personal name', () => {
      const actual = new AkanPersonalName({ personal: 'Kofi' })
      expect(actual.personal).toBe('Kofi')
    })

    it('defaults to Kwasi for a masculine name', () => {
      const actual = new AkanPersonalName({ gender: 'Masculine' })
      expect(actual.personal).toBe('Kwasi')
    })

    it('defaults to Akosua for a feminine name', () => {
      const actual = new AkanPersonalName({ gender: 'Feminine' })
      expect(actual.personal).toBe('Akosua')
    })

    it('can take a family', () => {
      const actual = new AkanPersonalName(data, { family })
      expect(actual.family).toBe(family)
    })

    it('can take a birth context', () => {
      const actual = new AkanPersonalName(data, { birth })
      expect(actual.birth).toBe(birth)
    })
  })

  describe('Accessor methods', () => {
    describe('circumstance', () => {
      const tests: Array<[string, string, string, Gender]> = []
      for (const tag in circumstanceNames) {
        tests.push([circumstanceNames[tag].Feminine, 'feminine', tag, 'Feminine'])
        tests.push([circumstanceNames[tag].Masculine, 'masculine', tag, 'Masculine'])
      }

      it('returns null if there is no special circumstance', () => {
        const birth = new BirthContext({special: null})
        const instance = new AkanPersonalName({}, {birth})
        expect(instance.circumstance).toBeNull()
      })

      it('returns null if there is no Akan name for that circumstance', () => {
        const birth = new BirthContext({special: 'unit-testing'})
        const instance = new AkanPersonalName({}, {birth})
        expect(instance.circumstance).toBeNull()
      })

      it.each(tests)('returns %s for a %s name for %s', (expected, _g, special, gender) => {
        const birth = new BirthContext({special})
        const instance = new AkanPersonalName({gender}, {birth})
        expect(instance.circumstance).toBe(expected)
      })
    })

    describe('full', () => {
      it('returns a full name', () => {
        const instance = new AkanPersonalName(data, { family, birth })
        expect(instance.full).toBe('Kofi Badú Asamoah')
      })

      it.each([
        ['Ataa Panyin', 1, 'Feminine'],
        ['Ata Panyin', 1, 'Masculine'],
        ['Atta Panyin', 1, 'Masculine'],
        ['Ataa Kakraba', 2, 'Feminine'],
        ['Ataa Kakra', 2, 'Feminine'],
        ['Ataa Obuom', 2, 'Feminine'],
        ['Ata Kakraba', 2, 'Masculine'],
        ['Ata Kakra', 2, 'Masculine'],
        ['Ata Obuom', 2, 'Masculine'],
        ['Atta Kakraba', 2, 'Masculine'],
        ['Atta Kakra', 2, 'Masculine'],
        ['Atta Obuom', 2, 'Masculine'],
      ] as Array<[string, TwinStatus, Gender]>)('can include %s', (expected, twin, gender) => {
        const family = new AkanFamily({ size: 2 })
        const birth = new BirthContext({ twin }, family)
        const instance = new AkanPersonalName({ gender, twin: expected }, { birth, family })
        expect(instance.full).toContain(expected)
      })

      it('includes circumstance name ', () => {
        const birth = new BirthContext({ twin: false, special: 'sickly' })
        const instance = new AkanPersonalName({ gender: 'Masculine' }, { birth })
        expect(instance.full).toContain('Nyaméama')
      })

      it('does not include circumstance name for twin', () => {
        const family = new AkanFamily({ size: 2 })
        const birth = new BirthContext({ twin: 1, special: 'sickly' }, family)
        const instance = new AkanPersonalName({ gender: 'Feminine' }, { birth, family })
        expect(instance.full).toContain('Ataa Panyin')
        expect(instance.full).not.toContain('Nyaméama')
      })
    })
  })

  describe('Instance methods', () => {
    describe('address', () => {
      it('returns title with family name', () => {
        const instance = new AkanPersonalName(data, { family, birth })
        expect(instance.address('Mister')).toBe('Mister Asamoah')
      })
    })

    describe('generateTwinName', () => {
      it('returns null if not a twin', () => {
        const birth = new BirthContext({ twin: false })
        const instance = new AkanPersonalName({}, { birth })
        expect(instance.generateTwinName()).toBeNull()
      })

      it('returns Ataa Panyin for a senior female twin', () => {
        const family = new AkanFamily({ size: 3 })
        const birth = new BirthContext({ twin: 1 }, family)
        const instance = new AkanPersonalName({ gender: 'Feminine' }, { birth, family })
        expect(instance.generateTwinName()).toBe('Ataa Panyin')
      })

      it('returns Ata Panyin or Atta Panyin for a senior male twin', () => {
        const valid = ['Ata Panyin', 'Atta Panyin']
        const family = new AkanFamily({ size: 3 })
        const birth = new BirthContext({ twin: 1 }, family)
        const instance = new AkanPersonalName({ gender: 'Masculine' }, { birth, family })
        expect(valid).toContain(instance.generateTwinName())
      })

      it('returns a valid name for a junior female twin', () => {
        const valid = ['Ataa Kakraba', 'Ataa Kakra', 'Ataa Obuom']
        const family = new AkanFamily({ size: 3 })
        const birth = new BirthContext({ twin: 2 }, family)
        const instance = new AkanPersonalName({ gender: 'Feminine' }, { birth, family })
        expect(valid).toContain(instance.generateTwinName())
      })

      it('returns a valid name for a junior male twin', () => {
        const valid = ['Ata Kakraba', 'Ata Kakra', 'Ata Obuom', 'Atta Kakraba',
          'Atta Kakra', 'Atta Obuom']
        const family = new AkanFamily({ size: 3 })
        const birth = new BirthContext({ twin: 2 }, family)
        const instance = new AkanPersonalName({ gender: 'Masculine' }, { birth, family })
        expect(valid).toContain(instance.generateTwinName())
      })
    })

    describe('toObject', () => {
      it('returns a data object', () => {
        const instance = new AkanPersonalName(data, { family, birth })
        const actual = instance.toObject()
        expect(actual).toEqual(data)
        expect(actual).not.toBe(data)
      })
    })
  })

  describe('Static methods', () => {
    describe('getBirthOrderName', () => {
      const tests: Array<[string, string, number, Gender]> = []
      for (let i = 1; i < 14; i++) {
        tests.push([birthOrderNames[i.toString()].Feminine, `daughter #${i}`, i, 'Feminine'])
        tests.push([birthOrderNames[i.toString()].Masculine, `son #${i}`, i, 'Masculine'])
      }

      it.each(tests)('returns %s for %s (birth order)', (expected, _desc, order, gender) => {
        const actual = AkanPersonalName.getBirthOrderName(order, order + 1, gender)
        expect(actual).toBe(expected)
      })

      it('returns Píèsíe for the first-born son, even if only child', () => {
        const actual = AkanPersonalName.getBirthOrderName(1, 1, 'Masculine')
        expect(actual).toBe('Píèsíe')
      })

      it('returns Píèsíe for the first-born daughter, even if only child', () => {
        const actual = AkanPersonalName.getBirthOrderName(1, 1, 'Feminine')
        expect(actual).toBe('Píèsíe')
      })

      it('returns Kaakyire for the youngest son', () => {
        const actual = AkanPersonalName.getBirthOrderName(4, 4, 'Masculine')
        expect(actual).toBe('Kaakyire')
      })

      it('returns Kaakyire for the youngest daughter', () => {
        const actual = AkanPersonalName.getBirthOrderName(4, 4, 'Feminine')
        expect(actual).toBe('Kaakyire')
      })
    })

    describe('generator', () => {
      it('can generate a masculine name', async () => {
        const [actual] = await AkanPersonalName.generate(
          { gender: 'Masculine' },
          {
            family: await AkanFamily.generate({ size: 2 }),
            birth: new BirthContext({ weekday: 'Monday', special: null, order: 1, twin: false }, family)
          }
        )

        expect(actual.full).toBe('Kwadwo Píèsíe Abrafi')
        expect(actual.personal).toBe('Kwadwo')
      })

      it('can generate a feminine name', async () => {
        const [actual] = await AkanPersonalName.generate(
          { gender: 'Feminine' },
          {
            family: await AkanFamily.generate({ size: 2 }),
            birth: new BirthContext({ weekday: 'Monday', special: null, order: 1, twin: false }, family)
          }
        )

        expect(actual.full).toBe('Adwoa Píèsíe Abrafi')
        expect(actual.personal).toBe('Adwoa')
      })

      it('generates a name for a senior female twin', async () => {
        const [actual] = await AkanPersonalName.generate(
          { gender: 'Feminine' },
          {
            family: await AkanFamily.generate({ size: 2 }),
            birth: new BirthContext({ weekday: 'Monday', special: null, order: 1, twin: 1 }, family)
          }
        )

        expect(actual.full).toBe('Adwoa Píèsíe Ataa Panyin Abrafi')
        expect(actual.personal).toBe('Adwoa')
      })

      it('generates a name for a senior male twin', async () => {
        const [actual] = await AkanPersonalName.generate(
          { gender: 'Masculine' },
          {
            family: await AkanFamily.generate({ size: 2 }),
            birth: new BirthContext({ weekday: 'Monday', special: null, order: 1, twin: 1 }, family)
          }
        )

        const checks = ['Ata Panyin', 'Atta Panyin']
          .some(twinName => actual.full.includes(twinName))
        expect(checks).toBe(true)
        expect(actual.personal).toBe('Kwadwo')
      })

      it('generates a name for a junior female twin', async () => {
        const [actual] = await AkanPersonalName.generate(
          { gender: 'Feminine' },
          {
            family: await AkanFamily.generate({ size: 2 }),
            birth: new BirthContext({ weekday: 'Monday', special: null, order: 1, twin: 2 }, family)
          }
        )

        const checks = ['Ataa Kakraba', 'Ataa Kakra', 'Ataa Obuom']
          .some(twinName => actual.full.includes(twinName))
        expect(checks).toBe(true)
        expect(actual.personal).toBe('Adwoa')
      })

      it('generates a name for a junior male twin', async () => {
        const [actual] = await AkanPersonalName.generate(
          { gender: 'Masculine' },
          {
            family: await AkanFamily.generate({ size: 2 }),
            birth: new BirthContext({ weekday: 'Monday', special: null, order: 1, twin: 2 }, family)
          }
        )

        const checks = ['Ata Kakraba', 'Ata Kakra', 'Ata Obuom', 'Atta Kakraba', 'Atta Kakra', 'Atta Obuom']
          .some(twinName => actual.full.includes(twinName))
        expect(checks).toBe(true)
        expect(actual.personal).toBe('Kwadwo')
      })

      it('can generate special birth circumstance names', async () => {
        const family = await AkanFamily.generate({ size: 2 })
        const birth = new BirthContext({ weekday: 'Monday', special: 'war', order: 1, twin: false }, family)
        const [actual] = await AkanPersonalName.generate({ gender: 'Feminine' }, { family, birth })
        expect(actual.full).toBe('Adwoa Píèsíe Bedíàkṍ Abrafi')
        expect(actual.personal).toBe('Adwoa')
      })
    })
  })
})
