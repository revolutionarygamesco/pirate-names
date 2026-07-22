import { beforeEach, describe, it, expect } from 'vitest'
import { mockTables } from '@revolutionarygamesco/common-foundryvtt/mocks'
import IgboFamily, { IgboMasculineNames, type IgboFamilyData } from './igbo.ts'

describe('IgboFamily', () => {
  const data: IgboFamilyData = {
    nationality: 'Igbo',
    size: 3,
    patriarch: 'Inouebon'
  }

  beforeEach(() => {
    mockTables({
      [IgboMasculineNames]: { results: [{ description: 'Aujauké' } as foundry.documents.TableResult] }
    })
  })

  describe('constructor', () => {
    it('creates an Igbo family', () => {
      const actual = new IgboFamily()
      expect(actual).toBeInstanceOf(IgboFamily)
    })

    it('sets nationality to Igbo', () => {
      const actual = new IgboFamily()
      expect(actual.nationality).toBe('Igbo')
    })

    it('sets the patriarch’s name to Ougeromba by default', () => {
      const actual = new IgboFamily()
      expect(actual.patriarch).toBe('Ougeromba')
    })
  })

  describe('Instance methods', () => {
    describe('renderPatronym', () => {
      it('returns the patronym', () => {
        const instance = new IgboFamily()
        expect(instance.renderPatronym()).toBe('Ougeromba')
      })
    })

    describe('toObject', () => {
      it('returns a data object', () => {
        const instance = new IgboFamily(data)
        const actual = instance.toObject()
        expect(actual).toEqual(data)
        expect(actual).not.toBe(data)
      })
    })
  })

  describe('Static methods', () => {
    describe('generator', () => {
      it('generates an Igbo family', async () => {
        const actual = await IgboFamily.generate()
        expect(actual.patriarch).toBe('Aujauké')
      })
    })
  })
})
