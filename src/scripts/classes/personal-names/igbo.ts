import { makeEnum } from '@revolutionarygamesco/common'
import { drawStr, drawDescription } from '@revolutionarygamesco/common-foundryvtt'
import { selectRandomGender } from '../../enums/gender.ts'
import getRollTableUUID from '../../get-rolltable-uuid.ts'
import IgboFamily, { IgboMasculineNames } from '../families/igbo.ts'
import PersonalName, { type PersonalNameData } from './base.ts'

const igboWeekdays = ['Eke', 'Oye', 'Afor', 'Nkwo'] as const
export type IgboWeekday = typeof igboWeekdays[number]
export const {
  guard: isIgboWeekday,
  randomizer: selectRandomIgboWeekday
} = makeEnum(igboWeekdays)

export interface IgboPersonalNameData extends PersonalNameData {
  weekday: IgboWeekday
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
  weekday: IgboWeekday

  constructor (data?: Partial<IgboPersonalNameData>) {
    super(data)
    this.nationality = 'Igbo'
    this.personal = data?.personal ?? (this.gender === 'Masculine' ? 'Ougeromba' : 'Houanizei')
    this.weekday = data?.weekday ?? selectRandomIgboWeekday()
    this.full = data?.full ?? this.personal
  }

  toObject (): IgboPersonalNameData {
    return {
      nationality: this.nationality,
      gender: this.gender,
      full: this.full,
      personal: this.personal,
      weekday: this.weekday
    }
  }

  static async generate (
    data?: Partial<IgboPersonalNameData>,
    context?: Partial<{ family: IgboFamily }>
  ): Promise<IgboPersonalName[]> {
    const family = context?.family ?? await IgboFamily.generate()
    const gender = data?.gender ?? selectRandomGender()
    const personal = data?.personal ?? await drawStr(IgboPersonalNameTables[gender], gender === 'Masculine' ? 'Ougeromba' : 'Houanizei')

    const weekday = data?.weekday ?? selectRandomIgboWeekday()
    const weekdayName = await drawDescription(IgboPersonalNameTables.WeekdayNames[weekday][gender])
    const full = weekdayName
      ? `${weekdayName} ${personal} ${family.renderPatronym()}`
      : `${personal} ${family.renderPatronym()}`

    return [new IgboPersonalName({ gender, personal, weekday, full })]
  }
}

export default IgboPersonalName
