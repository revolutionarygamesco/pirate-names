import { drawStr } from '@revolutionarygamesco/common-foundryvtt'
import { selectRandomGender } from '../../types/enums/gender.ts'
import getRollTableUUID from '../../get-rolltable-uuid.ts'
import BirthContext from '../birth/base.ts'
import YorubaFamily, { type YorubaFamilyData } from '../families/yoruba.ts'
import PersonalName, { type PersonalNameData } from './base.ts'
import {chance} from '@revolutionarygamesco/common'

export interface YorubaPersonalNameData extends PersonalNameData {
  family: YorubaFamilyData
  destiny: string | null
}

export const YorubaPersonalNameTables = {
  Feminine: getRollTableUUID('iKoVbfys8guccYIP'),
  Masculine: getRollTableUUID('0IPu47kGws4uELoZ'),
  Subjects: {
    Feminine: getRollTableUUID('kiI7ux4anupC510u'),
    Masculine: getRollTableUUID('Dt4kwodKkcmpmafX'),
    Inanimate: getRollTableUUID('wlROyhcSD9v2ePg0')
  },
  Predicates: {
    Animate: getRollTableUUID('U3WKD2JK3WAEUwz5'),
    Core: getRollTableUUID('aiO35Dj2wpXFkDAz')
  }
}

export const destinyNames: Record<string, string> = {
  facedown: 'Àjàyí',
  postterm: 'Óḿọpé',
  caul: 'Tàlàbí',
  motherless: 'Yeyerínsá',
  crier: 'Òní',
  breech: 'Ìgè',
  knotted: 'Dàda',
  unbroken: 'Òkẹ́',
  festival: 'Adesoro',
  egungun: 'Abegunde',
  orisa: 'Aborisádé',
  road: 'Abiọna',
  war: 'Abisógun',
  traveling: 'Bámìdelé',
  overseas: 'Tókúmbò'
}

class YorubaPersonalName extends PersonalName {
  constructor (
    data?: Partial<PersonalNameData>,
    context?: Partial<{ family: YorubaFamily, birth: BirthContext }>
  ) {
    super(data, context)
    this.nationality = 'Yoruba'
    this.personal = data?.personal ?? 'Abáyọmí'
  }

  get full (): string {
    return this.destiny
      ? `${this.destiny} ${this.personal}`
      : this.personal
  }

  get destiny (): string | null {
    if (this.birth.twin === 1) return 'Táíwò'
    if (this.birth.twin === 2) return 'Kẹ́hìndé'
    if (this.birth.special && this.birth.special in destinyNames) return destinyNames[this.birth.special]
    return null
  }

  toObject (): YorubaPersonalNameData {
    return {
      ...super.toObject(),
      family: this.family.toObject(),
      destiny: this.destiny
    }
  }

  static async generate (
    data?: Partial<PersonalNameData>
  ): Promise<YorubaPersonalName[]> {
    const family = new YorubaFamily(data?.family)
    const birth = new BirthContext(data?.birth, family)
    const gender = data?.gender ?? selectRandomGender()

    const useCommon = chance(1, 2)
    const useAnimateSubj = chance(1, 2)
    const useAnimatePred = useAnimateSubj ? chance(1, 2) : false

    if (useCommon) {
      const personal = await drawStr(YorubaPersonalNameTables[gender], 'Abáyọmí')
      return [new YorubaPersonalName({ gender, personal }, { family, birth })]
    } else if (useAnimateSubj) {
      const predTable = useAnimatePred
        ? YorubaPersonalNameTables.Predicates.Animate
        : YorubaPersonalNameTables.Predicates.Core
      const subj = await drawStr(YorubaPersonalNameTables.Subjects[gender], gender === 'Feminine' ? 'Ọ̀ṣun' : 'Ṣàngó')
      const pred = await drawStr(predTable, 'yẹmí')
      return [new YorubaPersonalName({ gender, personal: subj + pred }, { family, birth })]
    } else {
      const subj = await drawStr(YorubaPersonalNameTables.Subjects.Inanimate, 'Adé')
      const pred = await drawStr(YorubaPersonalNameTables.Predicates.Core, 'yẹmí')
      return [new YorubaPersonalName({ gender, personal: subj + pred }, { family, birth })]
    }
  }
}

export default YorubaPersonalName
