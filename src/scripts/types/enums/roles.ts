import { chance, makeEnum } from '@revolutionarygamesco/common'

export const shipRoles = ['Merchantman', 'Man-of-War'] as const
export type ShipRole = typeof shipRoles[number]
export const { guard: isShipRole } = makeEnum(shipRoles)

export const selectRandomShipRole = (): ShipRole => {
  return chance(1, 20) ? 'Man-of-War' : 'Merchantman'
}
