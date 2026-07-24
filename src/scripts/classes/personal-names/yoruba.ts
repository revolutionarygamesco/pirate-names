import { chance } from '@revolutionarygamesco/common'
import { drawStr } from '@revolutionarygamesco/common-foundryvtt'
import { selectRandomGender } from '../../types/enums/gender.ts'
import { type Nationality } from '../../types/enums/nationality.ts'
import getRollTableUUID from '../../get-rolltable-uuid.ts'
import YorubaBirthContext, { type YorubaBirthContextData } from '../birth/yoruba.ts'
import YorubaFamily from '../families/yoruba.ts'
import PersonalName, { type PersonalNameData, type PersonalNameParams, type TitleDict } from './base.ts'

interface YorubaPersonalNameCore {
  destiny: string | null
}

export interface YorubaPersonalNameParams extends PersonalNameParams<YorubaBirthContextData>, YorubaPersonalNameCore {}
export interface YorubaPersonalNameData extends PersonalNameData<YorubaBirthContextData>, YorubaPersonalNameCore {}

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

class YorubaPersonalName extends PersonalName<YorubaFamily, YorubaBirthContext> {
  protected static override nationality: Nationality = 'Yoruba'
  protected static override familyClass = YorubaFamily

  constructor (
    data?: Partial<YorubaPersonalNameParams>,
    context?:YorubaBirthContext
  ) {
    super(data, context)
    this.personal = data?.personal ?? YorubaPersonalName.getDefaultPersonalName()
  }

  protected override createBirth(data?: Partial<YorubaBirthContextData>): YorubaBirthContext {
    return new YorubaBirthContext(data)
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

  toObject (titles: TitleDict = {}): YorubaPersonalNameData {
    return {
      ...super.toObject(titles),
      destiny: this.destiny
    }
  }

  static getDefaultPersonalName () {
    return 'Abáyọmí'
  }

  protected static async generateBirth (
    data?: Partial<YorubaBirthContextData>,
    family?: YorubaFamily
  ): Promise<YorubaBirthContext> {
    return new YorubaBirthContext(data, family ?? await this.generateFamily(data?.family) as YorubaFamily)
  }

  static async generate (
    data?: Partial<YorubaPersonalNameParams>,
    context?: YorubaBirthContext
  ): Promise<YorubaPersonalName[]> {
    const birth = context ?? await YorubaPersonalName.generateBirth(data?.birth)
    const gender = data?.gender ?? selectRandomGender()

    const useCommon = chance(1, 2)
    const useAnimateSubj = chance(1, 2)
    const useAnimatePred = useAnimateSubj ? chance(1, 2) : false

    if (useCommon) {
      const personal = await drawStr(YorubaPersonalNameTables[gender], 'Abáyọmí')
      return [new YorubaPersonalName({ gender, personal }, birth)]
    } else if (useAnimateSubj) {
      const predTable = useAnimatePred
        ? YorubaPersonalNameTables.Predicates.Animate
        : YorubaPersonalNameTables.Predicates.Core
      const subj = await drawStr(YorubaPersonalNameTables.Subjects[gender], gender === 'Feminine' ? 'Ọ̀ṣun' : 'Ṣàngó')
      const pred = await drawStr(predTable, 'yẹmí')
      return [new YorubaPersonalName({ gender, personal: subj + pred }, birth)]
    } else {
      const subj = await drawStr(YorubaPersonalNameTables.Subjects.Inanimate, 'Adé')
      const pred = await drawStr(YorubaPersonalNameTables.Predicates.Core, 'yẹmí')
      return [new YorubaPersonalName({ gender, personal: subj + pred }, birth)]
    }
  }
}

export default YorubaPersonalName
