import { scopeLocalizer, whisper as whisperMessage } from '@revolutionarygamesco/common-foundryvtt'
import { MODULE_ID } from './settings.ts'
import Ship, { type ShipParams } from './classes/ship.ts'

const generateShipName = async (
  params?: Partial<ShipParams>,
  whisper?: string[]
): Promise<Record<string, string>> => {
  const ship = await Ship.generate(params)
  if (!whisper) return ship.names

  const t = scopeLocalizer([MODULE_ID, 'message'].join('.'))
  const speaker = t(['speaker'])
  const flavor = t(['flavor', 'ship'], { nation: ship.colors, role: ship.role.toLowerCase() })
  const content = t(['ship'], {
    name: ship.toString(),
    src: `modules/${MODULE_ID}/images/${ship.colors.toLowerCase()}.webp`,
    alt: ship.colors
  })

  await whisperMessage({ speaker, flavor, content, recipients: whisper })
  return ship.names
}

export default generateShipName
