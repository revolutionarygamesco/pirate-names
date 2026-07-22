import { beforeEach, describe, it, expect } from 'vitest'
import { mockTables } from '@revolutionarygamesco/common-foundryvtt/mocks'
import IrishFamily, { IrishFamilyNames, type IrishFamilyData } from './irish.ts'

describe('IrishFamily', () => {
  const data: IrishFamilyData = {
    nationality: 'Irish',
    size: 3,
    name: 'Ó Briain',
    anglicization: 'O’Brien'
  }

  beforeEach(() => {
    mockTables({
      [IrishFamilyNames]: { results: [{ description: 'Ó Ceallaigh (Kelly)' } as foundry.documents.TableResult] }
    })
  })

  describe('constructor', () => {
    it('creates an Irish family', () => {
      const actual = new IrishFamily()
      expect(actual).toBeInstanceOf(IrishFamily)
    })

    it('sets nationality to Irish', () => {
      const actual = new IrishFamily()
      expect(actual.nationality).toBe('Irish')
    })

    it('sets the family name to Ó Murchadha by default', () => {
      const actual = new IrishFamily()
      expect(actual.name).toBe('Ó Murchadha')
    })

    it('sets the family name’s Anglicization to Murphy by default', () => {
      const actual = new IrishFamily()
      expect(actual.anglicization).toBe('Murphy')
    })
  })

  describe('Instance methods', () => {
    describe('toObject', () => {
      it('returns a data object', () => {
        const instance = new IrishFamily(data)
        const actual = instance.toObject()
        expect(actual).toEqual(data)
        expect(actual).not.toBe(data)
      })
    })
  })

  describe('Static methods', () => {
    describe('generator', () => {
      it('generates an Irish family', async () => {
        const actual = await IrishFamily.generate()
        expect(actual.name).toBe('Ó Ceallaigh')
        expect(actual.anglicization).toBe('Kelly')
      })
    })
  })
})
