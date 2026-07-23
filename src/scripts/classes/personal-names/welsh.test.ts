import { beforeEach, describe, it, expect } from 'vitest'
import { loadYaml } from '@revolutionarygamesco/common/testing'
import { mockTables } from '@revolutionarygamesco/common-foundryvtt/mocks'
import { genders, type Gender } from '../../types/enums/gender.ts'
import getRollTableUUID from '../../get-rolltable-uuid.ts'
import BirthContext from '../birth/base.ts'
import WelshFamily from '../families/welsh.ts'
import WelshPersonalName, { WelshPersonalNameTables, type WelshPersonalNameParams } from './welsh.ts'

describe('WelshPersonalNameTables', () => {
  it('imports the Welsh surname table', () => {
    const { _id } = loadYaml<{ _id: string }>('src/packs/rolltables/personal.welsh.sur.yaml')
    expect(WelshPersonalNameTables.Surnames).toBe(getRollTableUUID(_id))
  })

  it('imports the Welsh feminine name table', () => {
    const { _id } = loadYaml<{ _id: string }>('src/packs/rolltables/personal.welsh.fem.yaml')
    expect(WelshPersonalNameTables.Feminine).toBe(getRollTableUUID(_id))
  })

  it('imports the Welsh masculine name table', () => {
    const { _id } = loadYaml<{ _id: string }>('src/packs/rolltables/personal.welsh.masc.yaml')
    expect(WelshPersonalNameTables.Masculine).toBe(getRollTableUUID(_id))
  })
})

describe('WelshPersonalName', () => {
  const family = new WelshFamily({ name: 'Roberts' })
  const birth = new BirthContext({}, family)
  const data: WelshPersonalNameParams = {
    nationality: 'Welsh',
    birth: birth.toObject(),
    gender: 'Masculine',
    personal: 'Bartholomew'
  }

  beforeEach(() => {
    mockTables({
      [WelshPersonalNameTables.Feminine]: { results: [{ description: 'Sarah' } as foundry.documents.TableResult] },
      [WelshPersonalNameTables.Masculine]: { results: [{ description: 'Lewis' } as foundry.documents.TableResult] },
      [WelshPersonalNameTables.Surnames]: { results: [{ description: 'Morris' } as foundry.documents.TableResult] }
    })
  })

  describe('constructor', () => {
    it('creates a Welsh name', () => {
      const actual = new WelshPersonalName()
      expect(actual).toBeInstanceOf(WelshPersonalName)
    })

    it('sets nationality to Welsh', () => {
      const actual = new WelshPersonalName()
      expect(actual.nationality).toBe('Welsh')
    })

    it.each(genders)('can assign %s to gender', (gender: Gender) => {
      const actual = new WelshPersonalName({ gender })
      expect(actual.gender).toBe(gender)
    })

    it('randomizes the gender by default', () => {
      const actual = new WelshPersonalName()
      expect(genders).toContain(actual.gender)
    })

    it('can take a personal name', () => {
      const actual = new WelshPersonalName({ personal: 'Bartholomew' })
      expect(actual.personal).toBe('Bartholomew')
    })

    it('defaults to William for a masculine name', () => {
      const actual = new WelshPersonalName({ gender: 'Masculine' })
      expect(actual.personal).toBe('William')
    })

    it('defaults to Mary for a feminine name', () => {
      const actual = new WelshPersonalName({ gender: 'Feminine' })
      expect(actual.personal).toBe('Mary')
    })
  })

  describe('Accessor methods', () => {
    describe('full', () => {
      it('returns the full name', () => {
        const instance = new WelshPersonalName(data)
        expect(instance.full).toBe('Bartholomew Roberts')
      })
    })
  })

  describe('Instance methods', () => {
    describe('address', () => {
      it('concatenates title and family name', () => {
        const instance = new WelshPersonalName(data)
        expect(instance.address('Captain')).toBe('Captain Roberts')
      })
    })

    describe('toObject', () => {
      it('returns a data object', () => {
        const instance = new WelshPersonalName(data, birth)
        const actual = instance.toObject({ capt: { Masculine: 'Captain', Feminine: 'Captain' } })
        expect(actual.birth).toEqual(birth.toObject())
        expect(actual.gender).toEqual(instance.gender)
        expect(actual.forms.personal).toBe('Bartholomew')
        expect(actual.forms.full).toBe('Bartholomew Roberts')
        expect(actual.forms.capt).toBe('Captain Roberts')
      })
    })
  })

  describe('Static methods', () => {
    describe('getDefaultPersonalName', () => {
      it('returns Mary for women', () => {
        expect(WelshPersonalName.getDefaultPersonalName('Feminine')).toBe('Mary')
      })

      it('returns William for men', () => {
        expect(WelshPersonalName.getDefaultPersonalName('Masculine')).toBe('William')
      })
    })

    describe('generator', () => {
      it('can generate a masculine name', async () => {
        const [actual] = await WelshPersonalName.generate({ gender: 'Masculine' })
        expect(actual.full).toBe('Lewis Morris')
        expect(actual.personal).toBe('Lewis')
      })

      it('can generate a feminine name', async () => {
        const [actual] = await WelshPersonalName.generate({ gender: 'Feminine' })
        expect(actual.full).toBe('Sarah Morris')
        expect(actual.personal).toBe('Sarah')
      })
    })
  })
})
