import { describe, it, expect } from 'vitest'
import { primitives } from '@revolutionarygamesco/common'
import {
  isMandinkaCaste,
  selectRandomMandinkaCaste,
  mandinkaCastes,
  type MandinkaCaste
} from './mandinka-caste.ts'

describe('isMandinkaCaste', () => {
  it.each(primitives)('rejects %s', (_desc: string, candidate: any) => {
    expect(isMandinkaCaste(candidate)).toBe(false)
  })

  it.each(mandinkaCastes)('accepts %s', (weekday: MandinkaCaste) => {
    expect(isMandinkaCaste(weekday)).toBe(true)
  })
})

describe('selectRandomMandinkaCaste', () => {
  it('picks a random weekday', () => {
    expect(mandinkaCastes).toContain(selectRandomMandinkaCaste())
  })
})
