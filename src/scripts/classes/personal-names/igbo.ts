import { makeEnum } from '@revolutionarygamesco/common'
import { drawStr, drawDescription } from '@revolutionarygamesco/common-foundryvtt'
import { selectRandomGender } from '../../enums/gender.ts'
import getRollTableUUID from '../../get-rolltable-uuid.ts'
import PersonalName, { type PersonalNameData } from './base.ts'

const igboWeekdays = ['Eke', 'Oye', 'Afor', 'Nkwo'] as const
export type IgboWeekday = typeof igboWeekdays[number]
export const {
  guard: isIgboWeekday,
  randomizer: selectRandomIgboWeekday
} = makeEnum(igboWeekdays)

export interface IgboPersonalNameData extends PersonalNameData {
  father: string
  weekday: IgboWeekday
}

export const IgboPersonalNameTables = {
  Feminine: getRollTableUUID('zZu80jKYxdX3WrSa'),
  Masculine: getRollTableUUID('suEpqqiTqsZc1v0v'),
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
  father: string
  weekday: IgboWeekday

  constructor (data?: Partial<IgboPersonalNameData>) {
    super(data)
    this.nationality = 'Igbo'
    this.personal = data?.personal ?? (this.gender === 'Masculine' ? 'Ougeromba' : 'Houanizei')
    this.father = data?.father ?? 'Ougeromba'
    this.weekday = data?.weekday ?? selectRandomIgboWeekday()
    this.full = data?.full ?? `${this.personal} ${this.father}`
  }

  toObject (): IgboPersonalNameData {
    return {
      nationality: this.nationality,
      gender: this.gender,
      full: this.full,
      personal: this.personal,
      father: this.father,
      weekday: this.weekday
    }
  }

  static async generate (
    data?: Partial<IgboPersonalNameData>
  ): Promise<IgboPersonalName[]> {
    const gender = data?.gender ?? selectRandomGender()
    const personal = data?.personal ?? await drawStr(IgboPersonalNameTables[gender], gender === 'Masculine' ? 'Ougeromba' : 'Houanizei')
    const father = data?.father ?? await drawStr(IgboPersonalNameTables.Masculine, 'Ougeromba')

    const weekday = data?.weekday ?? selectRandomIgboWeekday()
    const weekdayName = await drawDescription(IgboPersonalNameTables.WeekdayNames[weekday][gender])
    const full = weekdayName
      ? `${weekdayName} ${personal} ${father}`
      : `${personal} ${father}`

    return [new IgboPersonalName({ gender, personal, father, weekday, full })]
  }
}

export default IgboPersonalName
