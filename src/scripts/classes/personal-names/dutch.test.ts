import { beforeEach, describe, it, expect } from 'vitest'
import { mockTables } from '@revolutionarygamesco/common-foundryvtt/mocks'
import { genders, type Gender } from '../../types/enums/gender.ts'
import { NamedDutchFamily, PatrilinealDutchFamily } from '../families/dutch.ts'
import DutchPersonalName, { DutchPersonalNameTables, type DutchPersonalNameData } from './dutch.ts'
import BirthContext from '../birth/base.ts'

describe('DutchPersonalName', () => {
  const family = new NamedDutchFamily({ name: 'Chivers' })
  const birth = new BirthContext({}, family)
  const data: DutchPersonalNameData = {
    nationality: 'Dutch',
    family: family.toObject(),
    birth: birth.toObject(),
    gender: 'Masculine',
    full: 'Dirk Chivers',
    personal: 'Dirk'
  }

  beforeEach(() => {
    mockTables({
      [DutchPersonalNameTables.Feminine]: { results: [{ description: 'Anna' } as foundry.documents.TableResult] },
      [DutchPersonalNameTables.Masculine]: { results: [{ description: 'Johannes' } as foundry.documents.TableResult] },
      [DutchPersonalNameTables.Surnames]: { results: [{ description: 'Smit' } as foundry.documents.TableResult] }
    })
  })

  describe('constructor', () => {
    it('creates a Dutch name', () => {
      const actual = new DutchPersonalName()
      expect(actual).toBeInstanceOf(DutchPersonalName)
    })

    it('sets nationality to Dutch', () => {
      const actual = new DutchPersonalName()
      expect(actual.nationality).toBe('Dutch')
    })

    it.each(genders)('can assign %s to gender', (gender: Gender) => {
      const actual = new DutchPersonalName({ gender })
      expect(actual.gender).toBe(gender)
    })

    it('randomizes the gender by default', () => {
      const actual = new DutchPersonalName()
      expect(genders).toContain(actual.gender)
    })

    it('can take a personal name', () => {
      const actual = new DutchPersonalName({ personal: 'Dirk' })
      expect(actual.personal).toBe('Dirk')
    })

    it('defaults to Jan for a masculine name', () => {
      const actual = new DutchPersonalName({ gender: 'Masculine' })
      expect(actual.personal).toBe('Jan')
    })

    it('defaults to Maria for a feminine name', () => {
      const actual = new DutchPersonalName({ gender: 'Feminine' })
      expect(actual.personal).toBe('Maria')
    })
  })

  describe('Accessor methods', () => {
    describe('lastName', () => {
      it('returns the family name', () => {
        const instance = new DutchPersonalName(data, { family, birth })
        expect(instance.lastName).toBe(family.name)
      })

      it('returns the patronym', () => {
        const family = new PatrilinealDutchFamily({ patriarch: 'Jan' })
        const birth = new BirthContext({}, family)
        const instance = new DutchPersonalName({ gender: 'Masculine' }, { family, birth })
        expect(instance.lastName).toBe('Janszoon')
      })
    })

    describe('full', () => {
      it('returns the full name with family name', () => {
        const instance = new DutchPersonalName(data, { family, birth })
        expect(instance.full).toBe('Dirk Chivers')
      })

      it('returns the full name with patronym', () => {
        const family = new PatrilinealDutchFamily({ patriarch: 'Jan' })
        const birth = new BirthContext({}, family)
        const instance = new DutchPersonalName({ gender: 'Masculine' }, { family, birth })
        expect(instance.full).toBe('Jan Janszoon')
      })
    })
  })

  describe('Instance methods', () => {
    describe('address', () => {
      it('returns title with family name', () => {
        const instance = new DutchPersonalName(data, { family, birth })
        expect(instance.address('Captain')).toBe('Captain Chivers')
      })

      it('returns title with patronym', () => {
        const family = new PatrilinealDutchFamily({ patriarch: 'Jan' })
        const birth = new BirthContext({}, family)
        const instance = new DutchPersonalName({ gender: 'Masculine' }, { family, birth })
        expect(instance.address('Captain')).toBe('Captain Janszoon')
      })
    })

    describe('toObject', () => {
      it('returns a data object', () => {
        const instance = new DutchPersonalName(data)
        const actual = instance.toObject()
        expect(actual).toEqual(data)
        expect(actual).not.toBe(data)
      })
    })
  })

  describe('Static methods', () => {
    describe('generator', () => {
      let named: { family: NamedDutchFamily }
      let patrilineal: { family: PatrilinealDutchFamily }

      beforeEach(async () => {
        const n = await NamedDutchFamily.generate({ name: 'Bakker' })
        const p = await PatrilinealDutchFamily.generate({ patriarch: 'Piet' })
        named = { family: n }
        patrilineal = { family: p }
      })

      it('can generate a masculine name with a surname', async () => {
        const [actual] = await DutchPersonalName.generate({ gender: 'Masculine' }, named)
        expect(actual.full).toBe('Johannes Bakker')
        expect(actual.personal).toBe('Johannes')
      })

      it('can generate a masculine name with a patronymic', async () => {
        const [actual] = await DutchPersonalName.generate({ gender: 'Masculine' }, patrilineal)
        expect(actual.full).toBe('Johannes Pietszoon')
        expect(actual.personal).toBe('Johannes')
      })

      it('can generate a feminine name with a surname', async () => {
        const [actual] = await DutchPersonalName.generate({ gender: 'Feminine' }, named)
        expect(actual.full).toBe('Anna Bakker')
        expect(actual.personal).toBe('Anna')
      })

      it('can generate a feminine name with a patronymic', async () => {
        const [actual] = await DutchPersonalName.generate({ gender: 'Feminine' }, patrilineal)
        expect(actual.full).toBe('Anna Pietsdochter')
        expect(actual.personal).toBe('Anna')
      })
    })
  })
})
