import { type Weekday } from '../../enums/weekday.ts'
import { type Gender } from '../../enums/gender.ts'

const weekdayNames: Record<Weekday, Record<Gender, string[]>> = {
  Sunday: {
    Masculine: ['Kossi', 'Kouessi', 'Kwasi'],
    Feminine: ['Kossiwa', 'Kouessiba', 'Kossivi']
  },
  Monday: {
    Masculine: ['Kodjo', 'Codjo', 'Kudzo'],
    Feminine: ['Adjo', 'Adjovi', 'Adjowa']
  },
  Tuesday: {
    Masculine: ['Komlan', 'Kobla', 'Kwabla'],
    Feminine: ['Abla', 'Ablavi', 'Ablawa']
  },
  Wednesday: {
    Masculine: ['Kokou', 'Koku', 'Kwaku'],
    Feminine: ['Akou', 'Akouvi', 'Akwa']
  },
  Thursday: {
    Masculine: ['Yao', 'Yawo', 'Yaovi'],
    Feminine: ['Yawa', 'Yaa', 'Ayaba']
  },
  Friday: {
    Masculine: ['Kofi', 'Koffi', 'Kofivi'],
    Feminine: ['Afi', 'Afiavi', 'Afiwa']
  },
  Saturday: {
    Masculine: ['Komi', 'Kwami', 'Komivi'],
    Feminine: ['Ami', 'Ama', 'Amivi']
  }
}

export default weekdayNames
