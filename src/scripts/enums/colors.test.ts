import { describe, it, expect } from 'vitest'
import { mockTables } from '@revolutionarygamesco/common-foundryvtt/mocks'
import { nation } from '../../ids.ts'
import {
  isColors,
  selectRandomColors,
  colors,
  type Colors
} from './colors.ts'

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

describe('colors', () => {
  it('picks colors', async () => {
    mockTables({ [nation.ship]: { results: [{ description: 'Spanish' } as foundry.documents.TableResult] } })
    expect(await selectRandomColors()).toBe('Spanish')
  })
})
