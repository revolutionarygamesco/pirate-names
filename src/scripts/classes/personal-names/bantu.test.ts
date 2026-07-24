import { beforeEach, describe, it, expect, vi } from 'vitest'
import { selectRandomBetween } from '@revolutionarygamesco/common'
import { loadYaml } from '@revolutionarygamesco/common/testing'
import { mockTables } from '@revolutionarygamesco/common-foundryvtt/mocks'
import getRollTableUUID from '../../get-rolltable-uuid.ts'
import { genders, type Gender } from '../../types/enums/gender.ts'
import { type TitleDict } from './base.ts'
import BirthContext from '../birth/base.ts'
import BantuFamily from '../families/bantu.ts'
import BantuPersonalName, {
  BantuPersonalNameTables,
  type BantuPersonalNameParams
} from './bantu.ts'

vi.mock('@revolutionarygamesco/common', async (importOriginal) => ({
  ...await importOriginal<typeof import('@revolutionarygamesco/common')>(),
  selectRandomBetween: vi.fn()
}))

const mockRandom = vi.mocked(selectRandomBetween)

describe('BantuPersonalNameTables', () => {
  it('imports the male initiation name table', () => {
    const { _id } = loadYaml<{ _id: string }>('src/packs/rolltables/personal.bantu.init.masc.yaml')
    expect(BantuPersonalNameTables.Init.Masculine).toBe(getRollTableUUID(_id))
  })

  it('imports the female initiation name table', () => {
    const { _id } = loadYaml<{ _id: string }>('src/packs/rolltables/personal.bantu.init.fem.yaml')
    expect(BantuPersonalNameTables.Init.Feminine).toBe(getRollTableUUID(_id))
  })

  it('imports the santu name table', () => {
    const { _id } = loadYaml<{ _id: string }>('src/packs/rolltables/personal.bantu.santu.yaml')
    expect(BantuPersonalNameTables.Santu).toBe(getRollTableUUID(_id))
  })

  it('imports the nkumbu name table', () => {
    const { _id } = loadYaml<{ _id: string }>('src/packs/rolltables/personal.bantu.nkumbu.yaml')
    expect(BantuPersonalNameTables.Nkumbu).toBe(getRollTableUUID(_id))
  })
})

describe('BantuPersonalName', () => {
  const family = new BantuFamily({ patriarch: 'Nkuwu' })
  const birth = new BirthContext({}, family)
  const data: BantuPersonalNameParams = {
    nationality: 'Bantu',
    birth: birth.toObject(),
    gender: 'Masculine',
    personal: 'Nzinga'
  }

  beforeEach(() => {
    mockTables({
      [BantuPersonalNameTables.Init.Masculine]: { results: [{ description: 'Lema' } as foundry.documents.TableResult] },
      [BantuPersonalNameTables.Init.Feminine]: { results: [{ description: 'Mabinda' } as foundry.documents.TableResult] },
      [BantuPersonalNameTables.Nkumbu]: { results: [{ description: 'Kiala' } as foundry.documents.TableResult] },
      [BantuPersonalNameTables.Santu]: { results: [{ description: 'Molazi' } as foundry.documents.TableResult] }
    })
  })

  describe('constructor', () => {
    it('creates a Bantu name', () => {
      const actual = new BantuPersonalName()
      expect(actual).toBeInstanceOf(BantuPersonalName)
    })

    it('sets nationality to Bantu', () => {
      const actual = new BantuPersonalName()
      expect(actual.nationality).toBe('Bantu')
    })

    it.each(genders)('can assign %s to gender', (gender: Gender) => {
      const actual = new BantuPersonalName({ gender })
      expect(actual.gender).toBe(gender)
    })

    it('randomizes the gender by default', () => {
      const actual = new BantuPersonalName()
      expect(genders).toContain(actual.gender)
    })

    it('defaults to Zola', () => {
      const actual = new BantuPersonalName({ gender: 'Masculine' })
      expect(actual.personal).toBe('Zola')
    })

    it('can take a personal name', () => {
      const actual = new BantuPersonalName({ personal: 'Nzinga' })
      expect(actual.personal).toBe('Nzinga')
    })
  })

  describe('Accessor methods', () => {
    describe('full', () => {
      it('renders a full name', () => {
        const instance = new BantuPersonalName(data, birth)
        expect(instance.full).toBe('Nzinga a Nkuwu')
      })

      it('can render a full name with a santu name', () => {
        const instance = new BantuPersonalName({ ...data, santu: 'Ntoni' }, birth)
        expect(instance.full).toBe('Ntoni Nzinga a Nkuwu')
      })

      it('can render a full name with an initiation name', () => {
        const instance = new BantuPersonalName({ ...data, initiation: 'Lema' }, birth)
        expect(instance.full).toBe('Nzinga a Nkuwu Lema')
      })
    })
  })

  describe('Instance methods', () => {
    describe('address', () => {
      it('returns title with person name', () => {
        const instance = new BantuPersonalName(data, birth)
        expect(instance.address('Mister')).toBe('Mister Nzinga')
      })
    })

    describe('toObject', () => {
      const forms: TitleDict = {
        mister: {
          Masculine: 'Mister',
          Feminine: 'Misses'
        }
      }

      it('returns a data object', () => {
        const instance = new BantuPersonalName(data, birth)
        const actual = instance.toObject(forms)
        expect(actual.birth).toEqual(birth.toObject())
        expect(actual.gender).toEqual(instance.gender)
        expect(actual.forms.personal).toBe('Nzinga')
        expect(actual.forms.full).toBe('Nzinga a Nkuwu')
        expect(actual.forms.mister).toBe('Mister Nzinga')
      })

      it('includes santu name if present', () => {
        const instance = new BantuPersonalName({ ...data, santu: 'Ntoni' }, birth)
        const actual = instance.toObject(forms)
        expect(actual.santu).toBe('Ntoni')
        expect(actual.initiation).not.toBeDefined()
        expect(actual.forms.mister).toBe('Mister Nzinga')
      })

      it('includes initiation name if present', () => {
        const instance = new BantuPersonalName({ ...data, initiation: 'Lema' }, birth)
        const actual = instance.toObject(forms)
        expect(actual.santu).not.toBeDefined()
        expect(actual.initiation).toBe('Lema')
        expect(actual.forms.mister).toBe('Mister Nzinga')
      })
    })
  })

  describe('Static methods', () => {
    describe('selectRandomBackground', () => {
      it('often returns Christian', () => {
        mockRandom.mockReturnValueOnce(1)
        expect(BantuPersonalName.selectRandomBackground()).toBe('Christian')
      })

      it('sometimes returns Initiated', () => {
        mockRandom.mockReturnValueOnce(20)
        expect(BantuPersonalName.selectRandomBackground()).toBe('Initiated')
      })

      it('sometimes returns null', () => {
        mockRandom.mockReturnValueOnce(13)
        expect(BantuPersonalName.selectRandomBackground()).toBeNull()
      })
    })

    describe('getDefaultInitiationName', () => {
      it('returns Lubondo for women', () => {
        expect(BantuPersonalName.getDefaultInitiationName('Feminine')).toBe('Lubondo')
      })

      it('returns Nsumbu for men', () => {
        expect(BantuPersonalName.getDefaultInitiationName('Masculine')).toBe('Nsumbu')
      })
    })

    describe('generator', () => {
      it('can generate a name', async () => {
        const [actual] = await BantuPersonalName.generate()
        expect(actual.full).toBe('Kiala a Kiala')
        expect(actual.personal).toBe('Kiala')
      })
    })
  })
})
