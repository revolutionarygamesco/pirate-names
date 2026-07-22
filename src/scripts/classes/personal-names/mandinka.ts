import { drawStr } from '@revolutionarygamesco/common-foundryvtt'
import { selectRandomGender } from '../../types/enums/gender.ts'
import getRollTableUUID from '../../get-rolltable-uuid.ts'
import BirthContext from '../birth/base.ts'
import MandinkaFamily, { Jamu, type MandinkaFamilyData } from '../families/mandinka.ts'
import PersonalName, { type PersonalNameData } from './base.ts'

export interface MandinkaPersonalNameData extends PersonalNameData {
  family: MandinkaFamilyData
}

export const MandinkaPersonalNameTables = {
  Feminine: getRollTableUUID('h6tzaD6oa2YIIV12'),
  Masculine: getRollTableUUID('FQJ81W7DYNYjBGTW'),
  Jamu
}

class MandinkaPersonalName extends PersonalName {
  family: MandinkaFamily

  constructor (
    data?: Partial<PersonalNameData>,
    context?: Partial<{ family: MandinkaFamily, birth: BirthContext }>
  ) {
    super(data, context)
    this.nationality = 'Mandinka'
    this.family = context?.family ?? new MandinkaFamily(data?.family)
    this.birth = context?.birth ?? new BirthContext(data?.birth, this.family)
    this.personal = data?.personal ?? (this.gender === 'Masculine' ? 'Lamin' : 'Fatou')
  }

  get full (): string {
    return `${this.personal} ${this.family.name}`
  }

  address (title: string): string {
    return `${title} ${this.family.name}`
  }

  static async generate (
    data?: Partial<PersonalNameData>,
    context?: Partial<{ family: MandinkaFamily, birth: BirthContext }>
  ): Promise<MandinkaPersonalName[]> {
    const family = context?.family ?? await MandinkaFamily.generate()
    const birth = context?.birth ?? new BirthContext(data?.birth, family)
    const gender = data?.gender ?? selectRandomGender()
    const personal = data?.personal ?? await drawStr(MandinkaPersonalNameTables[gender], gender === 'Masculine' ? 'Lamin' : 'Fatou')
    return [new MandinkaPersonalName({ gender, personal }, { family, birth })]
  }
}

export default MandinkaPersonalName
