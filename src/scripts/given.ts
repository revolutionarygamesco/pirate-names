import { retryUntil } from '@revolutionarygamesco/common'
import { whisper as whisperMessage, drawDescription } from '@revolutionarygamesco/common-foundryvtt'
import { MODULE_ID } from './settings.ts'
import { givenNames } from '../ids.ts'
import { selectRandomGender, type Gender } from './types/enums/gender.ts'
import { selectRandomNationality, type Nationality } from './types/enums/nationality.ts'

const generateGivenName = async (
  nationality?: Nationality,
  gender?: Gender,
  whisper?: string[]
): Promise<string> => {

  const n: Nationality = nationality ?? await retryUntil(selectRandomNationality, n => n in givenNames, { fallback: 'Spanish' })
  const g: Gender = gender ?? selectRandomGender()
  const name = await drawDescription(givenNames[n][g]) ?? 'John'

  if (whisper) {
    const flavor = game.i18n.localize(`${MODULE_ID}.message.flavor.given`, { gender: g.toLocaleLowerCase(), nation: n })
    await whisperMessage({ recipients: whisper, flavor, content: name })
  }

  return name
}

export default generateGivenName
