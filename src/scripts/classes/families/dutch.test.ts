import { beforeEach, describe, it, expect } from 'vitest'
import { mockTables } from '@revolutionarygamesco/common-foundryvtt/mocks'
import {
  DutchNameTables,
  NamedDutchFamily,
  PatrilinealDutchFamily,
  type NamedDutchFamilyData,
  type PatrilineDutchFamilyData
} from './dutch.ts'
import type {FamilyData} from './base.ts'
import generateDutchFamily from './dutch.ts'

describe('DutchFamily', () => {
  const base: FamilyData = {
    nationality: 'Dutch',
    size: 3
  }


  const named: NamedDutchFamilyData = { ...base, name: 'Bakker' }
  const patrilineal: PatrilineDutchFamilyData = { ...base, patriarch: 'Dirk' }

  beforeEach(() => {
    mockTables({
      [DutchNameTables.Surnames]: {results: [{description: 'van den Berg'} as foundry.documents.TableResult]},
      [DutchNameTables.Masculine]: {results: [{description: 'Johannes'} as foundry.documents.TableResult]}
    })
  })

  describe('NamedDutchFamily', () => {
    describe('constructor', () => {
      it('creates a named Dutch family', () => {
        const actual = new NamedDutchFamily(named)
        expect(actual).toBeInstanceOf(NamedDutchFamily)
      })

      it('sets nationality to Dutch', () => {
        const actual = new NamedDutchFamily()
        expect(actual.nationality).toBe('Dutch')
      })

      it('can set the family name', () => {
        const actual = new NamedDutchFamily(named)
        expect(actual.name).toBe(named.name)
      })

      it('sets the family name to Smit by default', () => {
        const actual = new NamedDutchFamily()
        expect(actual.name).toBe('Smit')
      })
    })

    describe('Instance methods', () => {
      describe('toObject', () => {
        it('returns a data object', () => {
          const instance = new NamedDutchFamily(named)
          const actual = instance.toObject()
          expect(actual).toEqual(named)
          expect(actual).not.toBe(named)
        })
      })
    })

    describe('Static methods', () => {
      describe('generator', () => {
        it('generates a named Dutch family', async () => {
          const actual = await NamedDutchFamily.generate()
          expect(actual.name).toBe('van den Berg')
        })
      })
    })
  })

  describe('PatrilinealDutchFamily', () => {
    describe('constructor', () => {
      it('creates a patrilineal Dutch family', () => {
        const actual = new PatrilinealDutchFamily(patrilineal)
        expect(actual).toBeInstanceOf(PatrilinealDutchFamily)
      })

      it('sets nationality to Dutch', () => {
        const actual = new PatrilinealDutchFamily()
        expect(actual.nationality).toBe('Dutch')
      })

      it('can set the patriarch’s name', () => {
        const actual = new PatrilinealDutchFamily(patrilineal)
        expect(actual.patriarch).toBe(patrilineal.patriarch)
      })

      it('sets the patriach’s name to Jan by default', () => {
        const actual = new PatrilinealDutchFamily()
        expect(actual.patriarch).toBe('Jan')
      })
    })

    describe('Instance methods', () => {
      describe('renderPatronym', () => {
        it('renders a son’s patronym', () => {
          const instance = new PatrilinealDutchFamily()
          expect(instance.renderPatronym('Masculine')).toBe('Janszoon')
        })

        it('renders a daughter’s patronym', () => {
          const instance = new PatrilinealDutchFamily()
          expect(instance.renderPatronym('Feminine')).toBe('Jansdochter')
        })
      })

      describe('toObject', () => {
        it('returns a data object', () => {
          const instance = new PatrilinealDutchFamily(patrilineal)
          const actual = instance.toObject()
          expect(actual).toEqual(patrilineal)
          expect(actual).not.toBe(patrilineal)
        })
      })
    })

    describe('Static methods', () => {
      describe('generator', () => {
        it('generates a patrilineal Dutch family', async () => {
          const actual = await PatrilinealDutchFamily.generate()
          expect(actual.patriarch).toBe('Johannes')
        })
      })
    })
  })

  describe('generateDutchFamily', () => {
    it('generates either a named or patrilineal family', async () => {
      const actual = await generateDutchFamily()
      const checks = [
        actual instanceof NamedDutchFamily,
        actual instanceof PatrilinealDutchFamily
      ].some(test => test)
      expect(checks).toBe(true)
    })
  })
})
