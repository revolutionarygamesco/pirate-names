import { describe, it, expect } from '@jest/globals'
import selectRandomElement from './el.ts'

describe('selectRandomElement', () => {
  it('selects a random element from an array', () => {
    const arr = ['a', 'b', 'c']
    const actual = selectRandomElement<string>(arr)
    expect(arr).toContain(actual)
  })
})
