import { drawStr } from '@revolutionarygamesco/common-foundryvtt'
import { selectRandomGender, type Gender } from '../../types/enums/gender.ts'
import { type Nationality } from '../../types/enums/nationality.ts'
import getRollTableUUID from '../../get-rolltable-uuid.ts'
import BirthContext, { type BirthContextData } from '../birth/base.ts'
import KalinagoFamily, { KalinagoMasculineNames, type KalinagoFamilyData } from '../families/kalinago.ts'
import PersonalName, { type PersonalNameData, type PersonalNameParams } from './base.ts'

export interface KalinagoPersonalNameParams extends PersonalNameParams<BirthContextData<KalinagoFamilyData>> {}
export interface KalinagoPersonalNameData extends PersonalNameData<BirthContextData<KalinagoFamilyData>> {}

export const KalinagoPersonalNameTables: Record<string, string> = {
  Feminine: getRollTableUUID('yczM4bZ4HPALuC36'),
  Masculine: KalinagoMasculineNames
}

class KalinagoPersonalName extends PersonalName<KalinagoFamily, BirthContext<KalinagoFamily>> {
  protected static override nationality: Nationality = 'Kalinago'
  protected static override familyClass = KalinagoFamily

  constructor (
    data?: Partial<KalinagoPersonalNameParams>,
    context?: BirthContext<KalinagoFamily>
  ) {
    super(data, context)
    this.personal = data?.personal ?? KalinagoPersonalName.getDefaultPersonalName(this.gender)
  }

  get full (): string {
    return `${this.personal} ${this.family.renderPatronym()}`
  }

  static getDefaultPersonalName (gender: Gender): string {
    return super.getDefaultPersonalName(gender, {
      Feminine: 'Eliama',
      Masculine: 'Wukeri'
    })
  }

  static async generate (
    data?: Partial<KalinagoPersonalNameParams>,
    context?: BirthContext<KalinagoFamily>
  ): Promise<KalinagoPersonalName[]> {
    const birth = context ?? await KalinagoPersonalName.generateBirth(data?.birth) as BirthContext<KalinagoFamily>
    const gender = data?.gender ?? selectRandomGender()
    const personal = await drawStr(
      KalinagoPersonalNameTables[gender],
      KalinagoPersonalName.getDefaultPersonalName(gender)
    )
    return [new KalinagoPersonalName({ gender, personal }, birth)]
  }
}

export default KalinagoPersonalName
