import { drawStr } from '@revolutionarygamesco/common-foundryvtt'
import { selectRandomGender } from '../../enums/gender.ts'
import getRollTableUUID from '../../get-rolltable-uuid.ts'
import PersonalName, { type PersonalNameData } from './base.ts'

export interface KalinagoPersonalNameData extends PersonalNameData {
  father: string
}

export const KalinagoPersonalNameTables: Record<string, string> = {
  Feminine: getRollTableUUID('yczM4bZ4HPALuC36'),
  Masculine: getRollTableUUID('3NtXeNj9VaeJzfxr')
}

class KalinagoPersonalName extends PersonalName {
  father: string

  constructor (data?: Partial<KalinagoPersonalNameData>) {
    super(data)
    this.nationality = 'Kalinago'
    this.personal = data?.personal ?? (this.gender === 'Masculine' ? 'Wukeri' : 'Eliama')
    this.father = data?.father ?? 'Wukeri'
    this.full = data?.full ?? `${this.personal} ${this.father}`
  }

  toObject (): KalinagoPersonalNameData {
    return {
      nationality: this.nationality,
      gender: this.gender,
      full: this.full,
      personal: this.personal,
      father: this.father
    }
  }

  static async generate (
    data?: Partial<KalinagoPersonalNameData>
  ): Promise<KalinagoPersonalName[]> {
    const gender = data?.gender ?? selectRandomGender()
    const personal = await drawStr(KalinagoPersonalNameTables[gender], gender === 'Masculine' ? 'Wukeri' : 'Eliama')
    const father = await drawStr(KalinagoPersonalNameTables.Masculine, 'Wukeri')
    const full = `${personal} ${father}`
    return [new KalinagoPersonalName({ gender, personal, father, full })]
  }
}

export default KalinagoPersonalName
