import { MODULE_ID } from './settings.ts'
import { givenNames } from '../ids.ts'
import { pickGender } from './enums/gender.ts'
import rollTable from './randomizers/roll-table.ts'
import whisperMessage from './whisper.ts'
import { pickNationality } from './enums/nationality.ts'
import { localize } from './wrapper.ts'

const generateGivenName = async (
  nationality?: Nationality,
  gender?: Gender,
  whisper?: string[]
): Promise<string> => {
  let n = nationality
  while (!n) {
    n = await pickNationality()
    if (!(n in givenNames)) n = undefined
  }

  const g = gender ?? pickGender()
  const drawn = await rollTable(givenNames[n][g], { displayChat: false })
  const name = drawn?.description ?? 'John'

  if (whisper) {
    const flavor = localize(`${MODULE_ID}.message.flavor.given`, { gender: g.toLocaleLowerCase(), nation: n })
    await whisperMessage(whisper, flavor, name)
  }

  return name
}

export default generateGivenName
