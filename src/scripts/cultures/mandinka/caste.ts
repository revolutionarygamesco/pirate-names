import { selectRandomBand, makeEnum } from '@revolutionarygamesco/common'

export const castes = ['Foro', 'Nyamakala', 'Jali', 'Jakhanke'] as const
export type MandinkaCaste = typeof castes[number]
export const { guard: isMandinkaCaste } = makeEnum(castes)

export const selectRandomMandinkaCaste = (): MandinkaCaste => {
  return selectRandomBand([
    { range: [1, 97], value: 'Foro' },
    { range: [98], value: 'Nyamakala' },
    { range: [99], value: 'Jali' },
    { range: [100], value: 'Jakhanke' }
  ]) ?? 'Foro'
}
