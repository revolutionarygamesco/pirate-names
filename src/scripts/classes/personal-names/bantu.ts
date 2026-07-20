import { selectRandomBetween } from '@revolutionarygamesco/common'
import { drawStr } from '@revolutionarygamesco/common-foundryvtt'
import { selectRandomGender } from '../../enums/gender.ts'
import getRollTableUUID from '../../get-rolltable-uuid.ts'
import BantuFamily, { Nkumbu } from '../families/bantu.ts'
import PersonalName, { type PersonalNameData } from './base.ts'

type BantuSpecialNameType = 'Christian' | 'Initiated' | null

export interface BantuPersonalNameData extends PersonalNameData {
  special: BantuSpecialNameType
}

export const BantuPersonalNameTables = {
  Init: {
    Masculine: getRollTableUUID('P1mOexZPE3QmASEw'),
    Feminine: getRollTableUUID('zk8wGuZMePWe4DaL')
  },
  Santu: getRollTableUUID('sHJcHKv4AL1xdrkT'),
  Nkumbu
}

class BantuPersonalName extends PersonalName {
  special: BantuSpecialNameType

  constructor (data?: Partial<BantuPersonalNameData>) {
    super(data)
    this.nationality = 'Bantu'
    this.personal = data?.personal ?? 'Zola'
    this.special = ['Christian', 'Initiated'].includes(data?.special ?? '')
      ? data!.special as BantuSpecialNameType
      : null
    this.full = data?.full ?? `${this.personal}`
  }

  toObject (): BantuPersonalNameData {
    return {
      nationality: this.nationality,
      gender: this.gender,
      full: this.full,
      personal: this.personal,
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
    data?: Partial<BantuPersonalNameData>,
    context?: Partial<{ family: BantuFamily }>
  ): Promise<BantuPersonalName[]> {
    const family = context?.family ?? await BantuFamily.generate()
    const generated: BantuPersonalNameData = {
      nationality: 'Bantu',
      gender: data?.gender ?? selectRandomGender(),
      personal: data?.personal ?? await drawStr(BantuPersonalNameTables.Nkumbu, 'Zola'),
      full: '',
      special: data?.special === undefined
        ? BantuPersonalName.selectRandomSpecialNameType()
        : data.special
    }

    if (generated.special === 'Christian') {
      const santu = await drawStr(BantuPersonalNameTables.Santu, 'Ntoni')
      generated.full = `${santu} ${generated.personal} a ${family.patriarch}`
    } else if (generated.special === 'Initiated') {
      const fallback = generated.gender === 'Masculine' ? 'Nsumbu' : 'Lubondo'
      const initiated = await drawStr(BantuPersonalNameTables.Init[generated.gender], fallback)
      generated.full = `${generated.personal} a ${family.patriarch} ${initiated}`
    } else {
      generated.full = `${generated.personal} a ${family.patriarch}`
    }

    return [new BantuPersonalName(generated)]
  }
}

export default BantuPersonalName
