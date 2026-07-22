import { whisper as whisperMessage } from '@revolutionarygamesco/common-foundryvtt'
import { MODULE_ID } from './settings.ts'
import generateAkanName from './cultures/akan/generate.ts'
import generateBantuName from './cultures/bantu/generate.ts'
import generateDutchName from './cultures/dutch/generate.ts'
import generateEnglishName from './cultures/english/generate.ts'
import generateFonName from './cultures/fon/generate.ts'
import generateFrenchName from './cultures/french/generate.ts'
import generateIgboName from './cultures/igbo/generate.ts'
import generateIrishName from './cultures/irish/generate.ts'
import generateKalinagoName from './cultures/kalinago/generate.ts'
import generateMandinkaName from './cultures/mandinka/generate.ts'
import generateMiskitoName from './cultures/miskito/generate.ts'
import generatePortugueseName from './cultures/portuguese/generate.ts'
import generateScottishName from './cultures/scottish/generate.ts'
import generateSpanishName from './cultures/spanish/generate.ts'
import generateTainoName from './cultures/taino/generate.ts'
import generateWelshName from './cultures/welsh/generate.ts'
import generateYorubaName from './cultures/yoruba/generate.ts'
import { selectRandomGender, type Gender } from './types/enums/gender.ts'
import { selectRandomNationality, type Nationality } from './types/enums/nationality.ts'

type Generator = (
  gender: Gender,
  circumstances?: Partial<BirthCircumstances>
) => Promise<string>

const generateName = async (
  nationality?: Nationality,
  gender?: Gender,
  whisper?: string[],
  circumstances?: BirthCircumstances
): Promise<string> => {
  const n = nationality ?? await selectRandomNationality()
  const g = gender ?? selectRandomGender()

  const generator: Record<Nationality, Generator> = {
    Akan: generateAkanName,
    Bantu: generateBantuName,
    Dutch: generateDutchName,
    English: generateEnglishName,
    Fon: generateFonName,
    French: generateFrenchName,
    Igbo: generateIgboName,
    Irish: generateIrishName,
    Kalinago: generateKalinagoName,
    Mandinka: generateMandinkaName,
    Miskito: generateMiskitoName,
    Portuguese: generatePortugueseName,
    Scottish: generateScottishName,
    Spanish: generateSpanishName,
    Taíno: generateTainoName,
    Welsh: generateWelshName,
    Yoruba: generateYorubaName
  }

  const name = (await generator[n](g, circumstances))
    .replace(/<[^>]*>/g, '')

  if (whisper) {
    const flavor = game.i18n.localize(`${MODULE_ID}.message.flavor.full`, { gender: g.toLocaleLowerCase(), nation: n })
    await whisperMessage({ recipients: whisper, flavor, content: name })
  }

  return name
}

export default generateName
