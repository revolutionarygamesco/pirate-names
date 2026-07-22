import { beforeEach, describe, it, expect } from 'vitest'
import { mockTables } from '@revolutionarygamesco/common-foundryvtt/mocks'
import { genders, type Gender } from '../../types/enums/gender.ts'
import BirthContext from '../birth/base.ts'
import MandinkaFamily from '../families/mandinka.ts'
import MandinkaPersonalName, { MandinkaPersonalNameTables, type MandinkaPersonalNameData } from './mandinka.ts'

describe('MandinkaPersonalName', () => {
  const family = new MandinkaFamily({ caste: 'Foro', name: 'Keita' })
  const birth = new BirthContext({}, family)
  const data: MandinkaPersonalNameData = {
    nationality: 'Mandinka',
    family: family.toObject(),
    birth: birth.toObject(),
    gender: 'Masculine',
    full: 'Sundiata Keita',
    personal: 'Sundiata'
  }

  beforeEach(async () => {
    mockTables({
      [MandinkaPersonalNameTables.Feminine]: { results: [{ description: 'Kinti' } as foundry.documents.TableResult] },
      [MandinkaPersonalNameTables.Masculine]: { results: [{ description: 'Essa' } as foundry.documents.TableResult] },
      [MandinkaPersonalNameTables.Jamu.Foro]: { results: [{ description: 'Sonko' } as foundry.documents.TableResult] }
    })
  })

  describe('constructor', () => {
    it('creates a Mandinka name', () => {
      const actual = new MandinkaPersonalName()
      expect(actual).toBeInstanceOf(MandinkaPersonalName)
    })

    it('sets nationality to Mandinka', () => {
      const actual = new MandinkaPersonalName()
      expect(actual.nationality).toBe('Mandinka')
    })

    it.each(genders)('can assign %s to gender', (gender: Gender) => {
      const actual = new MandinkaPersonalName({ gender })
      expect(actual.gender).toBe(gender)
    })

    it('randomizes the gender by default', () => {
      const actual = new MandinkaPersonalName()
      expect(genders).toContain(actual.gender)
    })

    it('can take a personal name', () => {
      const actual = new MandinkaPersonalName({ personal: 'Sundiata' })
      expect(actual.personal).toBe('Sundiata')
    })

    it('defaults to Lamin for a masculine name', () => {
      const actual = new MandinkaPersonalName({ gender: 'Masculine' })
      expect(actual.personal).toBe('Lamin')
      expect(actual.full).toBe('Lamin Trawally')
    })

    it('defaults to Fatou for a feminine name', () => {
      const actual = new MandinkaPersonalName({ gender: 'Feminine' })
      expect(actual.personal).toBe('Fatou')
      expect(actual.full).toBe('Fatou Trawally')
    })
  })

  describe('Accessor methods', () => {
    describe('full', () => {
      it('returns the full name', () => {
        const instance = new MandinkaPersonalName(data, { family, birth })
        expect(instance.full).toBe('Sundiata Keita')
      })
    })
  })

  describe('Instance methods', () => {
    describe('address', () => {
      it('concatenates the title and family name', () => {
        const instance = new MandinkaPersonalName(data, { family, birth })
        expect(instance.address('Manding')).toBe('Manding Keita')
      })
    })

    describe('toObject', () => {
      it('returns a data object', () => {
        const instance = new MandinkaPersonalName(data, { family, birth })
        const actual = instance.toObject()
        expect(actual).toEqual(data)
        expect(actual).not.toBe(data)
      })
    })
  })

  describe('Static methods', () => {
    const context = { family: new MandinkaFamily() }

    describe('generator', () => {
      it('can generate a masculine name', async () => {
        const [actual] = await MandinkaPersonalName.generate({ gender: 'Masculine' }, context)
        expect(actual.full).toBe('Essa Trawally')
        expect(actual.personal).toBe('Essa')
      })

      it('can generate a feminine name', async () => {
        const [actual] = await MandinkaPersonalName.generate({ gender: 'Feminine' }, context)
        expect(actual.full).toBe('Kinti Trawally')
        expect(actual.personal).toBe('Kinti')
      })
    })
  })
})
