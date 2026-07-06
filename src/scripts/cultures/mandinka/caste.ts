import roll from '../../randomizers/roll.ts'

const pickCaste = async (): Promise<string> => {
  const r = await roll('1d100')
  if (r === 100) return 'Marabout'
  if (r === 99) return 'Griot'
  if (r === 98) return 'Blacksmith'
  return 'Foro'
}

export default pickCaste
