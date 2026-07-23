import { drawStr } from '@revolutionarygamesco/common-foundryvtt'
import { selectRandomGender, type Gender } from '../../types/enums/gender.ts'
import getRollTableUUID from '../../get-rolltable-uuid.ts'
import BirthContext, { type BirthContextData } from '../birth/base.ts'
import MandinkaFamily, { Jamu, type MandinkaFamilyData } from '../families/mandinka.ts'
import PersonalName, { type PersonalNameData, type PersonalNameParams } from './base.ts'

export interface MandinkaPersonalNameParams extends PersonalNameParams<BirthContextData<MandinkaFamilyData>> {}
export interface MandinkaPersonalNameData extends PersonalNameData<BirthContextData<MandinkaFamilyData>> {}

export const MandinkaPersonalNameTables = {
  Feminine: getRollTableUUID('h6tzaD6oa2YIIV12'),
  Masculine: getRollTableUUID('FQJ81W7DYNYjBGTW'),
  Jamu
}

class MandinkaPersonalName extends PersonalName<MandinkaFamily, BirthContext<MandinkaFamily>> {
  constructor (
    data?: Partial<MandinkaPersonalNameParams>,
    context?: BirthContext<MandinkaFamily>
  ) {
    super(data, context)
    this.nationality = 'Mandinka'
    const family = context?.family ?? new MandinkaFamily({ ...data?.birth?.family, nationality: 'Mandinka' })
    this.birth = context ?? new BirthContext(data?.birth, family)
    this.personal = data?.personal ?? MandinkaPersonalName.getDefaultPersonalName(this.gender)
  }

  get full (): string {
    return `${this.personal} ${this.family.name}`
  }

  static getDefaultPersonalName (gender: Gender): string {
    return super.getDefaultPersonalName(gender, {
      Feminine: 'Fatou',
      Masculine: 'Lamin'
    })
  }

  static async generate (
    data?: Partial<PersonalNameParams>,
    context?: BirthContext<MandinkaFamily>
  ): Promise<MandinkaPersonalName[]> {
    const family = context?.family ?? await MandinkaFamily.generate(data?.birth?.family)
    const birth = context ?? new BirthContext(data?.birth, family)
    const gender = data?.gender ?? selectRandomGender()
    const personal = data?.personal ?? await drawStr(
      MandinkaPersonalNameTables[gender],
      MandinkaPersonalName.getDefaultPersonalName(gender)
    )
    return [new MandinkaPersonalName({ gender, personal }, birth)]
  }
}

export default MandinkaPersonalName
