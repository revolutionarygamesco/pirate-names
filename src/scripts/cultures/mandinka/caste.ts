import roll from '../../randomizers/roll.ts'

const pickCaste = async (): Promise<string> => {
  const r = await roll('1d100')
  if (r === 100) return 'Jakhanke'
  if (r === 99) return 'Jali'
  if (r === 98) return 'Nyamakala'
  return 'Foro'
}

export default pickCaste
