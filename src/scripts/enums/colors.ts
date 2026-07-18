import { makeStringUnionGuard } from '@revolutionarygamesco/common'
import { nation } from '../../ids.ts'
import rollTable from '../randomizers/roll-table.ts'

export const colors: Colors[] = ['Spanish', 'British', 'French', 'Dutch']
export const isColors = makeStringUnionGuard(colors)

export const pickColors = async (): Promise<Colors> => {
  const drawn = await rollTable(nation.ship, { displayChat: false })
  const n = drawn?.description
  return isColors(n) ? n : 'Spanish'
}
