import { beforeEach, describe, it, expect } from 'vitest'
import { mockTables } from '@revolutionarygamesco/common-foundryvtt/mocks'
import { genders, type Gender } from '../../enums/gender.ts'
import BirthContext from '../birth.ts'
import Family from '../families/base.ts'
import AkanPersonalName, { AkanPersonalNameTables, type AkanPersonalNameData } from './akan.ts'

describe('AkanPersonalName', () => {
  const data: AkanPersonalNameData = {
    nationality: 'Akan',
    gender: 'Masculine',
    full: 'Kofi Badú',
    personal: 'Kofi',
    family: 'Badú'
  }

  beforeEach(() => {
    mockTables({
      [AkanPersonalNameTables.WeekdayNames.Monday.Masculine]: { results: [{ description: 'Kwadwo' } as foundry.documents.TableResult] },
      [AkanPersonalNameTables.WeekdayNames.Monday.Feminine]: { results: [{ description: 'Adwoa' } as foundry.documents.TableResult] },
      [AkanPersonalNameTables.Surnames]: { results: [{ description: 'Abrafi' } as foundry.documents.TableResult] }
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

    it('can take a full name', () => {
      const actual = new AkanPersonalName({ full: 'Kofi Badú' })
      expect(actual.full).toBe('Kofi Badú')
    })

    it('defaults to Kwasi Píèsíe Mensah for a masculine name', () => {
      const actual = new AkanPersonalName({ gender: 'Masculine' })
      expect(actual.full).toBe('Kwasi Píèsíe Mensah')
    })

    it('defaults to Akosua Píèsíe Mensah for a feminine name', () => {
      const actual = new AkanPersonalName({ gender: 'Feminine' })
      expect(actual.full).toBe('Akosua Píèsíe Mensah')
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

    it('can take a family name', () => {
      const actual = new AkanPersonalName({ family: 'Badú' })
      expect(actual.family).toBe('Badú')
    })

    it('defaults to Mensah', () => {
      const actual = new AkanPersonalName()
      expect(actual.family).toBe('Mensah')
    })
  })

  describe('Instance methods', () => {
    describe('toObject', () => {
      it('returns a data object', () => {
        const instance = new AkanPersonalName(data)
        const actual = instance.toObject()
        expect(actual).toEqual(data)
        expect(actual).not.toBe(data)
      })
    })
  })

  describe('Static methods', () => {
    describe('generator', () => {
      it('can generate a masculine name', async () => {
        const [actual] = await AkanPersonalName.generate(
          { gender: 'Masculine' },
          {
            family: new Family({ order: 1, size: 2, twin: false }),
            birth: new BirthContext({ weekday: 'Monday', special: null })
          }
        )

        expect(actual.full).toBe('Kwadwo Píèsíe Abrafi')
        expect(actual.personal).toBe('Kwadwo')
        expect(actual.family).toBe('Abrafi')
      })

      it('can generate a feminine name', async () => {
        const [actual] = await AkanPersonalName.generate(
          { gender: 'Feminine' },
          {
            family: new Family({ order: 1, size: 2, twin: false }),
            birth: new BirthContext({ weekday: 'Monday', special: null })
          }
        )

        expect(actual.full).toBe('Adwoa Píèsíe Abrafi')
        expect(actual.personal).toBe('Adwoa')
        expect(actual.family).toBe('Abrafi')
      })

      it('generates a name for a senior female twin', async () => {
        const [actual] = await AkanPersonalName.generate(
          { gender: 'Feminine' },
          {
            family: new Family({ order: 1, size: 2, twin: 1 }),
            birth: new BirthContext({ weekday: 'Monday', special: null })
          }
        )

        expect(actual.full).toBe('Adwoa Píèsíe Ataa Panyin Abrafi')
        expect(actual.personal).toBe('Adwoa')
        expect(actual.family).toBe('Abrafi')
      })

      it('generates a name for a senior male twin', async () => {
        const [actual] = await AkanPersonalName.generate(
          { gender: 'Masculine' },
          {
            family: new Family({ order: 1, size: 2, twin: 1 }),
            birth: new BirthContext({ weekday: 'Monday', special: null })
          }
        )

        const checks = ['Ata Panyin', 'Atta Panyin']
          .some(twinName => actual.full.includes(twinName))
        expect(checks).toBe(true)
        expect(actual.personal).toBe('Kwadwo')
        expect(actual.family).toBe('Abrafi')
      })

      it('generates a name for a junior female twin', async () => {
        const [actual] = await AkanPersonalName.generate(
          { gender: 'Feminine' },
          {
            family: new Family({ order: 1, size: 2, twin: 2 }),
            birth: new BirthContext({ weekday: 'Monday', special: null })
          }
        )

        const checks = ['Ataa Kakraba', 'Ataa Kakra', 'Ataa Obuom']
          .some(twinName => actual.full.includes(twinName))
        expect(checks).toBe(true)
        expect(actual.personal).toBe('Adwoa')
        expect(actual.family).toBe('Abrafi')
      })

      it('generates a name for a junior male twin', async () => {
        const [actual] = await AkanPersonalName.generate(
          { gender: 'Masculine' },
          {
            family: new Family({ order: 1, size: 2, twin: 2 }),
            birth: new BirthContext({ weekday: 'Monday', special: null })
          }
        )

        const checks = ['Ata Kakraba', 'Ata Kakra', 'Ata Obuom', 'Atta Kakraba', 'Atta Kakra', 'Atta Obuom']
          .some(twinName => actual.full.includes(twinName))
        expect(checks).toBe(true)
        expect(actual.personal).toBe('Kwadwo')
        expect(actual.family).toBe('Abrafi')
      })

      it('can generate special birth circumstance names', async () => {
        const [actual] = await AkanPersonalName.generate(
          { gender: 'Feminine' },
          {
            family: new Family({ order: 1, size: 2, twin: false }),
            birth: new BirthContext({ weekday: 'Monday', special: 'war' })
          }
        )

        expect(actual.full).toBe('Adwoa Píèsíe Bedíàkṍ Abrafi')
        expect(actual.personal).toBe('Adwoa')
        expect(actual.family).toBe('Abrafi')
      })
    })
  })
})
