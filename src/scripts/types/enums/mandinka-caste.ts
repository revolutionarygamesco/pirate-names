import {makeEnum, selectRandomElement, stockArray} from '@revolutionarygamesco/common'

export const mandinkaCastes = ['Foro', 'Nyamakala', 'Jali', 'Jakhanke'] as const
export type MandinkaCaste = typeof mandinkaCastes[number]
export const { guard: isMandinkaCaste } = makeEnum(mandinkaCastes)
export const selectRandomMandinkaCaste = (): MandinkaCaste => {
  return selectRandomElement(stockArray<MandinkaCaste>([
    { n: 1, item: 'Jali' },
    { n: 1, item: 'Jakhanke' },
    { n: 1, item: 'Nyamakala' },
    { n: 97, item: 'Foro' }
  ]))
}