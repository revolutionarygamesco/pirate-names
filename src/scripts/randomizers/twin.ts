import { chance } from '@revolutionarygamesco/common'

const pickTwin = (
  twinBirthsPer100: number = 1
): 1 | 2 | false => {
  if (!chance(twinBirthsPer100, 100)) return false
  return chance(1, 2) ? 1 : 2
}

export default pickTwin
