import { drawStr } from '@revolutionarygamesco/common-foundryvtt'
import getRollTableUUID from '../../get-rolltable-uuid.ts'
import PatrilinealFamily, { type PatrilinealFamilyData } from './patrilineal.ts'

export const IgboMasculineNames = getRollTableUUID('suEpqqiTqsZc1v0v')

class IgboFamily extends PatrilinealFamily {
  constructor(data?: Partial<PatrilinealFamilyData>) {
    super(data)
    this.nationality = 'Igbo'
    this.patriarch = this.patriarch === 'John' ? 'Ougeromba' : this.patriarch
  }

  renderPatronym (): string {
    return this.patriarch
  }

  static async generate (
    data?: Partial<PatrilinealFamilyData>
  ): Promise<IgboFamily> {
    const patriarch = data?.patriarch ?? await drawStr(IgboMasculineNames, 'Ougeromba')
    return new IgboFamily({ patriarch, ...data })
  }
}

export default IgboFamily
