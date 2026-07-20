import { beforeEach, describe, it, expect } from 'vitest'
import { mockTables } from '@revolutionarygamesco/common-foundryvtt/mocks'
import { genders, type Gender } from '../../enums/gender.ts'
import IrishPersonalName, { IrishPersonalNameTables, type IrishPersonalNameData } from './irish.ts'

describe('IrishPersonalName', () => {
  const data: IrishPersonalNameData = {
    nationality: 'Irish',
    gender: 'Masculine',
    full: 'Gráinne Ní Mháille',
    personal: 'Gráinne',
    family: 'Ní Mháille'
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

    it('can take a full name', () => {
      const actual = new IrishPersonalName({ full: 'Gráinne Ní Mháille' })
      expect(actual.full).toBe('Gráinne Ní Mháille')
    })

    it('defaults to Pádraig Ó Murchadha for a masculine name', () => {
      const actual = new IrishPersonalName({ gender: 'Masculine' })
      expect(actual.full).toBe('Pádraig Ó Murchadha')
    })

    it('defaults to Brid Ó Murchadha for a feminine name', () => {
      const actual = new IrishPersonalName({ gender: 'Feminine' })
      expect(actual.full).toBe('Brid Ó Murchadha')
    })

    it('can take a personal name', () => {
      const actual = new IrishPersonalName({ personal: 'Gráinne' })
      expect(actual.personal).toBe('Gráinne')
    })

    it('defaults to Pádraig for a masculine name', () => {
      const actual = new IrishPersonalName({ gender: 'Masculine' })
      expect(actual.personal).toBe('Pádraig')
    })

    it('defaults to Brid for a feminine name', () => {
      const actual = new IrishPersonalName({ gender: 'Feminine' })
      expect(actual.personal).toBe('Brid')
    })

    it('can take a family name', () => {
      const actual = new IrishPersonalName({ family: 'Ní Mháille' })
      expect(actual.family).toBe('Ní Mháille')
    })

    it('defaults to Ó Murchadha', () => {
      const actual = new IrishPersonalName()
      expect(actual.family).toBe('Ó Murchadha')
    })
  })

  describe('Instance methods', () => {
    describe('toObject', () => {
      it('returns a data object', () => {
        const instance = new IrishPersonalName(data)
        const actual = instance.toObject()
        expect(actual).toEqual(data)
        expect(actual).not.toBe(data)
      })
    })
  })

  describe('Static methods', () => {
    describe('separateAnglicization', () => {
      it('separates the Gaelic form from the Anglicization when properly formatted', () => {
        const { gaelic, anglicization } = IrishPersonalName.separateAnglicization('Ó Murchadha (Murphy)')
        expect(gaelic).toBe('Ó Murchadha')
        expect(anglicization).toBe('Murphy')
      })
    })

    describe('generator', () => {
      it('can generate a masculine name', async () => {
        const [irish, english] = await IrishPersonalName.generate({ gender: 'Masculine' })
        expect(irish.full).toBe('Pádraig Ó Murchadha')
        expect(irish.personal).toBe('Pádraig')
        expect(irish.family).toBe('Ó Murchadha')
        expect(english.personal).toBe('Patrick')
      })

      it('can generate a feminine name', async () => {
        const [irish, english] = await IrishPersonalName.generate({ gender: 'Feminine' })
        expect(irish.full).toBe('Brid Ó Murchadha')
        expect(irish.personal).toBe('Brid')
        expect(irish.family).toBe('Ó Murchadha')
        expect(english.personal).toBe('Bridget')
      })
    })
  })
})
