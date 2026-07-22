import { describe, it, expect } from 'vitest'
import { primitives } from '@revolutionarygamesco/common/testing'
import { isGender, selectRandomGender, genders, type Gender } from './gender.ts'

describe('isGender', () => {
  it.each(primitives)('rejects %s', (_desc: string, candidate: any) => {
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
