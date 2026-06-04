import generateGivenName from '../given.ts'
import generateSurname from '../surname.ts'

const generateBasicName = async (
  nationality: Nationality,
  gender: Gender
): Promise<string> => {
  const given = await generateGivenName(nationality, gender)
  const surname = await generateSurname(nationality)
  return `${given} ${surname}`
}

export default generateBasicName
