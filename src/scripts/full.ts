import { MODULE_ID } from './settings.ts'
import generateAkanName from './cultures/akan/generate.ts'
import generateBantuName from './cultures/bantu/generate.ts'
import generateDutchName from './cultures/dutch/generate.ts'
import generateEnglishName from './cultures/english/generate.ts'
import generateFrenchName from './cultures/french/generate.ts'
import generateIrishName from './cultures/irish/generate.ts'
import generatePortugueseName from './cultures/portuguese/generate.ts'
import generateScottishName from './cultures/scottish/generate.ts'
import generateSpanishName from './cultures/spanish/generate.ts'
import generateWelshName from './cultures/welsh/generate.ts'
import whisperMessage from './whisper.ts'
import { pickGender } from './enums/gender.ts'
import { pickNationality } from './enums/nationality.ts'
import { localize } from './wrapper.ts'

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
  const n = nationality ?? await pickNationality()
  const g = gender ?? await pickGender()

  const generator: Record<string, Generator> = {
    Akan: generateAkanName,
    Bantu: generateBantuName,
    Dutch: generateDutchName,
    English: generateEnglishName,
    French: generateFrenchName,
    Irish: generateIrishName,
    Portuguese: generatePortugueseName,
    Scottish: generateScottishName,
    Spanish: generateSpanishName,
    Welsh: generateWelshName
  }

  const name = (await generator[n](g, circumstances))
    .replace(/<[^>]*>/g, '')

  if (whisper) {
    const flavor = localize(`${MODULE_ID}.message.flavor.full`, { gender: g.toLocaleLowerCase(), nation: n })
    await whisperMessage(whisper, flavor, name)
  }

  return name
}

export default generateName
