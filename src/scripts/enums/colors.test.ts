import { describe, it, expect, vi } from 'vitest'
import {
  isColors,
  pickColors,
  colors
} from './colors.ts'

vi.mock('../wrapper.ts', () => ({
  fromUuid: vi.fn().mockResolvedValue({ draw: async () => { return { results: [{ description: 'Spanish' }] } } })
}))

describe('isColors', () => {
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
    expect(isColors(candidate)).toBe(false)
  })

  it.each(colors)('accepts %s', (colors: Colors) => {
    expect(isColors(colors)).toBe(true)
  })
})

describe('pickColors', () => {
  it('picks colors', async () => {
    expect(await pickColors()).toBe('Spanish')
  })
})
