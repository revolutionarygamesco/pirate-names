import { drawStr } from '@revolutionarygamesco/common-foundryvtt'
import { selectRandomGender } from '../../enums/gender.ts'
import getRollTableUUID from '../../get-rolltable-uuid.ts'
import MandinkaFamily, { Jamu } from '../families/mandinka.ts'
import PersonalName, { type PersonalNameData } from './base.ts'

export interface MandinkaPersonalNameData extends PersonalNameData {}

export const MandinkaPersonalNameTables = {
  Feminine: getRollTableUUID('h6tzaD6oa2YIIV12'),
  Masculine: getRollTableUUID('FQJ81W7DYNYjBGTW'),
  Jamu
}

class MandinkaPersonalName extends PersonalName {
  constructor (data?: Partial<PersonalNameData>) {
    super(data)
    this.nationality = 'Mandinka'
    this.personal = data?.personal ?? (this.gender === 'Masculine' ? 'Lamin' : 'Fatou')
    this.full = data?.full ?? this.personal
  }

  static async generate (
    data?: Partial<PersonalNameData>,
    context?: Partial<{ family: MandinkaFamily }>
  ): Promise<MandinkaPersonalName[]> {
    const family = context?.family ?? await MandinkaFamily.generate()
    const gender = data?.gender ?? selectRandomGender()
    const personal = data?.personal ?? await drawStr(MandinkaPersonalNameTables[gender], gender === 'Masculine' ? 'Lamin' : 'Fatou')
    return [new MandinkaPersonalName({ gender, personal, full: `${personal} ${family.name}` })]
  }
}

export default MandinkaPersonalName
