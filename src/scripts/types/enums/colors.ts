import { makeEnum } from '@revolutionarygamesco/common'
import { drawGuarded } from '@revolutionarygamesco/common-foundryvtt'
import getRollTableUUID from '../../get-rolltable-uuid.ts'

export const colors = ['Spanish', 'British', 'French', 'Dutch', 'Pirate'] as const
export type Colors = typeof colors[number]
export const { guard: isColors } = makeEnum(colors)

export const selectRandomColors = async (): Promise<Colors> => {
  const uuid = getRollTableUUID('CrljZ2S8EdjWco9K')
  return await drawGuarded(uuid, isColors, 'Spanish')
}
