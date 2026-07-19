import { selectRandomBetween } from '@revolutionarygamesco/common'

const pickSpecialNames = (): 'santu' | 'initiation' | null => {
  const r = selectRandomBetween(1, 20)
  if (r < 11) return 'santu'
  if (r > 15) return 'initiation'
  return null
}

export default pickSpecialNames
