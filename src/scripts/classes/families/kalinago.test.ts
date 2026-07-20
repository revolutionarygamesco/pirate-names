import { beforeEach, describe, it, expect } from 'vitest'
import { mockTables } from '@revolutionarygamesco/common-foundryvtt/mocks'
import { type PatrilinealFamilyData } from './patrilineal.ts'
import KalinagoFamily, { KalinagoMasculineNames } from './kalinago.ts'

describe('KalinagoFamily', () => {
  const data: PatrilinealFamilyData = {
    nationality: 'Kalinago',
    size: 3,
    order: 2,
    twin: false,
    patriarch: 'Weyu'
  }

  beforeEach(() => {
    mockTables({
      [KalinagoMasculineNames]: { results: [{ description: 'Nonum' } as foundry.documents.TableResult] }
    })
  })

  describe('constructor', () => {
    it('creates a Kalinago family', () => {
      const actual = new KalinagoFamily()
      expect(actual).toBeInstanceOf(KalinagoFamily)
    })

    it('sets nationality to Kalinago', () => {
      const actual = new KalinagoFamily()
      expect(actual.nationality).toBe('Kalinago')
    })

    it('sets the patriarch’s name to Wukeri by default', () => {
      const actual = new KalinagoFamily()
      expect(actual.patriarch).toBe('Wukeri')
    })
  })

  describe('Instance methods', () => {
    describe('renderPatronym', () => {
      it('returns the patronym', () => {
        const instance = new KalinagoFamily()
        expect(instance.renderPatronym()).toBe('Wukeri')
      })
    })

    describe('toObject', () => {
      it('returns a data object', () => {
        const instance = new KalinagoFamily(data)
        const actual = instance.toObject()
        expect(actual).toEqual(data)
        expect(actual).not.toBe(data)
      })
    })
  })

  describe('Static methods', () => {
    describe('generator', () => {
      it('generates a Kalinago family', async () => {
        const actual = await KalinagoFamily.generate()
        expect(actual.patriarch).toBe('Nonum')
      })
    })
  })
})
