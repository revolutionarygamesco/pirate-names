import { chance } from '@revolutionarygamesco/common'
import { drawStr } from '@revolutionarygamesco/common-foundryvtt'
import { type Gender } from '../../enums/gender.ts'
import getRollTableUUID from '../../get-rolltable-uuid.ts'
import NamedFamily, { type NamedFamilyData } from './named.ts'
import PatrilinealFamily, { type PatrilinealFamilyData } from './patrilineal.ts'

export const DutchNameTables = {
  Masculine: getRollTableUUID('2uRlTQ7a2dthSDJ1'),
  Surnames: getRollTableUUID('txdQSSgEHJlW9Iax')
}

export class NamedDutchFamily extends NamedFamily {
  constructor(data?: Partial<NamedFamilyData>) {
    super(data)
    this.nationality = 'Dutch'
    this.name = this.name === 'Smith' ? 'Smit' : this.name
  }

  static async generate (
    data?: Partial<NamedFamilyData>
  ): Promise<NamedDutchFamily> {
    const name = data?.name ?? await drawStr(DutchNameTables.Surnames, 'Smit')
    return new NamedDutchFamily({ name, ...data })
  }
}

export class PatrilinealDutchFamily extends PatrilinealFamily {
  constructor(data?: Partial<NamedFamilyData>) {
    super(data)
    this.nationality = 'Dutch'
    this.patriarch = this.patriarch === 'John' ? 'Jan' : this.patriarch
  }

  renderPatronym (gender: Gender): string {
    const suffix = gender === 'Feminine' ? 'dochter' : 'zoon'
    return `${this.patriarch}s${suffix}`
  }

  static async generate (
    data?: Partial<PatrilinealFamilyData>
  ): Promise<PatrilinealDutchFamily> {
    const patriarch = data?.patriarch ?? await drawStr(DutchNameTables.Masculine, 'Jan')
    return new PatrilinealDutchFamily({ patriarch, ...data })
  }
}

export type DutchFamily = NamedDutchFamily | PatrilinealDutchFamily

const generateDutchFamily = (
  data?: Partial<NamedFamilyData | PatrilinealFamilyData>
): Promise<DutchFamily> => {
  const generator = chance(1, 2)
    ? NamedDutchFamily.generate
    : PatrilinealDutchFamily.generate
  return generator(data)
}

export default generateDutchFamily
