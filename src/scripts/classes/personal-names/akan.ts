import { selectRandomElement}  from '@revolutionarygamesco/common'
import { drawStr } from '@revolutionarygamesco/common-foundryvtt'
import { selectRandomGender, type Gender } from '../../types/enums/gender.ts'
import getRollTableUUID from '../../get-rolltable-uuid.ts'
import AkanFamily, { type AkanFamilyData } from '../families/akan.ts'
import BirthContext, { type BirthContextData } from '../birth/base.ts'
import PersonalName, { type PersonalNameParams, type PersonalNameData } from './base.ts'

interface AkanPersonalNamCore {
  order: string
  circumstance: string | null
  twin: string | null
}

export interface AkanPersonalNameParams extends PersonalNameParams, AkanPersonalNamCore {}
export interface AkanPersonalNameData extends PersonalNameData<BirthContextData<AkanFamilyData>>, AkanPersonalNamCore {}

export const AkanPersonalNameTables = {
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

class AkanPersonalName extends PersonalName<AkanFamily, BirthContext<AkanFamily>> {
  twin: string | null

  constructor (
    data?: Partial<AkanPersonalNameParams>,
    context?: BirthContext<AkanFamily>
  ) {
    super(data, context)
    this.nationality = 'Akan'
    const family = context?.family ?? new AkanFamily({ ...data?.birth?.family, nationality: 'Akan' })
    this.birth = context ?? new BirthContext(data?.birth, family)
    this.personal = data?.personal ?? AkanPersonalName.getDefaultPersonalName(this.gender)
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

  static getBirthOrderName (
    order: number,
    size: number,
    gender: Gender
  ): string {
    if (order === 1) return birthOrderNames['1'][gender]
    if (order === size || order > 13) return birthOrderNames.last[gender]
    return birthOrderNames[order.toString()][gender]
  }

  static getDefaultPersonalName (gender: Gender): string {
    return super.getDefaultPersonalName(gender, {
      Feminine: 'Akosua',
      Masculine: 'Kwasi'
    })
  }

  static async generate (
    data?: Partial<AkanPersonalNameParams>,
    context?: BirthContext<AkanFamily>
  ): Promise<AkanPersonalName[]> {
    const family = context?.family ?? await AkanFamily.generate(data?.birth?.family)
    const birth = context ?? new BirthContext<AkanFamily>(data?.birth, family)
    const gender = data?.gender ?? selectRandomGender()
    const personal = data?.personal ?? await drawStr(
      AkanPersonalNameTables[birth.weekday][gender],
      AkanPersonalName.getDefaultPersonalName(gender)
    )
    return [new AkanPersonalName({ gender, personal }, birth)]
  }
}

export default AkanPersonalName
