import { drawStr } from '@revolutionarygamesco/common-foundryvtt'
import getRollTableUUID from '../../get-rolltable-uuid.ts'
import NamedFamily, { type NamedFamilyData } from './named.ts'

export interface WelshFamilyData extends NamedFamilyData {}

export const WelshFamilyNames = getRollTableUUID('HsshgplTIrOwI4xH')

class WelshFamily extends NamedFamily {
  constructor(data?: Partial<WelshFamilyData>) {
    super(data)
    this.nationality = 'Welsh'
    this.name = this.name === 'Smith' ? 'Jones' : this.name
  }

  static async generate (
    data?: Partial<WelshFamilyData>
  ): Promise<WelshFamily> {
    const name = data?.name ?? await drawStr(WelshFamilyNames, 'Jones')
    return new WelshFamily({ name, ...data })
  }
}

export default WelshFamily
