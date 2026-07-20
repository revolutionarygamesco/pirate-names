import { selectRandomElement}  from '@revolutionarygamesco/common'
import { drawStr } from '@revolutionarygamesco/common-foundryvtt'
import { selectRandomGender, type Gender } from '../../enums/gender.ts'
import getRollTableUUID from '../../get-rolltable-uuid.ts'
import AkanFamily from '../families/akan.ts'
import BirthContext from '../birth.ts'
import PersonalName, { type PersonalNameData } from './base.ts'

export interface AkanPersonalNameData extends PersonalNameData {}

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

const birthOrderNames: Record<string, Record<Gender, string>> = {
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

const circumstanceNames: Record<string, Record<Gender, string>> = {
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
  constructor (data?: Partial<AkanPersonalNameData>) {
    super(data)
    this.nationality = 'Akan'
    this.personal = data?.personal ?? (this.gender === 'Masculine' ? 'Kwasi' : 'Akosua')
    this.full = data?.full ?? `${this.personal} Píèsíe`
  }

  toObject (): AkanPersonalNameData {
    return {
      nationality: this.nationality,
      gender: this.gender,
      full: this.full,
      personal: this.personal
    }
  }

  static async generate (
    data?: Partial<AkanPersonalNameData>,
    context?: Partial<{ family: AkanFamily, birth: BirthContext }>
  ): Promise<AkanPersonalName[]> {
    const f = context?.family ?? await AkanFamily.generate()
    const b = context?.birth ?? new BirthContext()
    const gender = data?.gender ?? selectRandomGender()

    const personal = await drawStr(AkanPersonalNameTables.WeekdayNames[b.weekday][gender], gender === 'Feminine' ? 'Akosua' : 'Kwasi')
    const names = [personal, birthOrderNames[f.order.toString()][gender]]

    if (f.twin === 1) {
      const ata = gender === 'Feminine' ? 'Ataa' : selectRandomElement(['Ata', 'Atta'])
      names.push(`${ata} Panyin`)
    } else if (f.twin === 2) {
      const ata = gender === 'Feminine' ? 'Ataa' : selectRandomElement(['Ata', 'Atta'])
      const kakra = selectRandomElement(['Kakraba', 'Kakra', 'Obuom'])
      names.push(`${ata} ${kakra}`)
    } else if (b.special && b.special in circumstanceNames) {
      names.push(circumstanceNames[b.special][gender])
    }

    names.push(f.name)

    return [new AkanPersonalName({
      gender,
      personal,
      full: names.join(' ')
    })]
  }
}

export default AkanPersonalName
