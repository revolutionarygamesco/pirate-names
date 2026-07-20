import { drawStr } from '@revolutionarygamesco/common-foundryvtt'
import { selectRandomGender } from '../../enums/gender.ts'
import getRollTableUUID from '../../get-rolltable-uuid.ts'
import separateParenthetical from '../../parenthetical.ts'
import IrishFamily, { IrishFamilyNames } from '../families/irish.ts'
import EnglishPersonalName from './english.ts'
import PersonalName, { type PersonalNameData } from './base.ts'

export interface IrishPersonalNameData extends PersonalNameData {}

export const IrishPersonalNameTables: Record<string, string> = {
  Feminine: getRollTableUUID('FfWfEmYaVbJCx5i0'),
  Masculine: getRollTableUUID('QAewP1wCxn8LhvlP'),
  Surnames: IrishFamilyNames
}

class IrishPersonalName extends PersonalName {
  constructor (data?: Partial<IrishPersonalNameData>) {
    super(data)
    this.nationality = 'Irish'
    this.personal = data?.personal ?? (this.gender === 'Masculine' ? 'Pádraig' : 'Brid')
    this.full = data?.full ?? this.personal
  }

  toObject (): IrishPersonalNameData {
    return {
      nationality: this.nationality,
      gender: this.gender,
      full: this.full,
      personal: this.personal
    }
  }

  static async generate (
    data?: Partial<IrishPersonalNameData>,
    context?: Partial<{ family: IrishFamily }>
  ): Promise<[IrishPersonalName, EnglishPersonalName]> {
    const family = context?.family ?? await IrishFamily.generate()
    const gender = data?.gender ?? selectRandomGender()
    const drawn = await drawStr(IrishPersonalNameTables[gender], gender === 'Masculine' ? 'Pádraig (Patrick)' : 'Brid (Bridget)')
    const { regular, parenthetical } = separateParenthetical(drawn)

    return [
      new IrishPersonalName({ gender, personal: regular, full: `${regular} ${family.name}` }),
      new EnglishPersonalName({ gender, personal: parenthetical, full: `${parenthetical} ${family.anglicization}` })
    ]
  }
}

export default IrishPersonalName
