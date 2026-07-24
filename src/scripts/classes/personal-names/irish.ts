import { drawStr } from '@revolutionarygamesco/common-foundryvtt'
import { type Gender, selectRandomGender } from '../../types/enums/gender.ts'
import { type Nationality } from '../../types/enums/nationality.ts'
import getRollTableUUID from '../../get-rolltable-uuid.ts'
import separateParenthetical from '../../parenthetical.ts'
import BirthContext, { type BirthContextData } from '../birth/base.ts'
import EnglishFamily from '../families/english.ts'
import EnglishPersonalName from './english.ts'
import IrishFamily, { IrishFamilyNames, type IrishFamilyData } from '../families/irish.ts'
import PersonalName, { type PersonalNameData, type PersonalNameParams } from './base.ts'

export interface IrishPersonalNameParams extends PersonalNameParams<BirthContextData<IrishFamilyData>> {}
export interface IrishPersonalNameData extends PersonalNameData<BirthContextData<IrishFamilyData>> {}

export const IrishPersonalNameTables: Record<string, string> = {
  Feminine: getRollTableUUID('FfWfEmYaVbJCx5i0'),
  Masculine: getRollTableUUID('QAewP1wCxn8LhvlP'),
  Surnames: IrishFamilyNames
}

class IrishPersonalName extends PersonalName<IrishFamily, BirthContext<IrishFamily>> {
  protected static override nationality: Nationality = 'Irish'
  protected static override familyClass = IrishFamily

  constructor (
    data?: Partial<IrishPersonalNameParams>,
    context?: BirthContext<IrishFamily>
  ) {
    super(data, context)
    this.personal = data?.personal ?? IrishPersonalName.getDefaultPersonalName(this.gender)
  }

  get full (): string {
    return `${this.personal} ${this.family.name}`
  }

  address (title: string): string {
    return `${title} ${this.family.name}`
  }

  static getDefaultPersonalName (gender: Gender): string {
    return super.getDefaultPersonalName(gender, {
      Feminine: 'Brid',
      Masculine: 'Pádraig'
    })
  }

  static getDefaultPersonalNameEntry (gender: Gender): string {
    return super.getDefaultPersonalName(gender, {
      Feminine: 'Brid (Bridget)',
      Masculine: 'Pádraig (Patrick)'
    })
  }

  static async generate (
    data?: Partial<IrishPersonalNameData>,
    context?: BirthContext<IrishFamily>
  ): Promise<Array<IrishPersonalName | EnglishPersonalName>> {
    const birth = context ?? await IrishPersonalName.generateBirth(data?.birth) as BirthContext<IrishFamily>
    const gender = data?.gender ?? selectRandomGender()
    const drawn = await drawStr(
      IrishPersonalNameTables[gender],
      IrishPersonalName.getDefaultPersonalNameEntry(gender)
    )
    const { regular, parenthetical } = separateParenthetical(drawn)

    const { anglicization, ...base } = birth.family
    const english = new BirthContext(data?.birth, new EnglishFamily({ ...base, name: anglicization }))

    return [
      new IrishPersonalName({ gender, personal: regular }, birth),
      new EnglishPersonalName({ gender, personal: parenthetical }, english)
    ]
  }
}

export default IrishPersonalName
