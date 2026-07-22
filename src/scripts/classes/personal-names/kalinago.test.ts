import { beforeEach, describe, it, expect } from 'vitest'
import { loadYaml } from '@revolutionarygamesco/common'
import { mockTables } from '@revolutionarygamesco/common-foundryvtt/mocks'
import { genders, type Gender } from '../../types/enums/gender.ts'
import getRollTableUUID from '../../get-rolltable-uuid.ts'
import BirthContext from '../birth/base.ts'
import KalinagoFamily from '../families/kalinago.ts'
import KalinagoPersonalName, { KalinagoPersonalNameTables, type KalinagoPersonalNameData } from './kalinago.ts'

describe('KalinagoPersonalNameTables', () => {
  it('imports the Kalinago feminine name table', () => {
    const { _id } = loadYaml<{ _id: string }>('src/packs/rolltables/personal.kalinago.fem.yaml')
    expect(KalinagoPersonalNameTables.Feminine).toBe(getRollTableUUID(_id))
  })

  it('imports the Kalinago masculine name table', () => {
    const { _id } = loadYaml<{ _id: string }>('src/packs/rolltables/personal.kalinago.masc.yaml')
    expect(KalinagoPersonalNameTables.Masculine).toBe(getRollTableUUID(_id))
  })
})

describe('KalinagoPersonalName', () => {
  const family = new KalinagoFamily({ patriarch: 'Amulenei' })
  const birth = new BirthContext({}, family)
  const data: KalinagoPersonalNameData = {
    nationality: 'Kalinago',
    family: family.toObject(),
    birth: birth.toObject(),
    gender: 'Masculine',
    full: 'Balifeti Amulenei',
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

    it('can take a personal name', () => {
      const actual = new KalinagoPersonalName({ personal: 'Balifeti' })
      expect(actual.personal).toBe('Balifeti')
    })

    it('defaults to Wukeri for a masculine name', () => {
      const actual = new KalinagoPersonalName({ gender: 'Masculine' })
      expect(actual.personal).toBe('Wukeri')
      expect(actual.full).toBe('Wukeri Wukeri')
    })

    it('defaults to Eliama for a feminine name', () => {
      const actual = new KalinagoPersonalName({ gender: 'Feminine' })
      expect(actual.personal).toBe('Eliama')
      expect(actual.full).toBe('Eliama Wukeri')
    })
  })

  describe('Accessor methods', () => {
    describe('full', () => {
      it('returns the full name', () => {
        const instance = new KalinagoPersonalName(data, { family, birth })
        expect(instance.full).toBe('Balifeti Amulenei')
      })
    })
  })

  describe('Instance methods', () => {
    describe('address', () => {
      it('concatenates the title and the personal name', () => {
        const instance = new KalinagoPersonalName(data, { family, birth })
        expect(instance.address('Mister')).toBe('Mister Balifeti')
      })
    })

    describe('toObject', () => {
      it('returns a data object', () => {
        const instance = new KalinagoPersonalName(data, { family, birth })
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
