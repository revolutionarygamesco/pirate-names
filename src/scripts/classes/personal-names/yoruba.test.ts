import { beforeEach, describe, it, expect, vi } from 'vitest'
import { chance } from '@revolutionarygamesco/common'
import { loadYaml } from '@revolutionarygamesco/common/testing'
import { mockTables } from '@revolutionarygamesco/common-foundryvtt/mocks'
import { genders, selectRandomGender, type Gender } from '../../types/enums/gender.ts'
import getRollTableUUID from '../../get-rolltable-uuid.ts'
import BirthContext from '../birth/base.ts'
import YorubaFamily from '../families/yoruba.ts'
import YorubaPersonalName, { YorubaPersonalNameTables, type YorubaPersonalNameData } from './yoruba.ts'

vi.mock('@revolutionarygamesco/common', async (importOriginal) => ({
  ...await importOriginal<typeof import('@revolutionarygamesco/common')>(),
  chance: vi.fn()
}))

const mockChance = vi.mocked(chance)

describe('YorubaPersonalNameTables', () => {
  it('imports the Yoruba feminine name table', () => {
    const { _id } = loadYaml<{ _id: string }>('src/packs/rolltables/personal.yoruba.common.fem.yaml')
    expect(YorubaPersonalNameTables.Feminine).toBe(getRollTableUUID(_id))
  })

  it('imports the Yoruba masculine name table', () => {
    const { _id } = loadYaml<{ _id: string }>('src/packs/rolltables/personal.yoruba.common.masc.yaml')
    expect(YorubaPersonalNameTables.Masculine).toBe(getRollTableUUID(_id))
  })

  it('imports the Yoruba feminine subjects name table', () => {
    const { _id } = loadYaml<{ _id: string }>('src/packs/rolltables/personal.yoruba.subj.fem.yaml')
    expect(YorubaPersonalNameTables.Subjects.Feminine).toBe(getRollTableUUID(_id))
  })

  it('imports the Yoruba masculine subjects name table', () => {
    const { _id } = loadYaml<{ _id: string }>('src/packs/rolltables/personal.yoruba.subj.masc.yaml')
    expect(YorubaPersonalNameTables.Subjects.Masculine).toBe(getRollTableUUID(_id))
  })

  it('imports the Yoruba inanimate subjects name table', () => {
    const { _id } = loadYaml<{ _id: string }>('src/packs/rolltables/personal.yoruba.subj.in.yaml')
    expect(YorubaPersonalNameTables.Subjects.Inanimate).toBe(getRollTableUUID(_id))
  })

  it('imports the Yoruba common predicts name table', () => {
    const { _id } = loadYaml<{ _id: string }>('src/packs/rolltables/personal.yoruba.pred.core.yaml')
    expect(YorubaPersonalNameTables.Predicates.Core).toBe(getRollTableUUID(_id))
  })

  it('imports the Yoruba animate predicts name table', () => {
    const { _id } = loadYaml<{ _id: string }>('src/packs/rolltables/personal.yoruba.pred.an.yaml')
    expect(YorubaPersonalNameTables.Predicates.Animate).toBe(getRollTableUUID(_id))
  })
})

describe('YorubaPersonalName', () => {
  const family = new YorubaFamily()
  const birth = new BirthContext({ twin: false, special: null }, family)
  const data: YorubaPersonalNameData = {
    nationality: 'Yoruba',
    family: family.toObject(),
    birth: birth.toObject(),
    gender: 'Masculine',
    full: 'Lájẹ̀misìn',
    personal: 'Lájẹ̀misìn',
    destiny: null
  }

  beforeEach(() => {
    mockTables({
      [YorubaPersonalNameTables.Feminine]: { results: [{ description: 'Oyèọlá' } as foundry.documents.TableResult] },
      [YorubaPersonalNameTables.Masculine]: { results: [{ description: 'Ọpẹ́túndé' } as foundry.documents.TableResult] },
      [YorubaPersonalNameTables.Subjects.Feminine]: { results: [{ description: 'Yé' } as foundry.documents.TableResult] },
      [YorubaPersonalNameTables.Subjects.Masculine]: { results: [{ description: 'Ògún' } as foundry.documents.TableResult] },
      [YorubaPersonalNameTables.Subjects.Inanimate]: { results: [{ description: 'Ọlá' } as foundry.documents.TableResult] },
      [YorubaPersonalNameTables.Predicates.Animate]: { results: [{ description: 'fúnmi' } as foundry.documents.TableResult] },
      [YorubaPersonalNameTables.Predicates.Core]: { results: [{ description: 'wùmí' } as foundry.documents.TableResult] }
    })
  })

  describe('constructor', () => {
    it('creates a Yoruba name', () => {
      const actual = new YorubaPersonalName()
      expect(actual).toBeInstanceOf(YorubaPersonalName)
    })

    it('sets nationality to Yoruba', () => {
      const actual = new YorubaPersonalName()
      expect(actual.nationality).toBe('Yoruba')
    })

    it.each(genders)('can assign %s to gender', (gender: Gender) => {
      const actual = new YorubaPersonalName({ gender })
      expect(actual.gender).toBe(gender)
    })

    it('randomizes the gender by default', () => {
      const actual = new YorubaPersonalName()
      expect(genders).toContain(actual.gender)
    })

    it('defaults to Abáyọmí for a masculine name', () => {
      const family = new YorubaFamily()
      const birth = new BirthContext({ twin: false, special: null }, family)
      const actual = new YorubaPersonalName({ gender: 'Masculine' }, { family, birth })
      expect(actual.personal).toBe('Abáyọmí')
      expect(actual.full).toBe('Abáyọmí')
    })

    it('defaults to Abáyọmí for a feminine name', () => {
      const family = new YorubaFamily()
      const birth = new BirthContext({ twin: false, special: null }, family)
      const actual = new YorubaPersonalName({ gender: 'Feminine' }, { family, birth })
      expect(actual.personal).toBe('Abáyọmí')
      expect(actual.full).toBe('Abáyọmí')
    })
  })

  describe('Accessor methods', () => {
    describe('destiny', () => {
      it('returns Táíwò for a senior twin', () => {
        const family = new YorubaFamily({ size: 3 })
        const birth = new BirthContext({ twin: 1, special: 'facedown' }, family)
        const instance = new YorubaPersonalName(data, { family, birth })
        expect(instance.destiny).toBe('Táíwò')
      })

      it('returns Kẹ́hìndé for a junior twin', () => {
        const family = new YorubaFamily({ size: 3 })
        const birth = new BirthContext({ twin: 2, special: 'facedown' }, family)
        const instance = new YorubaPersonalName(data, { family, birth })
        expect(instance.destiny).toBe('Kẹ́hìndé')
      })

      it('returns other birth circumstance names', () => {
        const family = new YorubaFamily({ size: 3 })
        const birth = new BirthContext({ twin: false, special: 'facedown' }, family)
        const instance = new YorubaPersonalName(data, { family, birth })
        expect(instance.destiny).toBe('Àjàyí')
      })

      it('returns null if there isn’t one', () => {
        const family = new YorubaFamily({ size: 3 })
        const birth = new BirthContext({ twin: false, special: null }, family)
        const instance = new YorubaPersonalName(data, { family, birth })
        expect(instance.destiny).toBeNull()
      })
    })

    describe('full', () => {
      it('returns the full name', () => {
        const instance = new YorubaPersonalName(data, { family, birth })
        expect(instance.full).toBe('Lájẹ̀misìn')
      })

      it('includes the destiny name', () => {
        const family = new YorubaFamily({ size: 3 })
        const birth = new BirthContext({ twin: 1, special: 'facedown' }, family)
        const instance = new YorubaPersonalName({}, { family, birth })
        expect(instance.full).toBe('Táíwò Abáyọmí')
      })
    })
  })

  describe('Instance methods', () => {
    describe('address', () => {
      it('returns the concatenation of the title and personal name', () => {
        const instance = new YorubaPersonalName(data, { family, birth })
        expect(instance.address('Ọọ̀ni')).toBe('Ọọ̀ni Lájẹ̀misìn')
      })
    })

    describe('toObject', () => {
      it('returns a data object', () => {
        const instance = new YorubaPersonalName(data, { family, birth })
        const actual = instance.toObject()
        expect(actual).toEqual(data)
        expect(actual).not.toBe(data)
      })
    })
  })

  describe('Static methods', () => {
    describe('generator', () => {
      const birth = (new BirthContext({ twin: false, special: null })).toObject()

      it('can generate a common feminine name', async () => {
        mockChance.mockReturnValueOnce(true)
        const [actual] = await YorubaPersonalName.generate({ gender: 'Feminine', birth })
        expect(actual.full).toBe('Oyèọlá')
        expect(actual.personal).toBe('Oyèọlá')
      })

      it('can generate a common masculine name', async () => {
        mockChance.mockReturnValueOnce(true)
        const [actual] = await YorubaPersonalName.generate({ gender: 'Masculine', birth })
        expect(actual.full).toBe('Ọpẹ́túndé')
        expect(actual.personal).toBe('Ọpẹ́túndé')
      })

      it('can generate a name with an inanimate subject', async () => {
        mockChance.mockReturnValueOnce(false)
        mockChance.mockReturnValueOnce(false)
        const [actual] = await YorubaPersonalName.generate({ gender: selectRandomGender(), birth })
        expect(actual.full).toBe('Ọláwùmí')
        expect(actual.personal).toBe('Ọláwùmí')
      })

      it('can generate a feminine name with an animate subject', async () => {
        mockChance.mockReturnValueOnce(false)
        mockChance.mockReturnValueOnce(true)
        mockChance.mockReturnValueOnce(false)
        const [actual] = await YorubaPersonalName.generate({ gender: 'Feminine', birth })
        expect(actual.full).toBe('Yéwùmí')
        expect(actual.personal).toBe('Yéwùmí')
      })

      it('can generate a masculine name with an animate subject', async () => {
        mockChance.mockReturnValueOnce(false)
        mockChance.mockReturnValueOnce(true)
        mockChance.mockReturnValueOnce(false)
        const [actual] = await YorubaPersonalName.generate({ gender: 'Masculine', birth })
        expect(actual.full).toBe('Ògúnwùmí')
        expect(actual.personal).toBe('Ògúnwùmí')
      })

      it('can generate a feminine name with an animate subject and predicate', async () => {
        mockChance.mockReturnValueOnce(false)
        mockChance.mockReturnValueOnce(true)
        mockChance.mockReturnValueOnce(true)
        const [actual] = await YorubaPersonalName.generate({ gender: 'Feminine', birth })
        expect(actual.full).toBe('Yéfúnmi')
        expect(actual.personal).toBe('Yéfúnmi')
      })

      it('can generate a masculine name with an animate subject and predicate', async () => {
        mockChance.mockReturnValueOnce(false)
        mockChance.mockReturnValueOnce(true)
        mockChance.mockReturnValueOnce(true)
        const [actual] = await YorubaPersonalName.generate({ gender: 'Masculine', birth })
        expect(actual.full).toBe('Ògúnfúnmi')
        expect(actual.personal).toBe('Ògúnfúnmi')
      })
    })
  })
})
