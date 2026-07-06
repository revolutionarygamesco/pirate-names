import check from '../../randomizers/check.ts'
import generateGivenName from '../../given.ts'
import generateSurname from '../../surname.ts'
import generateDutchPatronym from './patronym.ts'

const generateDutchName = async (
  gender: Gender
): Promise<string> => {
  const flip = await check('d20', r => r > 10)
  const given = await generateGivenName('Dutch', gender)
  const surname = flip
    ? await generateSurname('Dutch')
    : await generateDutchPatronym(gender)
  return `${given} ${surname}`
}

export default generateDutchName
