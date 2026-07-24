import { drawStr } from '@revolutionarygamesco/common-foundryvtt'
import { type Gender, selectRandomGender } from '../../types/enums/gender.ts'
import { type Nationality } from '../../types/enums/nationality.ts'
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

  protected static override nationality: Nationality = 'Igbo'
  protected static override familyClass = IgboFamily

  constructor (
    data?: Partial<IgboPersonalNameParams>,
    context?: IgboBirthContext
  ) {
    super(data, context)
    this.personal = data?.personal ?? IgboPersonalName.getDefaultPersonalName(this.gender)
    this.day = data?.day ?? IgboPersonalName.getDefaultPersonalName(this.gender)
  }

  protected override createBirth (data?: Partial<IgboBirthContextData>): IgboBirthContext {
    return new IgboBirthContext(data)
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

  protected static async generateBirth (
    data?: Partial<IgboBirthContextData>,
    family?: IgboFamily
  ): Promise<IgboBirthContext> {
    return new IgboBirthContext(data, family ?? await this.generateFamily(data?.family) as IgboFamily)
  }

  static async generate (
    data?: Partial<IgboPersonalNameParams>,
    context?: IgboBirthContext
  ): Promise<IgboPersonalName[]> {
    const birth = context ?? await IgboPersonalName.generateBirth(data?.birth)
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
