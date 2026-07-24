import { selectRandomNationality, type Nationality } from './types/enums/nationality.ts'
import sendMessage from './message.ts'

import PersonalName, { type PersonalNameParams } from './classes/personal-names/base.ts'
import BirthContext from './classes/birth/base.ts'

import AkanPersonalName from './classes/personal-names/akan.ts'
import BantuPersonalName from './classes/personal-names/bantu.ts'
import DutchPersonalName from './classes/personal-names/dutch.ts'
import EnglishPersonalName from './classes/personal-names/english.ts'
import FonPersonalName from './classes/personal-names/fon.ts'
import FrenchPersonalName from './classes/personal-names/french.ts'
import IgboPersonalName from './classes/personal-names/igbo.ts'
import IrishPersonalName from './classes/personal-names/irish.ts'
import KalinagoPersonalName from './classes/personal-names/kalinago.ts'
import MandinkaPersonalName from './classes/personal-names/mandinka.ts'
import MiskitoPersonalName from './classes/personal-names/miskito.ts'
import PortuguesePersonalName from './classes/personal-names/portuguese.ts'
import ScottishPersonalName from './classes/personal-names/scottish.ts'
import SpanishPersonalName from './classes/personal-names/spanish.ts'
import TainoPersonalName from './classes/personal-names/taino.ts'
import WelshPersonalName from './classes/personal-names/welsh.ts'
import YorubaPersonalName from './classes/personal-names/yoruba.ts'

export interface PersonalNameGenerator {
  generate (data?: Partial<PersonalNameParams>, context?: BirthContext): Promise<PersonalName[]>
}

const generators: Record<Nationality, PersonalNameGenerator> = {
  Akan: AkanPersonalName,
  Bantu: BantuPersonalName,
  Dutch: DutchPersonalName,
  English: EnglishPersonalName,
  Fon: FonPersonalName,
  French: FrenchPersonalName,
  Igbo: IgboPersonalName,
  Irish: IrishPersonalName,
  Kalinago: KalinagoPersonalName,
  Mandinka: MandinkaPersonalName,
  Miskito: MiskitoPersonalName,
  Portuguese: PortuguesePersonalName,
  Scottish: ScottishPersonalName,
  Spanish: SpanishPersonalName,
  Taíno: TainoPersonalName,
  Welsh: WelshPersonalName,
  Yoruba: YorubaPersonalName
}

const generatePersonalName = async (
  params?: Partial<PersonalNameParams>,
  whisper?: string[]
): Promise<PersonalName[]> => {
  const n = params?.nationality ?? await selectRandomNationality()
  const names = await generators[n].generate(params)

  if (whisper) await sendMessage(names, whisper)
  return names
}

export default generatePersonalName
