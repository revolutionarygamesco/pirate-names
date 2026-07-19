export const COMPENDIUM_PREFIX = 'Compendium.revolutionary-piratenames.rolltables.RollTable'

const getRollTableUUID = (id: string): string => {
  return [COMPENDIUM_PREFIX, id].join('.')
}

export default getRollTableUUID
