import { MODULE_ID } from './settings.ts'
import generateGivenName from './given.ts'
import generateSurname from './surname.ts'
import generateDutchName from './cultures/dutch.ts'
import generateEnglishName from './cultures/english.ts'
import generateFrenchName from './cultures/french.ts'
import generatePortugueseName from './cultures/portuguese.ts'
import generateSpanishName from './cultures/spanish.ts'
import whisperMessage from './whisper.ts'
import { pickGender } from './gender.ts'
import { pickNationality } from './nationality.ts'
import { localize } from './wrapper.ts'

const separateAnglicizedIrishName = (str: string): { gaelic: string, anglicization: string } => {
  const match = str.match(/(.*?) \((.*?)\)/)
  const gaelic = match ? match[1] : str
  const anglicization = match ? match[2] : str
  return { gaelic, anglicization }
}

const renderGaelicName = (given: string, surname: string): string => {
  const separatedGiven = separateAnglicizedIrishName(given)
  const separatedSurname = separateAnglicizedIrishName(surname)
  const gaelic = `${separatedGiven.gaelic} ${separatedSurname.gaelic}`
  const anglicization = `${separatedGiven.anglicization} ${separatedSurname.anglicization}`
  return gaelic === anglicization
    ? gaelic
    : `${gaelic} (${anglicization})`
}

const generateName = async (
  nationality?: Nationality,
  gender?: Gender,
  whisper?: string[]
): Promise<string> => {
  const n = nationality ?? await pickNationality()
  const g = gender ?? await pickGender()

  if (n === 'Dutch') return generateDutchName(g)
  if (n === 'English') return generateEnglishName(g)
  if (n === 'French') return generateFrenchName(g)
  if (n === 'Portuguese') return generatePortugueseName(g)
  if (n === 'Spanish') return generateSpanishName(g)

  let given = await generateGivenName(n, g)
  let surname = await generateSurname(n)

  let name = n === 'Irish'
    ? renderGaelicName(given, surname)
    : `${given} ${surname}`
  name = name.replace(/<[^>]*>/g, '')

  if (whisper) {
    const flavor = localize(`${MODULE_ID}.message.flavor.full`, { gender: g.toLocaleLowerCase(), nation: n })
    await whisperMessage(whisper, flavor, name)
  }

  return name
}

export default generateName
