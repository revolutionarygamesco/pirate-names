import check from './check.ts'

const pickTwin = async (
  twinBirthsPer100: number = 1
): Promise<1 | 2 | false> => {
  if (await check('1d100', r => r > twinBirthsPer100)) return false
  const isFirst = await check('1d20', r => r <= 10)
  return isFirst ? 1 : 2
}

export default pickTwin
