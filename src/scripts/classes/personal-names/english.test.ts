import { beforeEach, describe, it, expect } from 'vitest'
import { loadYaml } from '@revolutionarygamesco/common/testing'
import { mockTables } from '@revolutionarygamesco/common-foundryvtt/mocks'
import { genders, type Gender } from '../../types/enums/gender.ts'
import getRollTableUUID from '../../get-rolltable-uuid.ts'
import BirthContext from '../birth/base.ts'
import EnglishFamily from '../families/english.ts'
import EnglishPersonalName, { EnglishPersonalNameTables, type EnglishPersonalNameParams } from './english.ts'

describe('EnglishPersonalNameTables', () => {
  it('imports the English surname table', () => {
    const { _id } = loadYaml<{ _id: string }>('src/packs/rolltables/personal.english.sur.yaml')
    expect(EnglishPersonalNameTables.Surnames).toBe(getRollTableUUID(_id))
  })

  it('imports the English feminine name table', () => {
    const { _id } = loadYaml<{ _id: string }>('src/packs/rolltables/personal.english.fem.yaml')
    expect(EnglishPersonalNameTables.Feminine).toBe(getRollTableUUID(_id))
  })

  it('imports the English masculine name table', () => {
    const { _id } = loadYaml<{ _id: string }>('src/packs/rolltables/personal.english.masc.yaml')
    expect(EnglishPersonalNameTables.Masculine).toBe(getRollTableUUID(_id))
  })
})

describe('EnglishPersonalName', () => {
  const family = new EnglishFamily({ name: 'Teach' })
  const birth = new BirthContext({}, family)
  const data: EnglishPersonalNameParams = {
    nationality: 'English',
    birth: birth.toObject(),
    gender: 'Masculine',
    personal: 'Edward'
  }

  beforeEach(() => {
    mockTables({
      [EnglishPersonalNameTables.Feminine]: { results: [{ description: 'Mary' } as foundry.documents.TableResult] },
      [EnglishPersonalNameTables.Masculine]: { results: [{ description: 'Edward' } as foundry.documents.TableResult] },
      [EnglishPersonalNameTables.Surnames]: { results: [{ description: 'Teach' } as foundry.documents.TableResult] }
    })
  })

  describe('constructor', () => {
    it('creates an English name', () => {
      const actual = new EnglishPersonalName()
      expect(actual).toBeInstanceOf(EnglishPersonalName)
    })

    it('sets nationality to English', () => {
      const actual = new EnglishPersonalName()
      expect(actual.nationality).toBe('English')
    })

    it.each(genders)('can assign %s to gender', (gender: Gender) => {
      const actual = new EnglishPersonalName({ gender })
      expect(actual.gender).toBe(gender)
    })

    it('randomizes the gender by default', () => {
      const actual = new EnglishPersonalName()
      expect(genders).toContain(actual.gender)
    })

    it('can take a personal name', () => {
      const actual = new EnglishPersonalName({ personal: 'Edward' })
      expect(actual.personal).toBe('Edward')
    })

    it('defaults to John for a masculine name', () => {
      const actual = new EnglishPersonalName({ gender: 'Masculine' })
      expect(actual.personal).toBe('John')
    })

    it('defaults to Jane for a feminine name', () => {
      const actual = new EnglishPersonalName({ gender: 'Feminine' })
      expect(actual.personal).toBe('Jane')
    })
  })

  describe('Accessor methods', () => {
    describe('full', () => {
      it('returns the full name', () => {
        const instance = new EnglishPersonalName(data)
        expect(instance.full).toBe('Edward Teach')
      })
    })
  })

  describe('Instance methods', () => {
    describe('address', () => {
      it('concatenates title and family name', () => {
        const instance = new EnglishPersonalName(data)
        expect(instance.address('Captain')).toBe('Captain Teach')
      })
    })

    describe('toObject', () => {
      it('returns a data object', () => {
        const instance = new EnglishPersonalName(data, birth)
        const actual = instance.toObject({ capt: { Masculine: 'Captain', Feminine: 'Captain' } })
        expect(actual.birth).toEqual(birth.toObject())
        expect(actual.gender).toEqual(instance.gender)
        expect(actual.forms.personal).toBe('Edward')
        expect(actual.forms.full).toBe('Edward Teach')
        expect(actual.forms.capt).toBe('Captain Teach')
      })
    })
  })

  describe('Static methods', () => {
    describe('getDefaultPersonalName', () => {
      it('return Jane for women', () => {
        expect(EnglishPersonalName.getDefaultPersonalName('Feminine')).toBe('Jane')
      })

      it('return John for men', () => {
        expect(EnglishPersonalName.getDefaultPersonalName('Masculine')).toBe('John')
      })
    })

    describe('generator', () => {
      it('can generate a masculine name', async () => {
        const [actual] = await EnglishPersonalName.generate({ gender: 'Masculine' })
        expect(actual.full).toBe('Edward Teach')
        expect(actual.personal).toBe('Edward')
      })

      it('can generate a feminine name', async () => {
        const [actual] = await EnglishPersonalName.generate({ gender: 'Feminine' })
        expect(actual.full).toBe('Mary Teach')
        expect(actual.personal).toBe('Mary')
      })
    })
  })
})
