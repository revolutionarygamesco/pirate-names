import { beforeEach, describe, it, expect } from 'vitest'
import { mockTables } from '@revolutionarygamesco/common-foundryvtt/mocks'
import { genders, type Gender } from '../../enums/gender.ts'
import KalinagoPersonalName, { KalinagoPersonalNameTables, type KalinagoPersonalNameData } from './kalinago.ts'

describe('KalinagoPersonalName', () => {
  const data: KalinagoPersonalNameData = {
    nationality: 'Kalinago',
    gender: 'Masculine',
    full: 'Balifeti Amulenei ',
    personal: 'Balifeti'
  }

  beforeEach(() => {
    mockTables({
      [KalinagoPersonalNameTables.Feminine]: { results: [{ description: 'Warukuma' } as foundry.documents.TableResult] },
      [KalinagoPersonalNameTables.Masculine]: { results: [{ description: 'Weyu' } as foundry.documents.TableResult] }
    })
  })

  describe('constructor', () => {
    it('creates a Kalinago name', () => {
      const actual = new KalinagoPersonalName()
      expect(actual).toBeInstanceOf(KalinagoPersonalName)
    })

    it('sets nationality to Kalinago', () => {
      const actual = new KalinagoPersonalName()
      expect(actual.nationality).toBe('Kalinago')
    })

    it.each(genders)('can assign %s to gender', (gender: Gender) => {
      const actual = new KalinagoPersonalName({ gender })
      expect(actual.gender).toBe(gender)
    })

    it('randomizes the gender by default', () => {
      const actual = new KalinagoPersonalName()
      expect(genders).toContain(actual.gender)
    })

    it('can take a full name', () => {
      const actual = new KalinagoPersonalName({ full: 'Balifeti Amulenei' })
      expect(actual.full).toBe('Balifeti Amulenei')
    })

    it('can take a personal name', () => {
      const actual = new KalinagoPersonalName({ personal: 'Balifeti' })
      expect(actual.personal).toBe('Balifeti')
    })

    it('defaults to Wukeri for a masculine name', () => {
      const actual = new KalinagoPersonalName({ gender: 'Masculine' })
      expect(actual.personal).toBe('Wukeri')
      expect(actual.full).toBe('Wukeri')
    })

    it('defaults to Eliama for a feminine name', () => {
      const actual = new KalinagoPersonalName({ gender: 'Feminine' })
      expect(actual.personal).toBe('Eliama')
      expect(actual.full).toBe('Eliama')
    })
  })

  describe('Instance methods', () => {
    describe('toObject', () => {
      it('returns a data object', () => {
        const instance = new KalinagoPersonalName(data)
        const actual = instance.toObject()
        expect(actual).toEqual(data)
        expect(actual).not.toBe(data)
      })
    })
  })

  describe('Static methods', () => {
    describe('generator', () => {
      it('can generate a masculine name', async () => {
        const [actual] = await KalinagoPersonalName.generate({ gender: 'Masculine' })
        expect(actual.full).toBe('Weyu Weyu')
        expect(actual.personal).toBe('Weyu')
      })

      it('can generate a feminine name', async () => {
        const [actual] = await KalinagoPersonalName.generate({ gender: 'Feminine' })
        expect(actual.full).toBe('Warukuma Weyu')
        expect(actual.personal).toBe('Warukuma')
      })
    })
  })
})
