import { describe, it, expect } from 'vitest'
import { primitives } from '@revolutionarygamesco/common'
import {
  isSpanishSurnameConjunction,
  selectRandomSpanishSurnameConjunction,
  spanishSurnameConjunctions,
  type SpanishSurnameConjunction
} from './ssconj.ts'

describe('isSpanishSurnameConjunction', () => {
  it.each(primitives)('rejects %s', (_desc: string, candidate: any) => {
    expect(isSpanishSurnameConjunction(candidate)).toBe(false)
  })

  it.each(spanishSurnameConjunctions)('accepts %s', (conj: SpanishSurnameConjunction) => {
    expect(isSpanishSurnameConjunction(conj)).toBe(true)
  })
})

describe('selectSpanishSurnameConjunction', () => {
  it('picks a random weekday', () => {
    expect(spanishSurnameConjunctions).toContain(selectRandomSpanishSurnameConjunction())
  })
})
