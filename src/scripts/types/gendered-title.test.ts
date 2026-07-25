import { describe, it, expect } from 'vitest'
import { primitives } from '@revolutionarygamesco/common/testing'
import { isGenderedTitle } from './gendered-title.ts'

describe('isGenderedTitle', () => {
  it.each(primitives)('rejects %s', (_label, value) => {
    expect(isGenderedTitle(value)).toBe(false)
  })

  it('accepts a gendered title object', () => {
    expect(isGenderedTitle({ m: 'Mr.', f: 'Mrs.' })).toBe(true)
  })
})
