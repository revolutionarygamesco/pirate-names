import { beforeEach, describe, it, expect } from 'vitest'
import { loadYaml } from '@revolutionarygamesco/common'
import { mockTables } from '@revolutionarygamesco/common-foundryvtt/mocks'
import { genders, type Gender } from '../../types/enums/gender.ts'
import getRollTableUUID from '../../get-rolltable-uuid.ts'
import BirthContext from '../birth/base.ts'
import PortugueseFamily from '../families/portuguese.ts'
import PortuguesePersonalName, {
  PortuguesePersonalNameTables,
  type PortuguesePersonalNameData
} from './portuguese.ts'

describe('PortuguesePersonalNameTables', () => {
  it('imports the Portuguese surname table', () => {
    const { _id } = loadYaml<{ _id: string }>('src/packs/rolltables/personal.portuguese.sur.yaml')
    expect(PortuguesePersonalNameTables.Surnames).toBe(getRollTableUUID(_id))
  })

  it('imports the Portuguese feminine name table', () => {
    const { _id } = loadYaml<{ _id: string }>('src/packs/rolltables/personal.portuguese.fem.yaml')
    expect(PortuguesePersonalNameTables.Feminine).toBe(getRollTableUUID(_id))
  })

  it('imports the Portuguese masculine name table', () => {
    const { _id } = loadYaml<{ _id: string }>('src/packs/rolltables/personal.portuguese.masc.yaml')
    expect(PortuguesePersonalNameTables.Masculine).toBe(getRollTableUUID(_id))
  })
})

describe('PortuguesePersonalName', () => {
  const family = new PortugueseFamily({ name: 'Português' })
  const birth = new BirthContext({}, family)
  const data: PortuguesePersonalNameData = {
    nationality: 'Portuguese',
    family: family.toObject(),
    birth: birth.toObject(),
    gender: 'Masculine',
    full: 'Bartolomeu Português',
    short: 'Bartolomeu Português',
    personal: 'Bartolomeu',
    surnames: 'Português'
  }

  const long = new PortuguesePersonalName({
    personal: 'Manuel',
    surnames: 'Sousa Almeida Lopes'
  }, {
    family: new PortugueseFamily({
      name: 'Lopes',
      other: {
        father: 'Almeida',
        mother: ['Cardoso', 'Sousa']
      }
    }),
    birth
  })

  beforeEach(() => {
    mockTables({
      [PortuguesePersonalNameTables.Feminine]: { results: [{ description: 'Beatriz' } as foundry.documents.TableResult] },
      [PortuguesePersonalNameTables.Masculine]: { results: [{ description: 'Tomás' } as foundry.documents.TableResult] },
      [PortuguesePersonalNameTables.Surnames]: { results: [{ description: 'Borges' } as foundry.documents.TableResult] }
    })
  })

  describe('constructor', () => {
    it('creates a Portuguese name', () => {
      const actual = new PortuguesePersonalName()
      expect(actual).toBeInstanceOf(PortuguesePersonalName)
    })

    it('sets nationality to Portuguese', () => {
      const actual = new PortuguesePersonalName()
      expect(actual.nationality).toBe('Portuguese')
    })

    it.each(genders)('can assign %s to gender', (gender: Gender) => {
      const actual = new PortuguesePersonalName({ gender })
      expect(actual.gender).toBe(gender)
    })

    it('randomizes the gender by default', () => {
      const actual = new PortuguesePersonalName()
      expect(genders).toContain(actual.gender)
    })

    it('can take a personal name', () => {
      const actual = new PortuguesePersonalName({ personal: 'Bartolomeu' })
      expect(actual.personal).toBe('Bartolomeu')
    })

    it('defaults to João for a masculine name', () => {
      const actual = new PortuguesePersonalName({ gender: 'Masculine' })
      expect(actual.personal).toBe('João')
    })

    it('defaults to Maria for a feminine name', () => {
      const actual = new PortuguesePersonalName({ gender: 'Feminine' })
      expect(actual.personal).toBe('Maria')
    })

    it('can take surnames', () => {
      const actual = new PortuguesePersonalName({ surnames: 'Português' })
      expect(actual.surnames).toBe('Português')
    })
  })

  describe('Accessor methods', () => {
    describe('full', () => {
      it('returns the full name', () => {
        const instance = new PortuguesePersonalName(data, { family, birth })
        expect(instance.full).toBe('Bartolomeu Português')
      })
    })

    describe('short', () => {
      it('returns a shortened form of the name', () => {
        expect(long.short).toBe('Manuel Lopes')
      })
    })
  })

  describe('Instance methods', () => {
    describe('address', () => {
      it('concatenates the title with the family name', () => {
        expect(long.address('Senhor')).toBe('Senhor Lopes')
      })
    })

    describe('toObject', () => {
      it('returns a data object', () => {
        const instance = new PortuguesePersonalName(data, { family, birth })
        const actual = instance.toObject()
        expect(actual).toEqual(data)
        expect(actual).not.toBe(data)
      })
    })
  })

  describe('Static methods', () => {
    describe('generator', () => {
      it('can generate a masculine name', async () => {
        const [actual] = await PortuguesePersonalName.generate({ gender: 'Masculine' })
        expect(actual.full).toBe('Tomás Borges')
        expect(actual.personal).toBe('Tomás')
      })

      it('can generate a feminine name', async () => {
        const [actual] = await PortuguesePersonalName.generate({ gender: 'Feminine' })
        expect(actual.full).toBe('Beatriz Borges')
        expect(actual.personal).toBe('Beatriz')
      })
    })
  })
})
