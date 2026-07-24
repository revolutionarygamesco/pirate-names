import { drawStr } from '@revolutionarygamesco/common-foundryvtt'
import getRollTableUUID from '../../get-rolltable-uuid.ts'
import NamedFamily, { type NamedFamilyData } from './named.ts'

export interface FrenchFamilyData extends NamedFamilyData {}

export const FrenchFamilyNames = getRollTableUUID('bT9wBtgWV3ZA0sMr')

class FrenchFamily extends NamedFamily {
  constructor(data?: Partial<FrenchFamilyData>) {
    super(data)
    this.nationality = 'French'
    this.name = data?.name === undefined ? 'Dupont' : this.name
  }

  static async generate (
    data?: Partial<FrenchFamilyData>
  ): Promise<FrenchFamily> {
    const name = data?.name ?? await drawStr(FrenchFamilyNames, 'Dupont')
    return new FrenchFamily({ name, ...data })
  }
}

export default FrenchFamily
