import { drawStr } from '@revolutionarygamesco/common-foundryvtt'
import { selectRandomGender, type Gender } from '../../types/enums/gender.ts'
import getRollTableUUID from '../../get-rolltable-uuid.ts'
import BirthContext from '../birth/base.ts'
import Family from '../families/base.ts'
import PersonalName, { type PersonalNameData, type PersonalNameParams } from './base.ts'

export interface TainoPersonalNameParams extends PersonalNameParams {}
export interface TainoPersonalNameData extends PersonalNameData {}

export const TainoPersonalNameTables: Record<Gender, Record<'Subjects' | 'Modifiers', string>> = {
  Feminine: {
    Subjects: getRollTableUUID('fje6L4HNrI3U8uSQ'),
    Modifiers: getRollTableUUID('Gsjbg0iaYj0GzTxp')
  },
  Masculine: {
    Subjects: getRollTableUUID('S4wGCjjJcFyCvzbg'),
    Modifiers: getRollTableUUID('vZjPrjaJGCz68pll')
  }
}

class TainoPersonalName extends PersonalName {
  constructor (
    data?: Partial<PersonalNameParams>,
    context?: BirthContext
  ) {
    super(data, context)
    this.nationality = 'Taíno'
    const family = context?.family ?? new Family({ ...data?.birth?.family, nationality: 'Taíno' })
    this.birth = context ?? new BirthContext(data?.birth, family)
    this.personal = data?.personal ?? TainoPersonalName.getDefaultPersonalName(this.gender)
  }

  get full (): string {
    return this.personal
  }

  static concatWithElision (...strings: string[]): string {
    const [first, ...toAdd] = strings
    let c = first

    for (const str of toAdd) {
      const end = c.at(-1) ?? ''
      const s = str.startsWith(end) ? str.slice(1) : str
      c += s
    }

    return c
  }

  static getDefaultPersonalName (gender: Gender): string {
    return super.getDefaultPersonalName(gender, {
      Feminine: 'Anacaona',
      Masculine: 'Güeybaná'
    })
  }

  static async generate (
    data?: Partial<PersonalNameParams>,
    context?: BirthContext
  ): Promise<TainoPersonalName[]> {
    const family = context?.family ?? new Family({ ...data?.birth?.family, nationality: 'Taíno' })
    const birth = context ?? new BirthContext(data?.birth, family)
    const gender = data?.gender ?? selectRandomGender()
    if (data?.personal) return [new TainoPersonalName({ gender, personal: data.personal }, birth)]

    const subj = await drawStr(TainoPersonalNameTables[gender].Subjects, gender === 'Masculine' ? 'Güey' : 'Ana')
    const mod = await drawStr(TainoPersonalNameTables[gender].Modifiers, gender === 'Masculine' ? 'baná' : 'caona')
    const personal = TainoPersonalName.concatWithElision(subj, mod)
    return [new TainoPersonalName({ gender, personal }, birth)]
  }
}

export default TainoPersonalName
