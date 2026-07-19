import { describe, it, expect } from 'vitest'
import { mockRoll } from '@revolutionarygamesco/common-foundryvtt/mocks'
import pickFamilySize from './family.ts'

describe('pickFamilySize', () => {
  it('returns a number between 1 and 13', () => {
    mockRoll(Math.floor((Math.random() * 100) + 1))
    const actual = pickFamilySize()
    expect(actual).toBeGreaterThanOrEqual(1)
    expect(actual).toBeLessThanOrEqual(13)
  })
})
