import { describe, expect, it } from 'vitest'
import { getPrimitivesExcept } from '@revolutionarygamesco/common/testing'
import { isTwinStatus, selectRandomTwinStatus, type TwinStatus } from './twin.ts'

describe('isTwinStatus', () => {
  it.each([
    ...getPrimitivesExcept('false')
  ])('rejects %s', (_label, value) => {
    expect(isTwinStatus(value)).toBe(false)
  })

  it.each([1, 2, false] as Array<TwinStatus>)('accepts %s', (value) => {
    expect(isTwinStatus(value)).toBe(true)
  })
})

describe('selectRandomTwinStatus', () => {
  it('usually returns false', () => {
    expect(selectRandomTwinStatus(0)).toBe(false)
  })

  it('sometimes returns 1 (for senior) or 2 (for junior)', () => {
    expect([1, 2]).toContain(selectRandomTwinStatus(1000))
  })
})
