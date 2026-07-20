import { drawStr } from '@revolutionarygamesco/common-foundryvtt'
import getRollTableUUID from '../../get-rolltable-uuid.ts'
import NamedFamily, { type NamedFamilyData } from './named.ts'

export const FrenchFamilyNames = getRollTableUUID('bT9wBtgWV3ZA0sMr')

class FrenchFamily extends NamedFamily {
  constructor(data?: Partial<NamedFamilyData>) {
    super(data)
    this.nationality = 'French'
    this.name = this.name === 'Smith' ? 'Dupont' : this.name
  }

  static async generate (
    data?: Partial<NamedFamilyData>
  ): Promise<FrenchFamily> {
    const name = data?.name ?? await drawStr(FrenchFamilyNames, 'Dupont')
    return new FrenchFamily({ name, ...data })
  }
}

export default FrenchFamily
