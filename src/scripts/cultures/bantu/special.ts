import roll from '../../randomizers/roll.ts'

const pickSpecialNames = async (): Promise<'santu' | 'initiation' | null> => {
  const r = await roll('d20')
  if (r < 11) return 'santu'
  if (r > 15) return 'initiation'
  return null
}

export default pickSpecialNames
