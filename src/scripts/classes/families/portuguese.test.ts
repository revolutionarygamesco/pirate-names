import { beforeEach, describe, it, expect } from 'vitest'
import { mockTables } from '@revolutionarygamesco/common-foundryvtt/mocks'
import PortugueseFamily, { PortugueseFamilyNames, type PortugueseFamilyData } from './portuguese.ts'

describe('PortugueseFamily', () => {
  const data: PortugueseFamilyData = {
    nationality: 'Portuguese',
    size: 3,
    name: 'Silva',
    other: { father: 'Tavares', mother: ['Ferreira', 'Azevedo'] }
  }

  beforeEach(() => {
    mockTables({
      [PortugueseFamilyNames]: { results: [{ description: 'Sousa' } as foundry.documents.TableResult] }
    })
  })

  describe('constructor', () => {
    it('creates a Portuguese family', () => {
      const actual = new PortugueseFamily()
      expect(actual).toBeInstanceOf(PortugueseFamily)
    })

    it('sets nationality to Portuguese', () => {
      const actual = new PortugueseFamily()
      expect(actual.nationality).toBe('Portuguese')
    })

    it('sets the family name to Silva by default', () => {
      const actual = new PortugueseFamily()
      expect(actual.name).toBe('Silva')
    })
  })

  describe('Instance methods', () => {
    describe('createName', () => {
      it('creates one of several possible name combinations', () => {
        const instance = new PortugueseFamily(data)
        expect([
          'Silva',
          'Tavares Silva',
          'Ferreira Silva',
          'Azevedo Silva',
          'Ferreira Azevedo Silva',
          'Ferreira Tavares Silva',
          'Azevedo Tavares Silva',
          'Ferreira Azevedo Tavares Silva'
        ]).toContain(instance.createName())
      })

      it('eliminates duplicates', () => {
        const instance = new PortugueseFamily({
          name: 'Silva',
          other: {
            father: 'Silva',
            mother: ['Silva', 'Silva']
          }
        })
        expect(instance.createName()).toBe('Silva')
      })
    })

    describe('toObject', () => {
      it('returns a data object', () => {
        const instance = new PortugueseFamily(data)
        const actual = instance.toObject()
        expect(actual).toEqual(data)
        expect(actual).not.toBe(data)
      })
    })
  })

  describe('Static methods', () => {
    describe('generator', () => {
      it('generates a Portuguese family', async () => {
        const actual = await PortugueseFamily.generate()
        expect(actual.name).toBe('Sousa')
      })
    })
  })
})
