import { MODULE_ID } from './settings.ts'
import { shipNames, pirateNames } from '../ids.ts'
import { localize } from './wrapper.ts'
import { pickColors } from './enums/nationality.ts'
import rollTable from './randomizers/roll-table.ts'
import whisperMessage from './whisper.ts'

const getType = (options?: GenerateShipNameOptions): 'Commercial' | 'Martial' => {
  return options?.martial === true ? 'Martial' : 'Commercial'
}

const generateBaseShipName = async (
  colors: Colors,
  type: 'Martial' | 'Commercial' | 'Religious',
  fallback: string = 'Ranger'
): Promise<string> => {
  const drawn = await rollTable(shipNames[colors][type], { displayChat: false })
  return drawn?.description ?? fallback
}

const generateSpanishShipName = async (options?: GenerateShipNameOptions): Promise<SpanishShipName> => {
  return {
    religious: await generateBaseShipName('Spanish', 'Religious', 'Santa Maria'),
    secular: await generateBaseShipName('Spanish', getType(options), 'Real Felipe')
  }
}

const generatePirateShipName = async (whisper: string[] = []): Promise<string> => {
  const drawn = await rollTable(pirateNames, { displayChat: false })
  const name = drawn?.description ?? 'Revenge'

  if (whisper.length > 0) {
    const flavor = localize(`${MODULE_ID}.message.flavor.ship`, { nation: 'pirate' })
    await whisperMessage(whisper, flavor, name)
  }

  return name
}

const generateShipName = async (options?: GenerateShipNameOptions): Promise<string | SpanishShipName> => {
  const n = options?.colors ?? await pickColors()
  const name = n === 'Spanish'
    ? await generateSpanishShipName(options)
    : await generateBaseShipName(n, getType(options))

  if (options?.whisper) {
    const flavor = localize(`${MODULE_ID}.message.flavor.ship`, { nation: n })
    const str = typeof name === 'string'
      ? name
      : `${name.religious} (${name.secular})`
    await whisperMessage(options.whisper, flavor, str)
  }

  return name
}

export default generateShipName
export { generatePirateShipName }
