import { otherNames } from '../../ids.ts'
import { pickWeekday } from '../weekday.ts'
import check from '../check.ts'
import roll from '../roll.ts'
import rollTable from '../roll-table.ts'

const birthOrderNames: Record<string, Record<Gender, string>> = {
  '1': {
    Masculine: 'Píèsíe',
    Feminine: 'Píèsíe'
  },
  '2': {
    Masculine: 'Mǎnu',
    Feminine: 'Máanu'
  },
  '3': {
    Masculine: 'Meńsã́',
    Feminine: 'Mánsã'
  },
  '4': {
    Masculine: 'Anan',
    Feminine: 'Anané'
  },
  '5': {
    Masculine: 'Núm',
    Feminine: 'Anúm'
  },
  '6': {
    Masculine: 'Esĩã́',
    Feminine: 'Esĩã́'
  },
  '7': {
    Masculine: 'Esuón',
    Feminine: 'Nsṍwaa'
  },
  '8': {
    Masculine: 'Bótwe',
    Feminine: 'Bótwe'
  },
  '9': {
    Masculine: 'Ákron',
    Feminine: 'Nkróma'
  },
  '10': {
    Masculine: 'Badú',
    Feminine: 'Badúwaa'
  },
  '11': {
    Masculine: 'Dúkũ',
    Feminine: 'Dúkũ'
  },
  '12': {
    Masculine: 'Dúnu',
    Feminine: 'Dúnu'
  },
  '13': {
    Masculine: 'Adusa',
    Feminine: 'Adusa'
  },
  'last': {
    Masculine: 'Kaakyire',
    Feminine: 'Kaakyire'
  }
}

const circumstanceNames: Record<string, Record<Gender, string>> = {
  sickly: {
    Masculine: 'Nyaméama',
    Feminine: 'Nyaméama'
  },
  field: {
    Masculine: 'Efum',
    Feminine: 'Efum'
  },
  war: {
    Masculine: 'Bekṍe',
    Feminine: 'Bedíàkṍ'
  },
  road: {
    Masculine: 'Ɔkwán',
    Feminine: 'Ɔkwán'
  },
  fatherless: {
    Masculine: 'Antó',
    Feminine: 'Antó'
  },
  happy: {
    Masculine: 'Afriyie',
    Feminine: 'Afriyie'
  },
  loves: {
    Masculine: 'Adofo',
    Feminine: 'Adofo'
  },
  great: {
    Masculine: 'Agyenim',
    Feminine: 'Agyenim'
  },
  forceful: {
    Masculine: 'Kumi',
    Feminine: 'Kumi'
  }
}

const pickFamilySize = async (): Promise<number> => {
  const familySizeRoll = await roll('1d100')
  const familySizeBands: Array<{ min: number, max: number, size: number }> = [
    { min: 1, max: 1, size: 1 },
    { min: 2, max: 3, size: 2 },
    { min: 4, max: 8, size: 3 },
    { min: 9, max: 16, size: 4 },
    { min: 17, max: 28, size: 5 },
    { min: 29, max: 42, size: 6 },
    { min: 43, max: 58, size: 7 },
    { min: 59, max: 71, size: 8 },
    { min: 72, max: 81, size: 9 },
    { min: 82, max: 89, size: 10 },
    { min: 90, max: 94, size: 11 },
    { min: 95, max: 98, size: 12 },
    { min: 99, max: 100, size: 13 }
  ]

  for (const { min, max, size } of familySizeBands) {
    if (min <= familySizeRoll && max >= familySizeRoll) return size
  }

  return 1
}

const pickBirthOrder = async (): Promise<number | 'last'> => {
  const familySize = await pickFamilySize()
  const order = Math.floor(Math.random() * familySize) + 1
  return familySize === order && familySize > 1 ? 'last' : order
}

const pickTwin = async (): Promise<1 | 2 | false> => {
  if (await check('1d100', r => r > 3)) return false
  const isFirst = await check('1d20', r => r <= 10)
  return isFirst ? 1 : 2
}

const pickCircumstance = async (): Promise<string | null> => {
  const circumstanceRoll = await roll('1d100')
  const circumstanceBands: Array<{ min: number, max: number, circumstance: string | null }> = [
    { min: 1, max: 3, circumstance: 'sickly' },
    { min: 4, max: 6, circumstance: 'field' },
    { min: 7, max: 9, circumstance: 'war ' },
    { min: 10, max: 12, circumstance: 'road' },
    { min: 13, max: 15, circumstance: 'fatherless' },
    { min: 16, max: 18, circumstance: 'happy' },
    { min: 19, max: 21, circumstance: 'loves' },
    { min: 22, max: 22, circumstance: 'great' },
    { min: 23, max: 24, circumstance: 'forceful' },
    { min: 25, max: 100, circumstance: null },
  ]

  for (const { min, max, circumstance } of circumstanceBands) {
    if (min >= circumstanceRoll && max <= circumstanceRoll) return circumstance
  }

  return null
}

const generateWeekdayName = async (weekday: Weekday, gender: Gender): Promise<string> => {
  const drawn = await rollTable(otherNames.Akan.WeekdayNames[weekday][gender], { displayChat: false })
  return drawn?.description ?? (gender === 'Feminine' ? 'Akosua' : 'Kwasi')
}

const generateAsanteSurname = async (): Promise<string> => {
  const drawn = await rollTable(otherNames.Akan.Surnames, { displayChat: false })
  return drawn?.description ?? 'Mensah'
}

const generateAkanName = async (
  gender: Gender,
  circumstances?: Partial<BirthCircumstances>
): Promise<string> => {
  const weekday = circumstances?.weekday ?? await pickWeekday()
  const order = circumstances?.order ?? await pickBirthOrder()
  const twin = circumstances?.twin ?? await pickTwin()
  const circumstance = circumstances?.special ?? await pickCircumstance()

  const names: string[] = [
    await generateWeekdayName(weekday, gender),
    birthOrderNames[order.toString()][gender]
  ]

  if (twin === 1) {
    names.push(gender === 'Feminine' ? 'Ataá Panyin' : 'Attá Panyin')
  } else if (twin === 2) {
    names.push(gender === 'Feminine' ? 'Ataá Kakraba' : 'Attá Kakra')
  } else if (circumstance && circumstance in circumstanceNames) {
    names.push(circumstanceNames[circumstance][gender])
  }

  names.push(await generateAsanteSurname())

  return names.join(' ')
}

export default generateAkanName
