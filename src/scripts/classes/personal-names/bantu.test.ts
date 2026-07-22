import { beforeEach, describe, it, expect, vi } from 'vitest'
import { selectRandomBetween } from '@revolutionarygamesco/common'
import { mockTables } from '@revolutionarygamesco/common-foundryvtt/mocks'
import { genders, type Gender } from '../../types/enums/gender.ts'
import BirthContext from '../birth/base.ts'
import BantuFamily from '../families/bantu.ts'
import BantuPersonalName, { BantuPersonalNameTables, type BantuPersonalNameData } from './bantu.ts'

vi.mock('@revolutionarygamesco/common', async (importOriginal) => ({
  ...await importOriginal<typeof import('@revolutionarygamesco/common')>(),
  selectRandomBetween: vi.fn()
}))

const mockRandom = vi.mocked(selectRandomBetween)

describe('BantuPersonalName', () => {
  const family = new BantuFamily({ patriarch: 'Nkuwu' })
  const birth = new BirthContext({}, family)
  const data: BantuPersonalNameData = {
    nationality: 'Bantu',
    family: family.toObject(),
    birth: birth.toObject(),
    gender: 'Masculine',
    full: 'Nzinga a Nkuwu',
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
        const instance = new BantuPersonalName(data, { family, birth })
        expect(instance.full).toBe(data.full)
      })

      it('can render a full name with a santu name', () => {
        const instance = new BantuPersonalName({ ...data, santu: 'Ntoni' }, { family, birth })
        expect(instance.full).toBe(`Ntoni ${data.full}`)
      })

      it('can render a full name with an initiation name', () => {
        const instance = new BantuPersonalName({ ...data, initiation: 'Lema' }, { family, birth })
        expect(instance.full).toBe(`${data.full} Lema`)
      })
    })
  })

  describe('Instance methods', () => {
    describe('address', () => {
      it('returns title with person name', () => {
        const instance = new BantuPersonalName(data, { family, birth })
        expect(instance.address('Mister')).toBe('Mister Nzinga')
      })
    })

    describe('toObject', () => {
      it('returns a data object', () => {
        const instance = new BantuPersonalName(data, { family, birth })
        const actual = instance.toObject()
        expect(actual).toEqual(data)
        expect(actual).not.toBe(data)
        expect(actual.santu).not.toBeDefined()
        expect(actual.initiation).not.toBeDefined()
      })

      it('includes santu name if present', () => {
        const instance = new BantuPersonalName({ ...data, santu: 'Ntoni' }, { family, birth })
        const actual = instance.toObject()
        expect(actual.santu).toBe('Ntoni')
        expect(actual.initiation).not.toBeDefined()
      })

      it('includes initiation name if present', () => {
        const instance = new BantuPersonalName({ ...data, initiation: 'Lema' }, { family, birth })
        const actual = instance.toObject()
        expect(actual.santu).not.toBeDefined()
        expect(actual.initiation).toBe('Lema')
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

    describe('generator', () => {
      it('can generate a name', async () => {
        const [actual] = await BantuPersonalName.generate()
        expect(actual.full).toBe('Kiala a Kiala')
        expect(actual.personal).toBe('Kiala')
      })
    })
  })
})
