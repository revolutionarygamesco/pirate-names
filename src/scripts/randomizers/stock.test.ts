import { describe, it, expect } from '@jest/globals'
import stockArray from './stock.ts'

describe('stockArray', () => {
  it('stocks an array', () => {
    const stock: Array<{ n: number, item: string }> = [
      { n: 1, item: 'a' },
      { n: 2, item: 'b' }
    ]
    const arr = stockArray<string>(stock)
    expect(arr).toEqual(['a', 'b', 'b'])
  })
})
