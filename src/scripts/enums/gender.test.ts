import { describe, it, expect, vi } from 'vitest'
import { isGender, pickGender, genders } from './gender.ts'

vi.mock('../wrapper.ts', () => ({
  fromUuid: vi.fn().mockResolvedValue({ draw: async () => { return { results: [{ description: 'Feminine' }] } } })
}))

describe('isGender', () => {
  it.each([
    ['undefined', undefined],
    ['null', null],
    ['functions', () => {}],
    ['true', true],
    ['false', false],
    ['numbers', 42],
    ['a random string', 'German'],
    ['an array', []],
    ['an object', {}]
  ] as [string, any][])('rejects %s', (_desc: string, candidate: any) => {
    expect(isGender(candidate)).toBe(false)
  })

  it.each(genders)('accepts %s', (gender: Gender) => {
    expect(isGender(gender)).toBe(true)
  })
})

describe('pickGender', () => {
  it('picks a gender', () => {
    expect(genders).toContain(pickGender())
  })
})
