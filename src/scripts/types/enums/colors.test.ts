import { describe, it, expect } from 'vitest'
import { primitives } from '@revolutionarygamesco/common/testing'
import { mockTables } from '@revolutionarygamesco/common-foundryvtt/mocks'
import { nation } from '../../../ids.ts'
import {
  isColors,
  selectRandomColors,
  colors,
  type Colors
} from './colors.ts'

describe('isColors', () => {
  it.each(primitives)('rejects %s', (_desc: string, candidate: any) => {
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
