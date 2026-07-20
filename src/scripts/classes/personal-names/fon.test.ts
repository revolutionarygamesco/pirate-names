import { beforeEach, describe, it, expect } from 'vitest'
import { mockTables } from '@revolutionarygamesco/common-foundryvtt/mocks'
import { genders, type Gender } from '../../enums/gender.ts'
import BirthContext from '../birth.ts'
import Family from '../families/base.ts'
import FonPersonalName, { FonPersonalNameTables, type FonPersonalNameData } from './fon.ts'

describe('FonPersonalName', () => {
  const data: FonPersonalNameData = {
    nationality: 'Fon',
    gender: 'Masculine',
    full: 'Dosu Agaja',
    personal: 'Agaja'
  }

  beforeEach(() => {
    mockTables({
      [FonPersonalNameTables.Masculine]: { results: [{ description: 'Hounwanou' } as foundry.documents.TableResult] },
      [FonPersonalNameTables.Feminine]: { results: [{ description: 'Hounwasi' } as foundry.documents.TableResult] }
    })
  })

  describe('constructor', () => {
    it('creates a Fon name', () => {
      const actual = new FonPersonalName()
      expect(actual).toBeInstanceOf(FonPersonalName)
    })

    it('sets nationality to Fon', () => {
      const actual = new FonPersonalName()
      expect(actual.nationality).toBe('Fon')
    })

    it.each(genders)('can assign %s to gender', (gender: Gender) => {
      const actual = new FonPersonalName({ gender })
      expect(actual.gender).toBe(gender)
    })

    it('randomizes the gender by default', () => {
      const actual = new FonPersonalName()
      expect(genders).toContain(actual.gender)
    })

    it('can take a full name', () => {
      const actual = new FonPersonalName({ full: 'Dosu Agaja' })
      expect(actual.full).toBe('Dosu Agaja')
    })

    it('defaults to Hounsou for a masculine name', () => {
      const actual = new FonPersonalName({ gender: 'Masculine' })
      expect(actual.personal).toBe('Hounsou')
    })

    it('defaults to Hounsi for a feminine name', () => {
      const actual = new FonPersonalName({ gender: 'Feminine' })
      expect(actual.personal).toBe('Hounsi')
    })
  })

  describe('Instance methods', () => {
    describe('toObject', () => {
      it('returns a data object', () => {
        const instance = new FonPersonalName(data)
        const actual = instance.toObject()
        expect(actual).toEqual(data)
        expect(actual).not.toBe(data)
      })
    })
  })

  describe('Static methods', () => {
    describe('generator', () => {
      it('can generate a masculine name', async () => {
        const [actual] = await FonPersonalName.generate(
          { gender: 'Masculine' },
          {
            family: new Family({ order: 1, size: 2, twin: false }),
            birth: new BirthContext({ weekday: 'Monday', special: null })
          }
        )

        expect(['Kodjo Hounwanou', 'Codjo Hounwanou', 'Kudzo Hounwanou']).toContain(actual.full)
        expect(actual.personal).toBe('Hounwanou')
      })

      it('can generate a feminine name', async () => {
        const [actual] = await FonPersonalName.generate(
          { gender: 'Feminine' },
          {
            family: new Family({ order: 1, size: 2, twin: false }),
            birth: new BirthContext({ weekday: 'Monday', special: null })
          }
        )

        expect(['Adjo Hounwasi', 'Adjovi Hounwasi', 'Adjowa Hounwasi']).toContain(actual.full)
        expect(actual.personal).toBe('Hounwasi')
      })

      it('can generate a masculine name for a senior twin', async () => {
        const [actual] = await FonPersonalName.generate(
          { gender: 'Masculine' },
          {
            family: new Family({ order: 1, size: 2, twin: 1 }),
            birth: new BirthContext({ weekday: 'Monday', special: null })
          }
        )

        expect(['Kodjo Sagbo Hounwanou', 'Codjo Sagbo Hounwanou', 'Kudzo Sagbo Hounwanou']).toContain(actual.full)
        expect(actual.personal).toBe('Hounwanou')
      })

      it('can generate a feminine name for a senior twin', async () => {
        const [actual] = await FonPersonalName.generate(
          { gender: 'Feminine' },
          {
            family: new Family({ order: 1, size: 2, twin: 1 }),
            birth: new BirthContext({ weekday: 'Monday', special: null })
          }
        )

        expect(['Adjo Sagbo Hounwasi', 'Adjovi Sagbo Hounwasi', 'Adjowa Sagbo Hounwasi']).toContain(actual.full)
        expect(actual.personal).toBe('Hounwasi')
      })

      it('can generate a masculine name for a junior twin', async () => {
        const [actual] = await FonPersonalName.generate(
          { gender: 'Masculine' },
          {
            family: new Family({ order: 1, size: 2, twin: 2 }),
            birth: new BirthContext({ weekday: 'Monday', special: null })
          }
        )

        expect(['Kodjo Zinsou Hounwanou', 'Codjo Zinsou Hounwanou', 'Kudzo Zinsou Hounwanou']).toContain(actual.full)
        expect(actual.personal).toBe('Hounwanou')
      })

      it('can generate a feminine name for a junior twin', async () => {
        const [actual] = await FonPersonalName.generate(
          { gender: 'Feminine' },
          {
            family: new Family({ order: 1, size: 2, twin: 2 }),
            birth: new BirthContext({ weekday: 'Monday', special: null })
          }
        )

        expect(['Adjo Zinsou Hounwasi', 'Adjovi Zinsou Hounwasi', 'Adjowa Zinsou Hounwasi']).toContain(actual.full)
        expect(actual.personal).toBe('Hounwasi')
      })

      it('can generate a masculine name with special birth circumstances', async () => {
        const [actual] = await FonPersonalName.generate(
          { gender: 'Masculine' },
          {
            family: new Family({ order: 1, size: 2, twin: false }),
            birth: new BirthContext({ weekday: 'Monday', special: 'war' })
          }
        )

        expect(['Kodjo Ahouansou Hounwanou', 'Codjo Ahouansou Hounwanou', 'Kudzo Ahouansou Hounwanou']).toContain(actual.full)
        expect(actual.personal).toBe('Hounwanou')
      })

      it('can generate a feminine name with special birth circumstances', async () => {
        const [actual] = await FonPersonalName.generate(
          { gender: 'Feminine' },
          {
            family: new Family({ order: 1, size: 2, twin: false }),
            birth: new BirthContext({ weekday: 'Monday', special: 'war' })
          }
        )

        expect(['Adjo Ahouansi Hounwasi', 'Adjovi Ahouansi Hounwasi', 'Adjowa Ahouansi Hounwasi']).toContain(actual.full)
        expect(actual.personal).toBe('Hounwasi')
      })
    })
  })
})
