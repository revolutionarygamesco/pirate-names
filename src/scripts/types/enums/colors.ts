import { makeEnum } from '@revolutionarygamesco/common'
import { drawGuarded } from '@revolutionarygamesco/common-foundryvtt'
import { nation } from '../../../ids.ts'

export const colors = ['Spanish', 'British', 'French', 'Dutch', 'Pirate'] as const
export type Colors = typeof colors[number]
export const { guard: isColors } = makeEnum(colors)

export const selectRandomColors = async (): Promise<Colors> => {
  return await drawGuarded(nation.ship, isColors, 'Spanish')
}
