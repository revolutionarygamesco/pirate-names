import { selectRandomElement } from '@revolutionarygamesco/common'
import { drawStr } from '@revolutionarygamesco/common-foundryvtt'
import { type Weekday } from '../../types/enums/weekday.ts'
import { selectRandomGender, type Gender } from '../../types/enums/gender.ts'
import Family from '../families/base.ts'
import BirthContext from '../birth/base.ts'
import PersonalName, { type PersonalNameData, type PersonalNameParams, type TitleDict } from './base.ts'
import getRollTableUUID from '../../get-rolltable-uuid.ts'

interface FonPersonalNameCore {
  day: string
}

export interface FonPersonalNameParams extends PersonalNameParams, FonPersonalNameCore {}
export interface FonPersonalNameData extends PersonalNameData, FonPersonalNameCore {}

export const FonPersonalNameTables = {
  Feminine: getRollTableUUID('dMeVOYZnSWMjyaZy'),
  Masculine: getRollTableUUID('Refe5IIGXrv0VzmH')
}

const weekdayNames: Record<Weekday, Record<Gender, string[]>> = {
  Sunday: {
    Masculine: ['Kossi', 'Kouessi', 'Kwasi'],
    Feminine: ['Kossiwa', 'Kouessiba', 'Kossivi']
  },
  Monday: {
    Masculine: ['Kodjo', 'Codjo', 'Kudzo'],
    Feminine: ['Adjo', 'Adjovi', 'Adjowa']
  },
  Tuesday: {
    Masculine: ['Komlan', 'Kobla', 'Kwabla'],
    Feminine: ['Abla', 'Ablavi', 'Ablawa']
  },
  Wednesday: {
    Masculine: ['Kokou', 'Koku', 'Kwaku'],
    Feminine: ['Akou', 'Akouvi', 'Akwa']
  },
  Thursday: {
    Masculine: ['Yao', 'Yawo', 'Yaovi'],
    Feminine: ['Yawa', 'Yaa', 'Ayaba']
  },
  Friday: {
    Masculine: ['Kofi', 'Koffi', 'Kofivi'],
    Feminine: ['Afi', 'Afiavi', 'Afiwa']
  },
  Saturday: {
    Masculine: ['Komi', 'Kwami', 'Komivi'],
    Feminine: ['Ami', 'Ama', 'Amivi']
  }
}

const circumstanceNames: Record<string, Record<Gender, string>> = {
  road: { Masculine: 'Alidjinou', Feminine: 'Alihossi' },
  war: { Masculine: 'Ahouansou', Feminine: 'Ahouansi' },
  dry: { Masculine: 'Zossou', Feminine: 'Zossi' },
  day: { Masculine: 'Houessou', Feminine: 'Houechi' },
  night: { Masculine: 'Zannou', Feminine: 'Zansi' },
  water: { Masculine: 'Todjinou', Feminine: 'Tossi' },
  conflict: { Masculine: 'Abegnonhou', Feminine: 'Abegnonhou' },
  market: { Masculine: 'Asigbi', Feminine: 'Asigbi' },
  facedown: { Masculine: 'Lumo', Feminine: 'Lumo' }
}

class FonPersonalName extends PersonalName {
  day: string

  constructor (
    data?: Partial<FonPersonalNameParams>,
    context?: BirthContext
  ) {
    super(data, context)
    const family = context?.family ?? new Family({ ...data?.birth?.family, nationality: 'Fon' })
    this.birth = context ?? new BirthContext(data?.birth, family)
    this.nationality = 'Fon'
    this.day = data?.day ?? FonPersonalName.selectRandomDayName(this.birth.weekday, this.gender)
    this.personal = data?.personal ?? FonPersonalName.getDefaultPersonalName(this.gender)
  }

  get circumstanceName (): string | null {
    if (this.birth.twin === 1) return 'Sagbo'
    if (this.birth.twin === 2) return 'Zinsou'
    if (this.birth.special && this.birth.special in circumstanceNames) {
      return circumstanceNames[this.birth.special][this.gender]
    }
    return null
  }

  get full (): string {
    const c = this.circumstanceName
    const names = [this.day]
    if (c) names.push(c)
    names.push(this.personal)
    return names.join(' ')
  }

  toObject (titles: TitleDict ={}): FonPersonalNameData {
    return {
      ...super.toObject(titles),
      day: this.day
    }
  }

  static getDefaultPersonalName (gender: Gender): string {
    return super.getDefaultPersonalName(gender, {
      Feminine: 'Hounsi',
      Masculine: 'Hounsou'
    })
  }

  static selectRandomDayName (day: Weekday, gender: Gender): string {
    return selectRandomElement(weekdayNames[day][gender])
  }

  static async generate (
    data?: Partial<FonPersonalNameParams>,
    context?: BirthContext
  ): Promise<FonPersonalName[]> {
    const family = context?.family ?? new Family({ ...data?.birth?.family, nationality: 'Fon' })
    const birth = context ?? new BirthContext(data?.birth, family)
    const gender = data?.gender ?? selectRandomGender()

    const personal = await drawStr(
      FonPersonalNameTables[gender],
      FonPersonalName.getDefaultPersonalName(gender)
    )
    const day = FonPersonalName.selectRandomDayName(birth.weekday, gender)
    return [new FonPersonalName({ gender, personal, day }, birth)]
  }
}

export default FonPersonalName
