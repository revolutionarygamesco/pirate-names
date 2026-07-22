import { drawStr } from '@revolutionarygamesco/common-foundryvtt'
import { selectRandomGender } from '../../types/enums/gender.ts'
import getRollTableUUID from '../../get-rolltable-uuid.ts'
import IgboBirthContext, { type IgboBirthContextData } from '../birth/igbo.ts'
import IgboFamily, { IgboMasculineNames, type IgboFamilyData } from '../families/igbo.ts'
import PersonalName, { type PersonalNameData } from './base.ts'

export interface IgboPersonalNameData extends PersonalNameData {
  family: IgboFamilyData
  birth: IgboBirthContextData
  day: string
}

export const IgboPersonalNameTables = {
  Feminine: getRollTableUUID('zZu80jKYxdX3WrSa'),
  Masculine: IgboMasculineNames,
  WeekdayNames: {
    Eke: {
      Feminine: getRollTableUUID('xirRaiEMQxffat2i'),
      Masculine: getRollTableUUID('7gE1hyJlwt1u9oHL')
    },
    Oye: {
      Feminine: getRollTableUUID('EUydQtTL6vaNYlmV'),
      Masculine: getRollTableUUID('cI7heAYS1tbv5fnl')
    },
    Afor: {
      Feminine: getRollTableUUID('RWfP0OYZBXeyd8ne'),
      Masculine: getRollTableUUID('dHwrHVCqYAp3gvLN')
    },
    Nkwo: {
      Feminine: getRollTableUUID('w8NAGfjJWmsvspjD'),
      Masculine: getRollTableUUID('zTqHX0nG0RHhMPbF')
    }
  }
}

class IgboPersonalName extends PersonalName {
  family: IgboFamily
  birth: IgboBirthContext
  day: string

  constructor (
    data?: Partial<IgboPersonalNameData>,
    context?: Partial<{ family: IgboFamily, birth: IgboBirthContext }>
  ) {
    super(data, context)
    this.nationality = 'Igbo'
    this.family = context?.family ?? new IgboFamily(data?.family)
    this.birth = context?.birth ?? new IgboBirthContext(data?.birth, this.family)
    this.personal = data?.personal ?? (this.gender === 'Masculine' ? 'Ougeromba' : 'Houanizei')
    this.day = data?.day ?? (this.gender === 'Masculine' ? 'Okoeke' : 'Ekemma')
  }

  get full (): string {
    return `${this.day} ${this.personal} ${this.family.renderPatronym()}`
  }

  address (title: string): string {
    return `${title} ${this.personal}`
  }

  toObject (): IgboPersonalNameData {
    return {
      ...super.toObject(),
      family: this.family.toObject(),
      birth: this.birth.toObject(),
      day: this.day
    }
  }

  static async generate (
    data?: Partial<IgboPersonalNameData>,
    context?: Partial<{ family: IgboFamily, birth: IgboBirthContext }>
  ): Promise<IgboPersonalName[]> {
    const family = context?.family ?? await IgboFamily.generate()
    const birth = context?.birth ?? new IgboBirthContext(data?.birth, family)
    const gender = data?.gender ?? selectRandomGender()
    const personal = data?.personal ?? await drawStr(IgboPersonalNameTables[gender], gender === 'Masculine' ? 'Ougeromba' : 'Houanizei')
    const day = await drawStr(IgboPersonalNameTables.WeekdayNames[birth.igboWeekday][gender], gender === 'Masculine' ? 'Okoeke' : 'Ekemma')
    return [new IgboPersonalName({ gender, personal, day }, { family, birth })]
  }
}

export default IgboPersonalName
