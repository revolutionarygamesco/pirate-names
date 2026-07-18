import { describe, it, expect } from 'vitest'
import concatWithElision from './elide.ts'

describe('concatWithElision', () => {
  it('concatenates two strings', () => {
    const actual = concatWithElision('a', 'b', 'c')
    expect(actual).toEqual('abc')
  })

  it('elides repeated letters at boundaries', () => {
    const actual = concatWithElision('the', 'egg', 'got', 'turned')
    expect(actual).toEqual('theggoturned')
  })

  it('doesn’t break if you just give it one thing', () => {
    const actual = concatWithElision('1')
    expect(actual).toEqual('1')
  })
})
