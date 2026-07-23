import { beforeEach, describe, it, expect } from 'vitest'
import { loadYaml } from '@revolutionarygamesco/common/testing'
import { mockTables } from '@revolutionarygamesco/common-foundryvtt/mocks'
import { genders, type Gender } from '../../types/enums/gender.ts'
import getRollTableUUID from '../../get-rolltable-uuid.ts'
import BirthContext from '../birth/base.ts'
import IrishFamily from '../families/irish.ts'
import IrishPersonalName, { IrishPersonalNameTables, type IrishPersonalNameParams } from './irish.ts'

describe('IrishPersonalNameTables', () => {
  it('imports the Irish surname table', () => {
    const { _id } = loadYaml<{ _id: string }>('src/packs/rolltables/personal.irish.sur.yaml')
    expect(IrishPersonalNameTables.Surnames).toBe(getRollTableUUID(_id))
  })

  it('imports the Irish feminine name table', () => {
    const { _id } = loadYaml<{ _id: string }>('src/packs/rolltables/personal.irish.fem.yaml')
    expect(IrishPersonalNameTables.Feminine).toBe(getRollTableUUID(_id))
  })

  it('imports the Irish masculine name table', () => {
    const { _id } = loadYaml<{ _id: string }>('src/packs/rolltables/personal.irish.masc.yaml')
    expect(IrishPersonalNameTables.Masculine).toBe(getRollTableUUID(_id))
  })
})

describe('IrishPersonalName', () => {
  const family = new IrishFamily({ name: 'Ní Mháille' })
  const birth = new BirthContext({}, family)
  const data: IrishPersonalNameParams = {
    nationality: 'Irish',
    birth: birth.toObject(),
    gender: 'Feminine',
    personal: 'Gráinne'
  }

  beforeEach(() => {
    mockTables({
      [IrishPersonalNameTables.Feminine]: { results: [{ description: 'Brid (Bridget)' } as foundry.documents.TableResult] },
      [IrishPersonalNameTables.Masculine]: { results: [{ description: 'Pádraig (Patrick)' } as foundry.documents.TableResult] },
      [IrishPersonalNameTables.Surnames]: { results: [{ description: 'Ó Murchadha (Murphy)' } as foundry.documents.TableResult] }
    })
  })

  describe('constructor', () => {
    it('creates an Irish name', () => {
      const actual = new IrishPersonalName()
      expect(actual).toBeInstanceOf(IrishPersonalName)
    })

    it('sets nationality to Irish', () => {
      const actual = new IrishPersonalName()
      expect(actual.nationality).toBe('Irish')
    })

    it.each(genders)('can assign %s to gender', (gender: Gender) => {
      const actual = new IrishPersonalName({ gender })
      expect(actual.gender).toBe(gender)
    })

    it('randomizes the gender by default', () => {
      const actual = new IrishPersonalName()
      expect(genders).toContain(actual.gender)
    })

    it('can take a personal name', () => {
      const actual = new IrishPersonalName({ personal: 'Gráinne' })
      expect(actual.personal).toBe('Gráinne')
    })

    it('defaults to Pádraig for a masculine name', () => {
      const actual = new IrishPersonalName({ gender: 'Masculine' })
      expect(actual.personal).toBe('Pádraig')
      expect(actual.full).toBe('Pádraig Ó Murchadha')
    })

    it('defaults to Brid for a feminine name', () => {
      const actual = new IrishPersonalName({ gender: 'Feminine' })
      expect(actual.personal).toBe('Brid')
      expect(actual.full).toBe('Brid Ó Murchadha')
    })
  })

  describe('Accessor methods', () => {
    describe('full', () => {
      it('returns the full name', () => {
        const instance = new IrishPersonalName(data, birth)
        expect(instance.full).toBe('Gráinne Ní Mháille')
      })
    })
  })

  describe('Instance methods', () => {
    describe('address', () => {
      it('concatenates the title and the family name', () => {
        const instance = new IrishPersonalName(data, birth)
        expect(instance.address('Banríon')).toBe('Banríon Ní Mháille')
      })
    })

    describe('toObject', () => {
      it('returns a data object', () => {
        const instance = new IrishPersonalName(data, birth)
        const actual = instance.toObject({ king: { Masculine: 'Rí', Feminine: 'Banríon' } })
        expect(actual.birth).toEqual(birth.toObject())
        expect(actual.gender).toEqual(instance.gender)
        expect(actual.forms.personal).toBe('Gráinne')
        expect(actual.forms.full).toBe('Gráinne Ní Mháille')
        expect(actual.forms.king).toBe('Banríon Ní Mháille')
      })
    })
  })

  describe('Static methods', () => {
    describe('getDefaultPersonalName', () => {
      it('returns Brid for women', () => {
        expect(IrishPersonalName.getDefaultPersonalName('Feminine')).toBe('Brid')
      })

      it('returns Pádraig for men', () => {
        expect(IrishPersonalName.getDefaultPersonalName('Masculine')).toBe('Pádraig')
      })
    })

    describe('getDefaultPersonalNameEnty', () => {
      it('returns Brid (Bridget) for women', () => {
        expect(IrishPersonalName.getDefaultPersonalNameEnty('Feminine')).toBe('Brid (Bridget)')
      })

      it('returns Pádraig (Patrick) for men', () => {
        expect(IrishPersonalName.getDefaultPersonalNameEnty('Masculine')).toBe('Pádraig (Patrick)')
      })
    })

    describe('generator', () => {
      it('can generate a masculine name', async () => {
        const [irish, english] = await IrishPersonalName.generate({ gender: 'Masculine' })
        expect(irish.full).toBe('Pádraig Ó Murchadha')
        expect(irish.personal).toBe('Pádraig')
        expect(english.personal).toBe('Patrick')
      })

      it('can generate a feminine name', async () => {
        const [irish, english] = await IrishPersonalName.generate({ gender: 'Feminine' })
        expect(irish.full).toBe('Brid Ó Murchadha')
        expect(irish.personal).toBe('Brid')
        expect(english.personal).toBe('Bridget')
      })
    })
  })
})
