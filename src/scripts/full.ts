import { MODULE_ID } from './settings.ts'
import generateGivenName from './given.ts'
import generateSurname from './surname.ts'
import whisperMessage from './whisper.ts'
import { pickGender } from './gender.ts'
import { pickNationality } from './nationality.ts'
import { localize } from './wrapper.ts'

const jeanable = ['Baptiste', 'Paul', 'Pierre', 'Louis', 'Claude', 'François',
  'Jacques', 'Charles', 'Michel', 'Joseph', 'Marc', 'Luc', 'Philippe',
  'Christophe', 'René', 'Antoine', 'Gabriel']

const check = (threshold: number = 0.5): boolean => Math.random() < threshold

const generateDutchPatronym = async (gender: Gender): Promise<string> => {
  const father = await generateGivenName('Dutch', 'Masculine')
  const suffix = gender === 'Feminine' ? 'dochter' : 'zoon'
  return `${father}s${suffix}`
}

const generateSpanishSurname = async (): Promise<string> => {
  const surname = await generateSurname('Spanish')
  return check(0.7)
    ? surname
    : `${surname}-${await generateSurname('Spanish')}`
}

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

const generateFullSpanishSurname = async (): Promise<string> => {
  const father = await generateSpanishSurname()
  const mother = await generateSpanishSurname()
  return `${father} y ${mother}`
}

const generateName = async (
  nationality?: Nationality,
  gender?: Gender,
  whisper?: string[]
): Promise<string> => {
  const n = nationality ?? await pickNationality()
  const g = gender ?? await pickGender()

  let given = await generateGivenName(n, g)
  let surname = n === 'Spanish'
    ? await generateFullSpanishSurname()
    :await generateSurname(n)

  if (n === 'French' && jeanable.includes(given) && check()) given = `Jean-${given}`
  if (n === 'Dutch' && check()) surname = await generateDutchPatronym(g)

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
