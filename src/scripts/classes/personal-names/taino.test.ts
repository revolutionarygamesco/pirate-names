import { beforeEach, describe, it, expect } from 'vitest'
import { loadYaml } from '@revolutionarygamesco/common/testing'
import { mockTables } from '@revolutionarygamesco/common-foundryvtt/mocks'
import { genders, type Gender } from '../../types/enums/gender.ts'
import getRollTableUUID from '../../get-rolltable-uuid.ts'
import BirthContext from '../birth/base.ts'
import PatrilinealFamily from '../families/patrilineal.ts'
import TainoPersonalName, { TainoPersonalNameTables, type TainoPersonalNameParams } from './taino.ts'

describe('TainoPersonalNameTables', () => {
  it('imports the Taíno feminine subjects table', () => {
    const { _id } = loadYaml<{ _id: string }>('src/packs/rolltables/personal.taino.subj.fem.yaml')
    expect(TainoPersonalNameTables.Feminine.Subjects).toBe(getRollTableUUID(_id))
  })

  it('imports the Taíno feminine modifiers table', () => {
    const { _id } = loadYaml<{ _id: string }>('src/packs/rolltables/personal.taino.mod.fem.yaml')
    expect(TainoPersonalNameTables.Feminine.Modifiers).toBe(getRollTableUUID(_id))
  })

  it('imports the Taíno masculine subjects table', () => {
    const { _id } = loadYaml<{ _id: string }>('src/packs/rolltables/personal.taino.subj.masc.yaml')
    expect(TainoPersonalNameTables.Masculine.Subjects).toBe(getRollTableUUID(_id))
  })

  it('imports the Taíno masculine modifiers table', () => {
    const { _id } = loadYaml<{ _id: string }>('src/packs/rolltables/personal.taino.mod.masc.yaml')
    expect(TainoPersonalNameTables.Masculine.Modifiers).toBe(getRollTableUUID(_id))
  })
})

describe('TainoPersonalName', () => {
  const family = new PatrilinealFamily()
  const birth = new BirthContext({}, family)
  const data: TainoPersonalNameParams = {
    nationality: 'Taíno',
    birth: birth.toObject(),
    gender: 'Masculine',
    personal: 'Agüeybaná'
  }

  beforeEach(() => {
    mockTables({
      [TainoPersonalNameTables.Masculine.Subjects]: { results: [{ description: 'Hurakán' } as foundry.documents.TableResult] },
      [TainoPersonalNameTables.Masculine.Modifiers]: { results: [{ description: 'turey' } as foundry.documents.TableResult] },
      [TainoPersonalNameTables.Feminine.Subjects]: { results: [{ description: 'Ni' } as foundry.documents.TableResult] },
      [TainoPersonalNameTables.Feminine.Modifiers]: { results: [{ description: 'ana' } as foundry.documents.TableResult] }
    })
  })

  describe('constructor', () => {
    it('creates a Taino name', () => {
      const actual = new TainoPersonalName()
      expect(actual).toBeInstanceOf(TainoPersonalName)
    })

    it('sets nationality to Taíno', () => {
      const actual = new TainoPersonalName()
      expect(actual.nationality).toBe('Taíno')
    })

    it.each(genders)('can assign %s to gender', (gender: Gender) => {
      const actual = new TainoPersonalName({ gender })
      expect(actual.gender).toBe(gender)
    })

    it('randomizes the gender by default', () => {
      const actual = new TainoPersonalName()
      expect(genders).toContain(actual.gender)
    })

    it('defaults to Güeybaná for a masculine name', () => {
      const actual = new TainoPersonalName({ gender: 'Masculine' })
      expect(actual.personal).toBe('Güeybaná')
      expect(actual.full).toBe('Güeybaná')
    })

    it('defaults to Anabaná for a feminine name', () => {
      const actual = new TainoPersonalName({ gender: 'Feminine' })
      expect(actual.personal).toBe('Anacaona')
      expect(actual.full).toBe('Anacaona')
    })
  })

  describe('Accessor methods', () => {
    describe('full', () => {
      it('returns the full name', () => {
        const instance = new TainoPersonalName(data, birth)
        expect(instance.full).toBe('Agüeybaná')
      })
    })
  })

  describe('Instance methods', () => {
    describe('address', () => {
      it('returns the concatenation of the title and personal name', () => {
        const instance = new TainoPersonalName(data, birth)
        expect(instance.address('Mister')).toBe('Mister Agüeybaná')
      })
    })

    describe('toObject', () => {
      it('returns a data object', () => {
        const instance = new TainoPersonalName(data, birth)
        const actual = instance.toObject({ mister: { Masculine: 'Mister', Feminine: 'Misses' } })
        expect(actual.birth).toEqual(birth.toObject())
        expect(actual.gender).toEqual(instance.gender)
        expect(actual.forms.personal).toBe('Agüeybaná')
        expect(actual.forms.full).toBe('Agüeybaná')
        expect(actual.forms.mister).toBe('Mister Agüeybaná')
      })
    })
  })

  describe('Static methods', () => {
    describe('concatWithElision', () => {
      it('concatenates two strings', () => {
        const actual = TainoPersonalName.concatWithElision('a', 'b', 'c')
        expect(actual).toEqual('abc')
      })

      it('elides repeated letters at boundaries', () => {
        const actual = TainoPersonalName.concatWithElision('the', 'egg', 'got', 'turned')
        expect(actual).toEqual('theggoturned')
      })

      it('doesn’t break if you just give it one thing', () => {
        const actual = TainoPersonalName.concatWithElision('1')
        expect(actual).toEqual('1')
      })
    })

    describe('getDefaultPersonalName', () => {
      it('returns Anacaona for women', () => {
        expect(TainoPersonalName.getDefaultPersonalName('Feminine')).toBe('Anacaona')
      })

      it('returns Güeybaná for men', () => {
        expect(TainoPersonalName.getDefaultPersonalName('Masculine')).toBe('Güeybaná')
      })
    })

    describe('generator', () => {
      it('can generate a masculine name', async () => {
        const [actual] = await TainoPersonalName.generate({ gender: 'Masculine' })
        expect(actual.full).toBe('Hurakánturey')
        expect(actual.personal).toBe('Hurakánturey')
      })

      it('can generate a feminine name', async () => {
        const [actual] = await TainoPersonalName.generate({ gender: 'Feminine' })
        expect(actual.full).toBe('Niana')
        expect(actual.personal).toBe('Niana')
      })
    })
  })
})
