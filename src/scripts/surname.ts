import { MODULE_ID } from './settings.ts'
import { surnames } from '../ids.ts'
import rollTable from './randomizers/roll-table.ts'
import whisperMessage from './whisper.ts'
import { pickNationality } from './enums/nationality.ts'
import { localize } from './wrapper.ts'

const generateSurname = async (
  nationality?: Nationality,
  whisper?: string[]
): Promise<string> => {
  let n = nationality
  while (!n) {
    n = await pickNationality()
    if (!(n in surnames)) n = undefined
  }

  const drawn = await rollTable(surnames[n], { displayChat: false })
  const name = drawn?.description ?? 'Smith'

  if (whisper) {
    const flavor = localize(`${MODULE_ID}.message.flavor.surname`, { nation: n })
    await whisperMessage(whisper, flavor, name)
  }

  return name
}

export default generateSurname
