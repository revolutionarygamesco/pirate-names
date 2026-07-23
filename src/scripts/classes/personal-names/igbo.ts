import { drawStr } from '@revolutionarygamesco/common-foundryvtt'
import {type Gender, selectRandomGender} from '../../types/enums/gender.ts'
import getRollTableUUID from '../../get-rolltable-uuid.ts'
import IgboBirthContext, { type IgboBirthContextData } from '../birth/igbo.ts'
import IgboFamily, { IgboMasculineNames } from '../families/igbo.ts'
import PersonalName, { type PersonalNameData, type PersonalNameParams, type TitleDict } from './base.ts'

interface IgboPersonalNameCore {
  day: string
}

export interface IgboPersonalNameParams extends PersonalNameParams<IgboBirthContextData>, IgboPersonalNameCore {}
export interface IgboPersonalNameData extends PersonalNameData<IgboBirthContextData>, IgboPersonalNameCore {}

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

class IgboPersonalName extends PersonalName<IgboFamily, IgboBirthContext> {
  day: string

  constructor (
    data?: Partial<IgboPersonalNameParams>,
    context?: IgboBirthContext
  ) {
    super(data, context)
    this.nationality = 'Igbo'
    const family = context?.family ?? new IgboFamily({ ...data?.birth?.family, nationality: 'Igbo' })
    this.birth = context ?? new IgboBirthContext(data?.birth, family)
    this.personal = data?.personal ?? IgboPersonalName.getDefaultPersonalName(this.gender)
    this.day = data?.day ?? IgboPersonalName.getDefaultPersonalName(this.gender)
  }

  get full (): string {
    return `${this.day} ${this.personal} ${this.family.renderPatronym()}`
  }

  address (title: string): string {
    return `${title} ${this.personal}`
  }

  toObject (titles: TitleDict = {}): IgboPersonalNameData {
    return {
      ...super.toObject(titles),
      day: this.day
    }
  }

  static getDefaultPersonalName (gender: Gender): string {
    return super.getDefaultPersonalName(gender, {
      Feminine: 'Béké',
      Masculine: 'Vaniclei'
    })
  }

  static getDefaultDayName (gender: Gender): string {
    return super.getDefaultPersonalName(gender, {
      Feminine: 'Ekemma',
      Masculine: 'Okoeke'
    })
  }

  static async generate (
    data?: Partial<IgboPersonalNameParams>,
    context?: IgboBirthContext
  ): Promise<IgboPersonalName[]> {
    const family = context?.family ?? await IgboFamily.generate(data?.birth?.family)
    const birth = context ?? new IgboBirthContext(data?.birth, family)
    const gender = data?.gender ?? selectRandomGender()
    const personal = data?.personal ?? await drawStr(
      IgboPersonalNameTables[gender],
      IgboPersonalName.getDefaultPersonalName(gender),
    )

    const day = await drawStr(
      IgboPersonalNameTables.WeekdayNames[birth.igboWeekday][gender],
      IgboPersonalName.getDefaultDayName(gender)
    )

    return [new IgboPersonalName({ gender, personal, day }, birth)]
  }
}

export default IgboPersonalName
