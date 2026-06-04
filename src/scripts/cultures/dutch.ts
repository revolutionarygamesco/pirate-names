import check from '../check.ts'
import generateGivenName from '../given.ts'
import generateSurname from '../surname.ts'

const generateDutchPatronym = async (gender: Gender): Promise<string> => {
  const father = await generateGivenName('Dutch', 'Masculine')
  const suffix = gender === 'Feminine' ? 'dochter' : 'zoon'
  return `${father}s${suffix}`
}

const generateDutchName = async (
  gender: Gender
): Promise<string> => {
  const flip = await check('d20', r => r > 10)
  const given = await generateGivenName('English', gender)
  const surname = flip
    ? await generateSurname('English')
    : await generateDutchPatronym(gender)
  return `${given} ${surname}`
}

export default generateDutchName
