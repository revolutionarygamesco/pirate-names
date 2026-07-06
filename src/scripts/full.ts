import { MODULE_ID } from './settings.ts'
import generateAkanName from './cultures/akan.ts'
import generateDutchName from './cultures/dutch.ts'
import generateEnglishName from './cultures/english.ts'
import generateFrenchName from './cultures/french.ts'
import generateIrishName from './cultures/irish.ts'
import generatePortugueseName from './cultures/portuguese.ts'
import generateScottishName from './cultures/scottish.ts'
import generateSpanishName from './cultures/spanish.ts'
import generateWelshName from './cultures/welsh.ts'
import whisperMessage from './whisper.ts'
import { pickGender } from './gender.ts'
import { pickNationality } from './nationality.ts'
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
