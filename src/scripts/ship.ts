import { isString } from '@revolutionarygamesco/common'
import { whisper as whisperMessage, drawGuarded } from '@revolutionarygamesco/common-foundryvtt'
import { MODULE_ID } from './settings.ts'
import { shipNames, pirateNames } from '../ids.ts'
import { selectRandomColors, type Colors } from './types/enums/colors.ts'

const getType = (
  options?: GenerateShipNameOptions
): 'Commercial' | 'Martial' => {
  return options?.martial === true ? 'Martial' : 'Commercial'
}

const generateBaseShipName = async (
  colors: Colors,
  type: 'Martial' | 'Commercial' | 'Religious',
  fallback: string = 'Ranger'
): Promise<string> => {
  return await drawGuarded(shipNames[colors][type], isString, fallback)
}

const generateSpanishShipName = async (
  options?: GenerateShipNameOptions
): Promise<SpanishShipName> => {
  return {
    religious: await generateBaseShipName('Spanish', 'Religious', 'Santa Maria'),
    secular: await generateBaseShipName('Spanish', getType(options), 'Real Felipe')
  }
}

const generatePirateShipName = async (
  whisper: string[] = []
): Promise<string> => {
  const name = await drawGuarded(pirateNames, isString, 'Revenge')

  if (whisper.length > 0) {
    const flavor = game.i18n.localize(`${MODULE_ID}.message.flavor.ship`, { nation: 'pirate' })
    await whisperMessage({ recipients: whisper, flavor, content: name })
  }

  return name
}

const generateShipName = async (
  options?: GenerateShipNameOptions
): Promise<string | SpanishShipName> => {
  const n: Colors = options?.colors ?? await selectRandomColors()
  const name = n === 'Spanish'
    ? await generateSpanishShipName(options)
    : await generateBaseShipName(n, getType(options))

  if (options?.whisper) {
    const flavor = game.i18n.localize(`${MODULE_ID}.message.flavor.ship`, { nation: n })
    const str = typeof name === 'string'
      ? name
      : `${name.religious} (${name.secular})`
    await whisperMessage({ recipients: options.whisper, flavor, content: str })
  }

  return name
}

export default generateShipName
export { generatePirateShipName }
