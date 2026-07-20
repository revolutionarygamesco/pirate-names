import { drawStr } from '@revolutionarygamesco/common-foundryvtt'
import { selectRandomGender } from '../../enums/gender.ts'
import getRollTableUUID from '../../get-rolltable-uuid.ts'
import generateDutchFamily, { DutchNameTables, NamedDutchFamily, type DutchFamily } from '../families/dutch.ts'
import PersonalName, { type PersonalNameData } from './base.ts'

export interface DutchPersonalNameData extends PersonalNameData {}

export const DutchPersonalNameTables: Record<string, string> = {
  ...DutchNameTables,
  Feminine: getRollTableUUID('71DRh4LK1omoYTNV')
}

class DutchPersonalName extends PersonalName {
  constructor (data?: Partial<DutchPersonalNameData>) {
    super(data)
    this.nationality = 'Dutch'
    this.personal = data?.personal ?? (this.gender === 'Masculine' ? 'Jan' : 'Maria')
    this.full = data?.full ?? this.personal
  }

  toObject (): DutchPersonalNameData {
    return {
      nationality: this.nationality,
      gender: this.gender,
      full: this.full,
      personal: this.personal
    }
  }

  static async generate (
    data?: Partial<DutchPersonalNameData>,
    context?: Partial<{ family: DutchFamily }>
  ): Promise<DutchPersonalName[]> {
    const family = context?.family ?? await generateDutchFamily()
    const gender = data?.gender ?? selectRandomGender()
    const personal = await drawStr(DutchPersonalNameTables[gender], gender === 'Masculine' ? 'Jan' : 'Maria')
    const last = family instanceof NamedDutchFamily ? family.name : family.renderPatronym(gender)
    return [new DutchPersonalName({gender, personal, full: `${personal} ${last}`})]
  }
}

export default DutchPersonalName
