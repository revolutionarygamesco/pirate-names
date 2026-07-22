import { beforeEach, describe, it, expect } from 'vitest'
import { mockTables } from '@revolutionarygamesco/common-foundryvtt/mocks'
import { genders, type Gender } from '../../types/enums/gender.ts'
import BirthContext from '../birth/base.ts'
import Family from '../families/base.ts'
import FonPersonalName, { FonPersonalNameTables, type FonPersonalNameData } from './fon.ts'

describe('FonPersonalName', () => {
  const family = new Family()
  const birth = new BirthContext({ twin: false, special: null }, family)
  const data: FonPersonalNameData = {
    nationality: 'Fon',
    family: family.toObject(),
    birth: birth.toObject(),
    gender: 'Masculine',
    full: 'Dosu Agaja',
    personal: 'Agaja',
    day: 'Dosu'
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

    it('defaults to Hounsou for a masculine name', () => {
      const actual = new FonPersonalName({ gender: 'Masculine' })
      expect(actual.personal).toBe('Hounsou')
    })

    it('defaults to Hounsi for a feminine name', () => {
      const actual = new FonPersonalName({ gender: 'Feminine' })
      expect(actual.personal).toBe('Hounsi')
    })
  })

  describe('Accessor methods', () => {
    describe('circumstanceName', () => {
      const family = new Family({ size: 3 })

      it('returns Sagbo for a senior twin', () => {
        const instance = new FonPersonalName(data, { birth: new BirthContext({ twin: 1 }, family) })
        expect(instance.circumstanceName).toBe('Sagbo')
      })

      it('returns Zinsou for a junior twin', () => {
        const instance = new FonPersonalName(data, { birth: new BirthContext({ twin: 2 }, family) })
        expect(instance.circumstanceName).toBe('Zinsou')
      })

      it('returns other birth circumstance names', () => {
        const instance = new FonPersonalName(data, { birth: new BirthContext({ twin: false, special: 'road' }, family) })
        expect(instance.circumstanceName).toBe('Alidjinou')
      })

      it('priorities twin name over other circumstance names', () => {
        const instance = new FonPersonalName(data, { birth: new BirthContext({ twin: 1, special: 'road' }, family) })
        expect(instance.circumstanceName).toBe('Sagbo')
      })
    })

    describe('full', () => {
      it('returns the full name', () => {
        const instance = new FonPersonalName(data, { birth: new BirthContext({ twin: false, special: null }) })
        expect(instance.full).toBe('Dosu Agaja')
      })

      it('incorporates birth circumstance names', () => {
        const instance = new FonPersonalName(data, { birth: new BirthContext({ twin: 1, special: null }) })
        expect(instance.full).toBe('Dosu Sagbo Agaja')
      })
    })
  })

  describe('Instance methods', () => {
    describe('address', () => {
      it('concatenates the title and the personal name', () => {
        const instance = new FonPersonalName(data)
        expect(instance.address('Trudo')).toBe('Trudo Agaja')
      })
    })

    describe('toObject', () => {
      it('returns a data object', () => {
        const instance = new FonPersonalName(data, { family, birth })
        const actual = instance.toObject()
        expect(actual).toEqual(data)
        expect(actual).not.toBe(data)
      })
    })
  })

  describe('Static methods', () => {
    describe('generator', () => {
      it('can generate a masculine name', async () => {
        const family = new Family({ size: 2 })
        const birth = new BirthContext({ weekday: 'Monday', special: null, order: 1, twin: false }, family)
        const [actual] = await FonPersonalName.generate({ gender: 'Masculine' }, { family, birth })
        expect(['Kodjo Hounwanou', 'Codjo Hounwanou', 'Kudzo Hounwanou']).toContain(actual.full)
        expect(actual.personal).toBe('Hounwanou')
      })

      it('can generate a feminine name', async () => {
        const family = new Family({ size: 2 })
        const birth = new BirthContext({ weekday: 'Monday', special: null, order: 1, twin: false }, family)
        const [actual] = await FonPersonalName.generate({ gender: 'Feminine' }, { family, birth })
        expect(['Adjo Hounwasi', 'Adjovi Hounwasi', 'Adjowa Hounwasi']).toContain(actual.full)
        expect(actual.personal).toBe('Hounwasi')
      })

      it('can generate a masculine name for a senior twin', async () => {
        const family = new Family({ size: 2 })
        const birth = new BirthContext({ weekday: 'Monday', special: null, order: 1, twin: 1 }, family)
        const [actual] = await FonPersonalName.generate({ gender: 'Masculine' }, { family, birth })
        expect(['Kodjo Sagbo Hounwanou', 'Codjo Sagbo Hounwanou', 'Kudzo Sagbo Hounwanou']).toContain(actual.full)
        expect(actual.personal).toBe('Hounwanou')
      })

      it('can generate a feminine name for a senior twin', async () => {
        const family = new Family({ size: 2 })
        const birth = new BirthContext({ weekday: 'Monday', special: null, order: 1, twin: 1 }, family)
        const [actual] = await FonPersonalName.generate({ gender: 'Feminine' }, { family, birth })
        expect(['Adjo Sagbo Hounwasi', 'Adjovi Sagbo Hounwasi', 'Adjowa Sagbo Hounwasi']).toContain(actual.full)
        expect(actual.personal).toBe('Hounwasi')
      })

      it('can generate a masculine name for a junior twin', async () => {
        const family = new Family({ size: 2 })
        const birth = new BirthContext({ weekday: 'Monday', special: null, order: 2, twin: 2 }, family)
        const [actual] = await FonPersonalName.generate({ gender: 'Masculine' }, { family, birth })
        expect(['Kodjo Zinsou Hounwanou', 'Codjo Zinsou Hounwanou', 'Kudzo Zinsou Hounwanou']).toContain(actual.full)
        expect(actual.personal).toBe('Hounwanou')
      })

      it('can generate a feminine name for a junior twin', async () => {
        const family = new Family({ size: 2 })
        const birth = new BirthContext({ weekday: 'Monday', special: null, order: 2, twin: 2 }, family)
        const [actual] = await FonPersonalName.generate({ gender: 'Feminine' }, { family, birth })
        expect(['Adjo Zinsou Hounwasi', 'Adjovi Zinsou Hounwasi', 'Adjowa Zinsou Hounwasi']).toContain(actual.full)
        expect(actual.personal).toBe('Hounwasi')
      })

      it('can generate a masculine name with special birth circumstances', async () => {
        const family = new Family({ size: 2 })
        const birth = new BirthContext({ weekday: 'Monday', special: 'war', order: 1, twin: false }, family)
        const [actual] = await FonPersonalName.generate({ gender: 'Masculine' }, { family, birth })
        expect(['Kodjo Ahouansou Hounwanou', 'Codjo Ahouansou Hounwanou', 'Kudzo Ahouansou Hounwanou']).toContain(actual.full)
        expect(actual.personal).toBe('Hounwanou')
      })

      it('can generate a feminine name with special birth circumstances', async () => {
        const family = new Family({ size: 2 })
        const birth = new BirthContext({ weekday: 'Monday', special: 'war', order: 1, twin: false }, family)
        const [actual] = await FonPersonalName.generate({ gender: 'Feminine' }, { family, birth })
        expect(['Adjo Ahouansi Hounwasi', 'Adjovi Ahouansi Hounwasi', 'Adjowa Ahouansi Hounwasi']).toContain(actual.full)
        expect(actual.personal).toBe('Hounwasi')
      })
    })
  })
})
