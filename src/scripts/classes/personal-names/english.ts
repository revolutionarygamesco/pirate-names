import { drawStr } from '@revolutionarygamesco/common-foundryvtt'
import { type Gender, selectRandomGender } from '../../types/enums/gender.ts'
import getRollTableUUID from '../../get-rolltable-uuid.ts'
import BirthContext, { type BirthContextData } from '../birth/base.ts'
import EnglishFamily, { EnglishFamilyNames, type EnglishFamilyData } from '../families/english.ts'
import PersonalName, { type PersonalNameData, type PersonalNameParams } from './base.ts'

export interface EnglishPersonalNameParams extends PersonalNameParams<BirthContextData<EnglishFamilyData>> {}
export interface EnglishPersonalNameData extends PersonalNameData<BirthContextData<EnglishFamilyData>> {}

export const EnglishPersonalNameTables: Record<string, string> = {
  Feminine: getRollTableUUID('3FurO9qJF79bb11f'),
  Masculine: getRollTableUUID('2rhDoCqCuwAmKABv'),
  Surnames: EnglishFamilyNames
}

class EnglishPersonalName extends PersonalName<EnglishFamily, BirthContext<EnglishFamily>> {
  constructor (
    data?: Partial<EnglishPersonalNameParams>,
    context?: BirthContext<EnglishFamily>
  ) {
    super(data, context)
    this.nationality = 'English'
    const family = context?.family ?? new EnglishFamily({ ...data?.birth?.family, nationality: 'English' })
    this.birth = context ?? new BirthContext(data?.birth, family)
    this.personal = data?.personal ?? EnglishPersonalName.getDefaultPersonalName(this.gender)
  }

  get full (): string {
    return `${this.personal} ${this.family.name}`
  }

  address (title: string): string {
    return `${title} ${this.family.name}`
  }

  static getDefaultPersonalName (gender: Gender): string {
    return super.getDefaultPersonalName(gender, {
      Feminine: 'Jane',
      Masculine: 'John'
    })
  }

  static async generate (
    data?: Partial<EnglishPersonalNameParams>,
    context?: BirthContext<EnglishFamily>
  ): Promise<EnglishPersonalName[]> {
    const family = context?.family ?? await EnglishFamily.generate(data?.birth?.family)
    const birth = context ?? new BirthContext(data?.birth, family)
    const gender = data?.gender ?? selectRandomGender()
    const personal = await drawStr(
      EnglishPersonalNameTables[gender],
      EnglishPersonalName.getDefaultPersonalName(gender)
    )
    return [new EnglishPersonalName({ gender, personal }, birth)]
  }
}

export default EnglishPersonalName
