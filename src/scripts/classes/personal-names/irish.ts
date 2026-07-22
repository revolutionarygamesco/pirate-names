import { drawStr } from '@revolutionarygamesco/common-foundryvtt'
import { selectRandomGender } from '../../types/enums/gender.ts'
import getRollTableUUID from '../../get-rolltable-uuid.ts'
import separateParenthetical from '../../parenthetical.ts'
import BirthContext from '../birth/base.ts'
import EnglishFamily from '../families/english.ts'
import EnglishPersonalName from './english.ts'
import IrishFamily, { IrishFamilyNames, type IrishFamilyData } from '../families/irish.ts'
import PersonalName, { type PersonalNameData } from './base.ts'

export interface IrishPersonalNameData extends PersonalNameData {
  family: IrishFamilyData
}

export const IrishPersonalNameTables: Record<string, string> = {
  Feminine: getRollTableUUID('FfWfEmYaVbJCx5i0'),
  Masculine: getRollTableUUID('QAewP1wCxn8LhvlP'),
  Surnames: IrishFamilyNames
}

class IrishPersonalName extends PersonalName {
  family: IrishFamily

  constructor (
    data?: Partial<IrishPersonalNameData>,
    context?: Partial<{ family: IrishFamily, birth: BirthContext }>
  ) {
    super(data)
    this.nationality = 'Irish'
    this.family = context?.family ?? new IrishFamily(data?.family)
    this.birth = context?.birth ?? new BirthContext(data?.birth, this.family)
    this.personal = data?.personal ?? (this.gender === 'Masculine' ? 'Pádraig' : 'Brid')
  }

  get full (): string {
    return `${this.personal} ${this.family.name}`
  }

  address (title: string): string {
    return `${title} ${this.family.name}`
  }

  toObject (): IrishPersonalNameData {
    return {
      ...super.toObject(),
      family: this.family.toObject()
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

    const { anglicization, ...base } = family
    const english = new EnglishFamily({ ...base, name: anglicization })

    return [
      new IrishPersonalName({ gender, personal: regular }, { family }),
      new EnglishPersonalName({ gender, personal: parenthetical }, { family: english })
    ]
  }
}

export default IrishPersonalName
