import { isString, retryUntil } from '@revolutionarygamesco/common'
import { whisper as whisperMessage, drawGuarded } from '@revolutionarygamesco/common-foundryvtt'
import { MODULE_ID } from './settings.ts'
import { surnames } from '../ids.ts'
import { selectRandomNationality, type Nationality } from './types/enums/nationality.ts'

const generateSurname = async (
  nationality?: Nationality,
  whisper?: string[]
): Promise<string> => {
  const n: Nationality = nationality ?? await retryUntil(selectRandomNationality, n => n in surnames, { fallback: 'Spanish' })
  const name = await drawGuarded(surnames[n], isString, 'Smith')

  if (whisper) {
    const flavor = game.i18n.localize(`${MODULE_ID}.message.flavor.surname`, { nation: n })
    await whisperMessage({ recipients: whisper, flavor, content: name })
  }

  return name
}

export default generateSurname
