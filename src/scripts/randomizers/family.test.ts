import { describe, it, expect } from 'vitest'
import { mockRoll } from '@revolutionarygamesco/common-foundryvtt/mocks'
import selectRandomFamilySize from './family.ts'

describe('selectRandomFamilySize', () => {
  it('returns a number between 1 and 13', () => {
    mockRoll(Math.floor((Math.random() * 100) + 1))
    const actual = selectRandomFamilySize()
    expect(actual).toBeGreaterThanOrEqual(1)
    expect(actual).toBeLessThanOrEqual(13)
  })
})
