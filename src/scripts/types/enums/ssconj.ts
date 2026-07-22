import { makeEnum } from '@revolutionarygamesco/common'

export const spanishSurnameConjunctions = ['y', 'e', 'de', '-'] as const
export type SpanishSurnameConjunction = typeof spanishSurnameConjunctions[number]
export const {
  guard: isSpanishSurnameConjunction,
  randomizer: selectRandomSpanishSurnameConjunction
} = makeEnum(spanishSurnameConjunctions)
