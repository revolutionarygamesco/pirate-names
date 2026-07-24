import { drawStr } from '@revolutionarygamesco/common-foundryvtt'
import { selectRandomGender, type Gender } from '../../types/enums/gender.ts'
import { type Nationality } from '../../types/enums/nationality.ts'
import getRollTableUUID from '../../get-rolltable-uuid.ts'
import BirthContext, { type BirthContextData } from '../birth/base.ts'
import WelshFamily, { WelshFamilyNames, type WelshFamilyData } from '../families/welsh.ts'
import PersonalName, { type PersonalNameData, type PersonalNameParams } from './base.ts'

export interface WelshPersonalNameParams extends PersonalNameParams<BirthContextData<WelshFamilyData>> {}
export interface WelshPersonalNameData extends PersonalNameData<BirthContextData<WelshFamilyData>> {}

export const WelshPersonalNameTables: Record<string, string> = {
  Feminine: getRollTableUUID('YK0pV8OsdQmwofY5'),
  Masculine: getRollTableUUID('hlWJ8ygoHMTiRtFD'),
  Surnames: WelshFamilyNames
}

class WelshPersonalName extends PersonalName<WelshFamily, BirthContext<WelshFamily>> {
  protected static override nationality: Nationality = 'Welsh'
  protected static override familyClass = WelshFamily

  constructor (
    data?: Partial<WelshPersonalNameParams>,
    context?: BirthContext<WelshFamily>
  ) {
    super(data, context)
    this.personal = data?.personal ?? WelshPersonalName.getDefaultPersonalName(this.gender)
  }

  get full (): string {
    return `${this.personal} ${this.family.name}`
  }

  address (title: string): string {
    return `${title} ${this.family.name}`
  }

  static getDefaultPersonalName (gender: Gender): string {
    return super.getDefaultPersonalName(gender, {
      Feminine: 'Mary',
      Masculine: 'William'
    })
  }

  static async generate (
    data?: Partial<WelshPersonalNameParams>,
    context?: BirthContext<WelshFamily>
  ): Promise<WelshPersonalName[]> {
    const birth = context ?? await WelshPersonalName.generateBirth(data?.birth) as BirthContext<WelshFamily>
    const gender = data?.gender ?? selectRandomGender()
    const personal = await drawStr(
      WelshPersonalNameTables[gender],
      WelshPersonalName.getDefaultPersonalName(gender)
    )

    return [new WelshPersonalName({ gender, personal }, birth)]
  }
}

export default WelshPersonalName
