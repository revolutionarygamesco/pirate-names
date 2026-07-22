import { beforeEach, describe, it, expect } from 'vitest'
import { loadYaml } from '@revolutionarygamesco/common/testing'
import { mockTables } from '@revolutionarygamesco/common-foundryvtt/mocks'
import getRollTableUUID from '../../get-rolltable-uuid.ts'
import EnglishFamily, { EnglishFamilyNames, type EnglishFamilyData } from './english.ts'

describe('EnglishFamilyNames', () => {
  it('imports the right tables', () => {
    const { _id } = loadYaml<{ _id: string }>('src/packs/rolltables/personal.english.sur.yaml')
    expect(EnglishFamilyNames).toBe(getRollTableUUID(_id))
  })
})

describe('EnglishFamily', () => {
  const data: EnglishFamilyData = {
    nationality: 'English',
    size: 3,
    name: 'Smith'
  }

  beforeEach(() => {
    mockTables({
      [EnglishFamilyNames]: { results: [{ description: 'Jones' } as foundry.documents.TableResult] }
    })
  })

  describe('constructor', () => {
    it('creates an English family', () => {
      const actual = new EnglishFamily()
      expect(actual).toBeInstanceOf(EnglishFamily)
    })

    it('sets nationality to English', () => {
      const actual = new EnglishFamily()
      expect(actual.nationality).toBe('English')
    })

    it('sets the family name to Smith by default', () => {
      const actual = new EnglishFamily()
      expect(actual.name).toBe('Smith')
    })
  })

  describe('Instance methods', () => {
    describe('toObject', () => {
      it('returns a data object', () => {
        const instance = new EnglishFamily(data)
        const actual = instance.toObject()
        expect(actual).toEqual(data)
        expect(actual).not.toBe(data)
      })
    })
  })

  describe('Static methods', () => {
    describe('generator', () => {
      it('generates an English family', async () => {
        const actual = await EnglishFamily.generate()
        expect(actual.name).toBe('Jones')
      })
    })
  })
})
