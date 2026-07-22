import { drawStr } from '@revolutionarygamesco/common-foundryvtt'
import getRollTableUUID from '../../get-rolltable-uuid.ts'
import NamedFamily, { type NamedFamilyData } from './named.ts'

export interface ScottishFamilyData extends NamedFamilyData {}

export const ScottishFamilyNames = getRollTableUUID('EVtxLwQ1W8ML3vKL')

class ScottishFamily extends NamedFamily {
  constructor(data?: Partial<ScottishFamilyData>) {
    super(data)
    this.nationality = 'Scottish'
  }

  static async generate (
    data?: Partial<ScottishFamilyData>
  ): Promise<ScottishFamily> {
    const name = data?.name ?? await drawStr(ScottishFamilyNames, 'Smith')
    return new ScottishFamily({ name, ...data })
  }
}

export default ScottishFamily
