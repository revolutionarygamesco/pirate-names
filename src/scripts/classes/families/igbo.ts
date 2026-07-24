import { drawStr } from '@revolutionarygamesco/common-foundryvtt'
import getRollTableUUID from '../../get-rolltable-uuid.ts'
import PatrilinealFamily, { type PatrilinealFamilyData } from './patrilineal.ts'

export interface IgboFamilyData extends PatrilinealFamilyData {}

export const IgboMasculineNames = getRollTableUUID('suEpqqiTqsZc1v0v')

class IgboFamily extends PatrilinealFamily {
  constructor(data?: Partial<IgboFamilyData>) {
    super(data)
    this.nationality = 'Igbo'
    this.patriarch = data?.patriarch === undefined ? 'Ougeromba' : this.patriarch
  }

  renderPatronym (): string {
    return this.patriarch
  }

  static async generate (
    data?: Partial<IgboFamilyData>
  ): Promise<IgboFamily> {
    const patriarch = data?.patriarch ?? await drawStr(IgboMasculineNames, 'Ougeromba')
    return new IgboFamily({ ...data, patriarch })
  }
}

export default IgboFamily
