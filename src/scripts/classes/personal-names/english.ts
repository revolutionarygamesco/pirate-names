import { drawStr } from '@revolutionarygamesco/common-foundryvtt'
import { type Gender, selectRandomGender } from '../../types/enums/gender.ts'
import { type Nationality } from '../../types/enums/nationality.ts'
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
  protected static override nationality: Nationality = 'English'
  protected static override familyClass = EnglishFamily

  constructor (
    data?: Partial<EnglishPersonalNameParams>,
    context?: BirthContext<EnglishFamily>
  ) {
    super(data, context)
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
    const birth = context ?? await EnglishPersonalName.generateBirth(data?.birth) as BirthContext<EnglishFamily>
    const gender = data?.gender ?? selectRandomGender()
    const personal = await drawStr(
      EnglishPersonalNameTables[gender],
      EnglishPersonalName.getDefaultPersonalName(gender)
    )
    return [new EnglishPersonalName({ gender, personal }, birth)]
  }
}

export default EnglishPersonalName
