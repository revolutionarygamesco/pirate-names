import { drawStr } from '@revolutionarygamesco/common-foundryvtt'
import {type Gender, selectRandomGender} from '../../types/enums/gender.ts'
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
  constructor (
    data?: Partial<IrishPersonalNameParams>,
    context?: BirthContext<IrishFamily>
  ) {
    super(data)
    this.nationality = 'Irish'
    const family = context?.family ?? new IrishFamily({ ...data?.birth?.family, nationality: 'Irish' })
    this.birth = context ?? new BirthContext(data?.birth, family)
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

  static getDefaultPersonalNameEnty (gender: Gender): string {
    return super.getDefaultPersonalName(gender, {
      Feminine: 'Brid (Bridget)',
      Masculine: 'Pádraig (Patrick)'
    })
  }

  static async generate (
    data?: Partial<IrishPersonalNameData>,
    context?: Partial<{ family: IrishFamily }>
  ): Promise<[IrishPersonalName, EnglishPersonalName]> {
    const family = context?.family ?? await IrishFamily.generate(data?.birth?.family)
    const birth = new BirthContext(data?.birth, family)
    const gender = data?.gender ?? selectRandomGender()
    const drawn = await drawStr(
      IrishPersonalNameTables[gender],
      IrishPersonalName.getDefaultPersonalNameEnty(gender)
    )
    const { regular, parenthetical } = separateParenthetical(drawn)

    const { anglicization, ...base } = family
    const english = new BirthContext(data?.birth, new EnglishFamily({ ...base, name: anglicization }))

    return [
      new IrishPersonalName({ gender, personal: regular }, birth),
      new EnglishPersonalName({ gender, personal: parenthetical }, english)
    ]
  }
}

export default IrishPersonalName
