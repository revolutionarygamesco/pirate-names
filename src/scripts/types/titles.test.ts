import { describe, it, expect } from 'vitest'
import { getPrimitivesExcept } from '@revolutionarygamesco/common/testing'
import { isTitles, mapTitles } from './titles.ts'

describe('isTitles', () => {
  it.each([
    ...getPrimitivesExcept('an empty object')
  ])('rejects %s', (_label, value) => {
    expect(isTitles(value)).toBe(false)
  })

  it('accepts a string', () => {
    expect(isTitles({ captain: 'Captain' })).toBe(true)
  })

  it('accepts a gendered title', () => {
    expect(isTitles({ mister: { m: 'Mr.', f: 'Mrs.' } })).toBe(true)
  })
})

describe('mapTitles', () => {
  it('maps a string to a gendered titles dictionary', () => {
    const actual = mapTitles({ captain: 'Captain' })
    expect(actual.captain.Feminine).toBe('Captain')
    expect(actual.captain.Masculine).toBe('Captain')
  })

  it('maps a gendered title to a gendered titles dictionary', () => {
    const actual = mapTitles({ mister: { m: 'Mr.', f: 'Mrs.' } })
    expect(actual.mister.Feminine).toBe('Mrs.')
    expect(actual.mister.Masculine).toBe('Mr.')
  })
})
