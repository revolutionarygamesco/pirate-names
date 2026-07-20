import { selectRandomElement } from '@revolutionarygamesco/common'
import { drawStr } from '@revolutionarygamesco/common-foundryvtt'
import { selectRandomWeekday, type Weekday } from '../../enums/weekday.ts'
import { selectRandomGender, type Gender } from '../../enums/gender.ts'
import FamilyContext from '../family.ts'
import BirthContext from '../birth.ts'
import PersonalName, { type PersonalNameData } from './base.ts'
import getRollTableUUID from '../../get-rolltable-uuid.ts'

export interface FonPersonalNameData extends PersonalNameData {}

export const FonPersonalNameTables = {
  Feminine: getRollTableUUID('sTahknOtK9nAiwNb'),
  Masculine: getRollTableUUID('iwH36PdS8m7nQKN6')
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
  constructor (data?: Partial<FonPersonalNameData>) {
    super(data)
    this.nationality = 'Fon'
    this.personal = data?.personal ?? (this.gender === 'Masculine' ? 'Hounsou' : 'Hounsi')
    this.full = data?.full ?? this.personal
  }

  toObject (): FonPersonalNameData {
    return {
      nationality: this.nationality,
      gender: this.gender,
      full: this.full,
      personal: this.personal
    }
  }

  static async generate (
    data?: Partial<FonPersonalNameData>,
    context?: Partial<{ family: FamilyContext, birth: BirthContext }>
  ): Promise<FonPersonalName[]> {
    const f = context?.family ?? new FamilyContext()
    const b = context?.birth ?? new BirthContext()
    const gender = data?.gender ?? selectRandomGender()

    const personal = await drawStr(FonPersonalNameTables[gender], gender === 'Feminine' ? 'Hounsou' : 'Hounsi')
    const weekday = b.weekday ?? selectRandomWeekday()
    const names = [selectRandomElement(weekdayNames[weekday][gender])]

    if (f.twin === 1) {
      names.push('Sagbo')
    } else if (f.twin === 2) {
      names.push('Zinsou')
    } else if (b.special && b.special in circumstanceNames) {
      names.push(circumstanceNames[b.special][gender])
    }

    names.push(personal)

    return [new FonPersonalName({ gender, personal, full: names.join(' ') })]
  }
}

export default FonPersonalName
