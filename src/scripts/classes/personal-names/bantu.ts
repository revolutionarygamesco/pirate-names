import { selectRandomBetween } from '@revolutionarygamesco/common'
import { drawStr } from '@revolutionarygamesco/common-foundryvtt'
import { selectRandomGender } from '../../enums/gender.ts'
import getRollTableUUID from '../../get-rolltable-uuid.ts'
import PersonalName, { type PersonalNameData } from './base.ts'

type BantuSpecialNameType = 'Christian' | 'Initiated' | null

export interface BantuPersonalNameData extends PersonalNameData {
  father: string
  special: BantuSpecialNameType
}

export const BantuPersonalNameTables = {
  Init: {
    Masculine: getRollTableUUID('P1mOexZPE3QmASEw'),
    Feminine: getRollTableUUID('zk8wGuZMePWe4DaL')
  },
  Santu: getRollTableUUID('sHJcHKv4AL1xdrkT'),
  Nkumbu: getRollTableUUID('FseoFZOSLwHCNy4W')
}

class BantuPersonalName extends PersonalName {
  father: string
  special: BantuSpecialNameType

  constructor (data?: Partial<BantuPersonalNameData>) {
    super(data)
    this.nationality = 'Bantu'
    this.personal = data?.personal ?? 'Zola'
    this.father = data?.father ?? 'Zola'
    this.special = ['Christian', 'Initiated'].includes(data?.special ?? '')
      ? data!.special as BantuSpecialNameType
      : null
    this.full = data?.full ?? `${this.personal} a ${this.father}`
  }

  toObject (): BantuPersonalNameData {
    return {
      nationality: this.nationality,
      gender: this.gender,
      full: this.full,
      personal: this.personal,
      father: this.father,
      special: this.special
    }
  }

  static selectRandomSpecialNameType (): BantuSpecialNameType {
    const r = selectRandomBetween(1, 20)
    if (r < 11) return 'Christian'
    if (r > 15) return 'Initiated'
    return null
  }

  static async generate (
    data?: Partial<BantuPersonalNameData>
  ): Promise<BantuPersonalName[]> {
    const generated: BantuPersonalNameData = {
      nationality: 'Bantu',
      gender: data?.gender ?? selectRandomGender(),
      personal: data?.personal ?? await drawStr(BantuPersonalNameTables.Nkumbu, 'Zola'),
      father: data?.father ?? await drawStr(BantuPersonalNameTables.Nkumbu, 'Zola'),
      full: '',
      special: data?.special === undefined ? null : data.special
    }

    if (generated.special === 'Christian') {
      const santu = await drawStr(BantuPersonalNameTables.Santu, 'Ntoni')
      generated.full = `${santu} ${generated.personal} a ${generated.father}`
    } else if (generated.special === 'Initiated') {
      const fallback = generated.gender === 'Masculine' ? 'Nsumbu' : 'Lubondo'
      const initiated = await drawStr(BantuPersonalNameTables.Init[generated.gender], fallback)
      generated.full = `${generated.personal} a ${generated.father} ${initiated}`
    } else {
      generated.full = `${generated.personal} a ${generated.father}`
    }

    return [new BantuPersonalName(generated)]
  }
}

export default BantuPersonalName
