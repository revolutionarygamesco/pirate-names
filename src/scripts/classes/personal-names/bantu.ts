import { selectRandomBetween } from '@revolutionarygamesco/common'
import { drawStr } from '@revolutionarygamesco/common-foundryvtt'
import { selectRandomGender } from '../../types/enums/gender.ts'
import getRollTableUUID from '../../get-rolltable-uuid.ts'
import BirthContext from '../birth/base.ts'
import BantuFamily, { Nkumbu, type BantuFamilyData } from '../families/bantu.ts'
import PersonalName, { type PersonalNameData } from './base.ts'

export interface BantuPersonalNameData extends PersonalNameData {
  family: BantuFamilyData
  santu?: string
  initiation?: string
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
  family: BantuFamily
  santu: string | null
  initiation: string | null

  constructor (
    data?: Partial<BantuPersonalNameData>,
    context?: Partial<{ family: BantuFamily, birth: BirthContext }>
  ) {
    super(data, context)
    this.nationality = 'Bantu'
    this.family = context?.family ?? new BantuFamily(data?.family)
    this.birth = context?.birth ?? new BirthContext(data?.birth)
    this.personal = data?.personal ?? 'Zola'
    this.santu = data?.santu ?? null
    this.initiation = data?.initiation ?? null
  }

  get full (): string {
    const names: string[] = []

    if (this.santu) names.push(this.santu)
    names.push(this.personal)
    names.push(this.family.renderPatronym())
    if (this.initiation) names.push(this.initiation)

    return names.join(' ')
  }

  toObject (): BantuPersonalNameData {
    const obj: BantuPersonalNameData = {
      nationality: this.nationality,
      gender: this.gender,
      family: this.family.toObject(),
      birth: this.birth.toObject(),
      full: this.full,
      personal: this.personal
    }

    if (this.santu) obj.santu = this.santu
    if (this.initiation) obj.initiation = this.initiation
    return obj
  }

  static selectRandomBackground (): 'Christian' | 'Initiated' | null {
    const r = selectRandomBetween(1, 20)
    if (r < 11) return 'Christian'
    if (r > 15) return 'Initiated'
    return null
  }

  static async generate (
    data?: Partial<BantuPersonalNameData>,
    context?: Partial<{ family: BantuFamily, birth: BirthContext }>
  ): Promise<BantuPersonalName[]> {
    const family = context?.family ?? await BantuFamily.generate()
    const birth = context?.birth ?? new BirthContext(data?.birth, family)
    const background = BantuPersonalName.selectRandomBackground()
    const gender = data?.gender ?? selectRandomGender()
    const personal = data?.personal ?? await drawStr(BantuPersonalNameTables.Nkumbu, 'Zola')

    const generated: Partial<BantuPersonalNameData> = { gender, personal }
    if (background === 'Christian') generated.santu = await drawStr(BantuPersonalNameTables.Santu, 'Ntoni')
    if (background === 'Initiated') {
      const fallback = generated.gender === 'Masculine' ? 'Nsumbu' : 'Lubondo'
      await drawStr(BantuPersonalNameTables.Init[gender], fallback)
    }

    return [new BantuPersonalName(generated, { family, birth })]
  }
}

export default BantuPersonalName
