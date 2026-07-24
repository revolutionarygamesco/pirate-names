import { drawStr } from '@revolutionarygamesco/common-foundryvtt'
import getRollTableUUID from '../../get-rolltable-uuid.ts'
import PatrilinealFamily, { type PatrilinealFamilyData } from './patrilineal.ts'

export const Nkumbu = getRollTableUUID('FseoFZOSLwHCNy4W')

export interface BantuFamilyData extends PatrilinealFamilyData {}

class BantuFamily extends PatrilinealFamily {
  constructor(data?: Partial<BantuFamilyData>) {
    super(data)
    this.nationality = 'Bantu'
    this.patriarch = data?.patriarch === undefined ? 'Zola' : this.patriarch
  }

  renderPatronym (): string {
    return `a ${this.patriarch}`
  }

  static async generate (
    data?: Partial<BantuFamilyData>
  ): Promise<BantuFamily> {
    const patriarch = data?.patriarch ?? await drawStr(Nkumbu, 'Zola')
    return new BantuFamily({ ...data, patriarch })
  }
}

export default BantuFamily
