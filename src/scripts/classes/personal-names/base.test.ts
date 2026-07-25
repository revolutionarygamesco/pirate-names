import { describe, expect, it } from 'vitest'
import EnglishFamily from '../families/english.ts'
import BirthContext from '../birth/base.ts'
import PersonalName, { type PersonalNameParams, type TitleDict } from './base.ts'

class TestName extends PersonalName<EnglishFamily, BirthContext<EnglishFamily>> {
  constructor(data?: Partial<PersonalNameParams>, context?: BirthContext<EnglishFamily>) {
    super(data, context)
  }
}

describe('PersonalName', () => {
  const family = new EnglishFamily({ name: 'Smith', nationality: 'English' })
  const birth = new BirthContext({}, family)

  it('exposes family through the birth context, not a second reference', () => {
    const n = new TestName({ personal: 'John' }, birth)
    expect(n.family).toBe(n.birth.family)
  })

  it('defaults nationality from the static variable', () => {
    const n = new TestName({}, birth)
    expect(n.nationality).toBe('Spanish')
  })

  it('serializes birth through to family data in toObject', () => {
    const n = new TestName({ personal: 'John' }, birth)
    const obj = n.toObject()
    expect(obj.birth.family.name).toBe('Smith')
  })

  it('renders full as the personal name by default', () => {
    const n = new TestName({ personal: 'John' }, birth)
    expect(n.full).toBe('John')
  })

  it('addresses with a title prefix', () => {
    const n = new TestName({ personal: 'John' }, birth)
    expect(n.address('Mister')).toBe('Mister John')
  })

  it('applies title dictionary by gender in toObject', () => {
    const titles: TitleDict = { mister: { Masculine: 'Mr.', Feminine: 'Mrs.' } }
    const n = new TestName({ personal: 'John', gender: 'Masculine' }, birth)
    expect(n.toObject(titles).forms.mister).toBe('Mr. John')
  })
})
