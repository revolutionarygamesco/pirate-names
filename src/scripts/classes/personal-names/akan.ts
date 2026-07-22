import { selectRandomElement}  from '@revolutionarygamesco/common'
import { drawStr } from '@revolutionarygamesco/common-foundryvtt'
import { selectRandomGender, type Gender } from '../../types/enums/gender.ts'
import getRollTableUUID from '../../get-rolltable-uuid.ts'
import AkanFamily, { type AkanFamilyData } from '../families/akan.ts'
import BirthContext from '../birth/base.ts'
import PersonalName, { type PersonalNameData } from './base.ts'

export interface AkanPersonalNameData extends PersonalNameData {
  family: AkanFamilyData
  order: string
  circumstance: string | null
  twin: string | null
}

export const AkanPersonalNameTables = {
  WeekdayNames: {
    Sunday: {
      Masculine: getRollTableUUID('F4PzbpArSznQTDZz'),
      Feminine: getRollTableUUID('d6TMjqiTUF3jZzRz')
    },
    Monday: {
      Masculine: getRollTableUUID('o9m52eiGNLe2Tv6X'),
      Feminine: getRollTableUUID('5ikjS0zIRZkJqgbR')
    },
    Tuesday: {
      Masculine: getRollTableUUID('kz359Z2CPweeAYAM'),
      Feminine: getRollTableUUID('ZoTYUnGdgqkAHoAL')
    },
    Wednesday: {
      Masculine: getRollTableUUID('z9IfTjKaGmJ25ey1'),
      Feminine: getRollTableUUID('BviGWCXkoM6NFsmg')
    },
    Thursday: {
      Masculine: getRollTableUUID('uL1wjWWBDnVTHxB0'),
      Feminine: getRollTableUUID('LHTQniTTWtxvfJDF')
    },
    Friday: {
      Masculine: getRollTableUUID('sN51ZjYJmeJ9zbku'),
      Feminine: getRollTableUUID('NxvZ04Dn2cjkamMl')
    },
    Saturday: {
      Masculine: getRollTableUUID('6bVDNhiN1uXUhFEA'),
      Feminine: getRollTableUUID('Zyx3S4CaZcaRhZJ5')
    }
  }
}

export const birthOrderNames: Record<string, Record<Gender, string>> = {
  '1': { Masculine: 'Píèsíe', Feminine: 'Píèsíe' },
  '2': { Masculine: 'Mǎnu', Feminine: 'Máanu' },
  '3': { Masculine: 'Meńsã́', Feminine: 'Mánsã' },
  '4': { Masculine: 'Anan', Feminine: 'Anané' },
  '5': { Masculine: 'Núm', Feminine: 'Anúm' },
  '6': { Masculine: 'Esĩã́', Feminine: 'Esĩã́' },
  '7': { Masculine: 'Esuón', Feminine: 'Nsṍwaa' },
  '8': { Masculine: 'Bótwe', Feminine: 'Bótwe' },
  '9': { Masculine: 'Ákron', Feminine: 'Nkróma' },
  '10': { Masculine: 'Badú', Feminine: 'Badúwaa' },
  '11': { Masculine: 'Dúkũ', Feminine: 'Dúkũ' },
  '12': { Masculine: 'Dúnu', Feminine: 'Dúnu' },
  '13': { Masculine: 'Adusa', Feminine: 'Adusa' },
  'last': { Masculine: 'Kaakyire', Feminine: 'Kaakyire' }
}

export const circumstanceNames: Record<string, Record<Gender, string>> = {
  sickly: { Masculine: 'Nyaméama', Feminine: 'Nyaméama' },
  field: { Masculine: 'Efum', Feminine: 'Efum' },
  war: { Masculine: 'Bekṍe', Feminine: 'Bedíàkṍ' },
  road: { Masculine: 'Ɔkwán', Feminine: 'Ɔkwán' },
  fatherless: { Masculine: 'Antó', Feminine: 'Antó' },
  happy: { Masculine: 'Afriyie', Feminine: 'Afriyie' },
  loves: { Masculine: 'Adofo', Feminine: 'Adofo' },
  great: { Masculine: 'Agyenim', Feminine: 'Agyenim' },
  forceful: { Masculine: 'Kumi', Feminine: 'Kumi' }
}

class AkanPersonalName extends PersonalName {
  family: AkanFamily
  twin: string | null

  constructor (
    data?: Partial<AkanPersonalNameData>,
    context?: Partial<{ family: AkanFamily, birth: BirthContext }>
  ) {
    super(data, context)
    this.nationality = 'Akan'
    this.family = context?.family ?? new AkanFamily()
    this.personal = data?.personal ?? (this.gender === 'Masculine' ? 'Kwasi' : 'Akosua')
    this.twin = data?.twin ?? this.generateTwinName()
  }

  get circumstance (): string | null {
    const { special } = this.birth
    if (special === null) return null
    if (special in circumstanceNames) return circumstanceNames[special][this.gender]
    return null
  }

  get order (): string {
    return AkanPersonalName.getBirthOrderName(this.birth.order, this.family.size, this.gender)
  }

  get full (): string {
    const names = [this.personal, this.order]
    if (this.twin) { names.push(this.twin) }
    else if (this.circumstance) { names.push(this.circumstance) }
    names.push(this.family.name)
    return names.join(' ')
  }

  address (title: string): string {
    return `${title} ${this.family.name}`
  }

  generateTwinName (): string | null {
    if (this.birth.twin === false) return null
    const ata = this.gender === 'Feminine' ? 'Ataa' : selectRandomElement(['Ata', 'Atta'])
    return this.birth.twin === 1
      ? `${ata} Panyin`
      : `${ata} ${selectRandomElement(['Kakraba', 'Kakra', 'Obuom'])}`
  }

  toObject (): AkanPersonalNameData {
    return {
      ...super.toObject(),
      family: this.family.toObject(),
      order: this.order,
      circumstance: this.circumstance,
      twin: this.twin,
      full: this.full
    }
  }

  static getBirthOrderName (
    order: number,
    size: number,
    gender: Gender
  ): string {
    if (order === 1) return birthOrderNames['1'][gender]
    if (order === size || order > 13) return birthOrderNames.last[gender]
    return birthOrderNames[order.toString()][gender]
  }

  static async generate (
    data?: Partial<AkanPersonalNameData>,
    context?: Partial<{ family: AkanFamily, birth: BirthContext }>
  ): Promise<AkanPersonalName[]> {
    const family = context?.family ?? await AkanFamily.generate()
    const birth = context?.birth ?? new BirthContext({}, family)
    const gender = data?.gender ?? selectRandomGender()
    const personal = await drawStr(AkanPersonalNameTables.WeekdayNames[birth.weekday][gender], gender === 'Feminine' ? 'Akosua' : 'Kwasi')
    return [new AkanPersonalName({
      gender,
      personal
    }, { family, birth })]
  }
}

export default AkanPersonalName
