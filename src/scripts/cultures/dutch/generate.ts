import { chance } from '@revolutionarygamesco/common'
import { type Gender } from '../../enums/gender.ts'
import generateGivenName from '../../given.ts'
import generateSurname from '../../surname.ts'
import generateDutchPatronym from './patronym.ts'

const generateDutchName = async (
  gender: Gender
): Promise<string> => {
  const given = await generateGivenName('Dutch', gender)
  const surname = chance(1, 2)
    ? await generateSurname('Dutch')
    : await generateDutchPatronym(gender)
  return `${given} ${surname}`
}

export default generateDutchName
