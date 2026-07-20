import { getObjectRecord, isString, chance } from '@revolutionarygamesco/common'
import { drawStr } from '@revolutionarygamesco/common-foundryvtt'
import { selectRandomGender, type Gender } from '../../enums/gender.ts'
import PersonalName, { type PersonalNameData } from './base.ts'
import getRollTableUUID from '../../get-rolltable-uuid.ts'

export interface DutchPersonalNameSurname extends PersonalNameData {
  family: string
}

const hasSurname = (candidate: unknown): candidate is DutchPersonalNameSurname => {
  const obj = getObjectRecord(candidate)
  if (!obj) return false
  return isString(obj.family)
}

export interface DutchPersonalNamePatronymic extends PersonalNameData {
  father: string
}

const hasFather = (candidate: unknown): candidate is DutchPersonalNamePatronymic => {
  const obj = getObjectRecord(candidate)
  if (!obj) return false
  return isString(obj.father)
}

export type DutchPersonalNameData = DutchPersonalNameSurname | DutchPersonalNamePatronymic

export const DutchPersonalNameTables: Record<string, string> = {
  Feminine: getRollTableUUID('71DRh4LK1omoYTNV'),
  Masculine: getRollTableUUID('2uRlTQ7a2dthSDJ1'),
  Surnames: getRollTableUUID('txdQSSgEHJlW9Iax')
}

class DutchPersonalName extends PersonalName {
  family?: string
  father?: string

  constructor (data?: Partial<DutchPersonalNameData>) {
    super(data)
    this.nationality = 'Dutch'
    this.personal = data?.personal ?? (this.gender === 'Masculine' ? 'Jan' : 'Maria')

    if (hasSurname(data)) this.family = data.family
    if (hasFather(data)) this.father = data.father

    if (!this.family && !this.father) this.family = 'van den Berg'

    this.full = data?.full ?? this.compose()
  }

  compose (): string {
    if (this.family) {
      return `${this.personal} ${this.family}`
    } else if (this.father && this.gender) {
      return `${this.personal} ${DutchPersonalName.renderPatronymic(this.father, this.gender)}`
    } else {
      return this.personal
    }
  }

  toObject (): DutchPersonalNameData {
    const base: PersonalNameData = {
      nationality: this.nationality,
      gender: this.gender,
      full: this.full,
      personal: this.personal
    }

    if (this.family) {
      return {
        ...base,
        family: this.family
      } as DutchPersonalNameSurname
    } else if (this.father) {
      return {
        ...base,
        father: this.father
      } as DutchPersonalNamePatronymic
    } else {
      return {
        ...base,
        family: ''
      } as DutchPersonalNameSurname
    }
  }

  static renderPatronymic (father: string, gender: Gender) {
    const suffix = gender === 'Feminine' ? 'dochter' : 'zoon'
    return `${father}s${suffix}`
  }

  static async generate (
    data?: Partial<DutchPersonalNameData>
  ): Promise<DutchPersonalName> {
    const gender = data?.gender ?? selectRandomGender()
    const personal = await drawStr(DutchPersonalNameTables[gender], gender === 'Masculine' ? 'Jan' : 'Maria')

    const usePatronymic = hasSurname(data) ? false : hasFather(data) ? true : chance(1, 2)
    if (usePatronymic) {
      const father = hasFather(data) ? data.father : await drawStr(DutchPersonalNameTables.Masculine, 'Jan')
      const patronymic = DutchPersonalName.renderPatronymic(father, gender)
      return new DutchPersonalName({ gender, personal, father, full: `${personal} ${patronymic}` })
    } else {
      const family = hasSurname(data) ? data.family : await drawStr(DutchPersonalNameTables.Surnames, 'Jansen')
      return new DutchPersonalName({ gender, personal, family, full: `${personal} ${family}` })
    }
  }
}

export default DutchPersonalName
