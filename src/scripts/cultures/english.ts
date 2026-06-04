import generateGivenName from '../given.ts'
import generateSurname from '../surname.ts'

const generateEnglishName = async (
  gender: Gender
): Promise<string> => {
  const given = await generateGivenName('English', gender)
  const surname = await generateSurname('English')
  return `${given} ${surname}`
}

export default generateEnglishName
