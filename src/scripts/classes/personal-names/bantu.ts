import { selectRandomBetween, isString } from '@revolutionarygamesco/common'
import { getObjectRecord } from '@revolutionarygamesco/common/testing'
import { drawStr } from '@revolutionarygamesco/common-foundryvtt'
import { selectRandomGender, type Gender } from '../../types/enums/gender.ts'
import getRollTableUUID from '../../get-rolltable-uuid.ts'
import BirthContext, {type BirthContextData} from '../birth/base.ts'
import BantuFamily, { Nkumbu, type BantuFamilyData } from '../families/bantu.ts'
import PersonalName, { type PersonalNameData, type PersonalNameParams, type TitleDict } from './base.ts'

interface BantuChristianCore {
  santu: string
  initiation?: never
}

interface BantuTraditionalCore {
  santu?: never
  initiation: string
}

interface BantuNeitherCore {
  santu?: never
  initiation?: never
}

type BantuCore = BantuChristianCore | BantuTraditionalCore | BantuNeitherCore
export type BantuPersonalNameParams = Partial<PersonalNameParams> & BantuCore

interface BantuChristianData extends PersonalNameData<BirthContextData<BantuFamilyData>>, BantuChristianCore {}
interface BantuTraditionalData extends PersonalNameData<BirthContextData<BantuFamilyData>>, BantuTraditionalCore {}
interface BantuNeitherData extends PersonalNameData<BirthContextData<BantuFamilyData>>, BantuNeitherCore {}
export type BantuPersonalNameData = BantuChristianData | BantuTraditionalData | BantuNeitherData

const isChristianParams = (candidate: unknown): candidate is BantuChristianCore => {
  const obj = getObjectRecord(candidate)
  if (!obj) return false
  return isString(obj.santu)
}

const isTraditionalParams = (candidate: unknown): candidate is BantuTraditionalCore => {
  const obj = getObjectRecord(candidate)
  if (!obj) return false
  return isString(obj.initiation)
}


export const BantuPersonalNameTables = {
  Init: {
    Masculine: getRollTableUUID('P1mOexZPE3QmASEw'),
    Feminine: getRollTableUUID('zk8wGuZMePWe4DaL')
  },
  Santu: getRollTableUUID('sHJcHKv4AL1xdrkT'),
  Nkumbu
}

class BantuPersonalName extends PersonalName<BantuFamily, BirthContext<BantuFamily>> {
  santu: string | null
  initiation: string | null

  constructor (
    data?: BantuPersonalNameParams,
    context?: BirthContext<BantuFamily>
  ) {
    super(data, context)
    this.nationality = 'Bantu'
    const family = context?.family ?? new BantuFamily({ ...data?.birth?.family, nationality: 'Bantu' })
    this.birth = context ?? new BirthContext(data?.birth, family)
    this.personal = data?.personal ?? 'Zola'
    this.santu = isChristianParams(data) ? data.santu : null
    this.initiation = isTraditionalParams(data) ? data.initiation : null
  }

  get full (): string {
    const names: string[] = []

    if (this.santu) names.push(this.santu)
    names.push(this.personal)
    names.push(this.family.renderPatronym())
    if (this.initiation) names.push(this.initiation)

    return names.join(' ')
  }

  private toBaseObject (forms: TitleDict = {}): PersonalNameData<BirthContextData<BantuFamilyData>> {
    return {
      ...super.toObject(forms),
      birth: this.birth
    }
  }

  toObject (forms: TitleDict = {}): BantuPersonalNameData {
    if (this.santu) return this.toChristianObject(forms)
    if (this.initiation) return this.toTraditionalObject(forms)
    return this.toBaseObject(forms)
  }

  toChristianObject (forms: TitleDict = {}): BantuChristianData {
    return {
      ...this.toBaseObject(forms),
      santu: this.santu ?? 'Ntoni'
    }
  }

  toTraditionalObject (forms: TitleDict = {}): BantuTraditionalData {
    return {
      ...this.toBaseObject(forms),
      initiation: this.initiation ?? BantuPersonalName.getDefaultInitiationlName(this.gender)
    }
  }

  static selectRandomBackground (): 'Christian' | 'Initiated' | null {
    const r = selectRandomBetween(1, 20)
    if (r < 11) return 'Christian'
    if (r > 15) return 'Initiated'
    return null
  }

  static getDefaultInitiationlName (gender: Gender): string {
    return super.getDefaultPersonalName(gender, {
      Feminine: 'Lubondo',
      Masculine: 'Nsumbu'
    })
  }

  static async generate (
    data?: BantuPersonalNameParams,
    context?: BirthContext<BantuFamily>
  ): Promise<BantuPersonalName[]> {
    const family = context?.family ?? await BantuFamily.generate(data?.birth?.family)
    const birth = context ?? new BirthContext(data?.birth, family)
    const background = BantuPersonalName.selectRandomBackground()
    const gender = data?.gender ?? selectRandomGender()
    const personal = data?.personal ?? await drawStr(BantuPersonalNameTables.Nkumbu, 'Zola')

    let extra: BantuCore = {}
    if (background === 'Christian') {
      extra = { santu: await drawStr(BantuPersonalNameTables.Santu, 'Ntoni') }
    }
    if (background === 'Initiated') {
      extra = {
        initiation: await drawStr(
          BantuPersonalNameTables.Init[gender],
          BantuPersonalName.getDefaultInitiationlName(gender)
        )
      }
    }

    const generated: BantuPersonalNameParams = { gender, personal, ...extra }
    return [new BantuPersonalName(generated, birth)]
  }
}

export default BantuPersonalName
