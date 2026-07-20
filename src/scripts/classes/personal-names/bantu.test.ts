import { beforeEach, describe, it, expect } from 'vitest'
import { mockTables } from '@revolutionarygamesco/common-foundryvtt/mocks'
import { genders, type Gender } from '../../enums/gender.ts'
import BantuPersonalName, { BantuPersonalNameTables, type BantuPersonalNameData } from './bantu.ts'

describe('BantuPersonalName', () => {
  const data: BantuPersonalNameData = {
    nationality: 'Bantu',
    gender: 'Masculine',
    full: 'Nzinga a Nkuwu',
    personal: 'Nzinga',
    special: null
  }

  beforeEach(() => {
    mockTables({
      [BantuPersonalNameTables.Init.Masculine]: { results: [{ description: 'Lema' } as foundry.documents.TableResult] },
      [BantuPersonalNameTables.Init.Feminine]: { results: [{ description: 'Mabinda' } as foundry.documents.TableResult] },
      [BantuPersonalNameTables.Nkumbu]: { results: [{ description: 'Kiala' } as foundry.documents.TableResult] },
      [BantuPersonalNameTables.Santu]: { results: [{ description: 'Molazi' } as foundry.documents.TableResult] }
    })
  })

  describe('constructor', () => {
    it('creates a Bantu name', () => {
      const actual = new BantuPersonalName()
      expect(actual).toBeInstanceOf(BantuPersonalName)
    })

    it('sets nationality to Bantu', () => {
      const actual = new BantuPersonalName()
      expect(actual.nationality).toBe('Bantu')
    })

    it.each(genders)('can assign %s to gender', (gender: Gender) => {
      const actual = new BantuPersonalName({ gender })
      expect(actual.gender).toBe(gender)
    })

    it('randomizes the gender by default', () => {
      const actual = new BantuPersonalName()
      expect(genders).toContain(actual.gender)
    })

    it('can take a full name', () => {
      const actual = new BantuPersonalName({ full: 'Nzinga a Nkuwu' })
      expect(actual.full).toBe('Nzinga a Nkuwu')
    })

    it('defaults to Zola', () => {
      const actual = new BantuPersonalName({ gender: 'Masculine' })
      expect(actual.full).toBe('Zola')
    })

    it('can take a personal name', () => {
      const actual = new BantuPersonalName({ personal: 'Nzinga' })
      expect(actual.personal).toBe('Nzinga')
    })
  })

  describe('Instance methods', () => {
    describe('toObject', () => {
      it('returns a data object', () => {
        const instance = new BantuPersonalName(data)
        const actual = instance.toObject()
        expect(actual).toEqual(data)
        expect(actual).not.toBe(data)
      })
    })
  })

  describe('Static methods', () => {
    describe('generator', () => {
      it('can generate a name', async () => {
        const [actual] = await BantuPersonalName.generate({ special: null })
        expect(actual.full).toBe('Kiala a Kiala')
        expect(actual.personal).toBe('Kiala')
      })

      it('can generate a Christian name with a santu element', async () => {
        const [actual] = await BantuPersonalName.generate({ special: 'Christian' })
        expect(actual.full).toBe('Molazi Kiala a Kiala')
        expect(actual.personal).toBe('Kiala')
      })

      it('can generate a name for an initiated man', async () => {
        const [actual] = await BantuPersonalName.generate({ gender: 'Masculine', special: 'Initiated' })
        expect(actual.full).toBe('Kiala a Kiala Lema')
        expect(actual.personal).toBe('Kiala')
      })

      it('can generate a name for an initiated woman', async () => {
        const [actual] = await BantuPersonalName.generate({ gender: 'Feminine', special: 'Initiated' })
        expect(actual.full).toBe('Kiala a Kiala Mabinda')
        expect(actual.personal).toBe('Kiala')
      })
    })
  })
})
