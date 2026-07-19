import { describe, it, expect } from 'vitest'
import { isGender, selectRandomGender, genders, type Gender } from './gender.ts'

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

describe('selectRandomGender', () => {
  it('picks a gender', () => {
    expect(genders).toContain(selectRandomGender())
  })
})
