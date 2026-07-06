import generateGivenName from '../../given.ts'
import generateSurname from '../../surname.ts'
import renderGaelicName from './render.ts'

const generateIrishName = async (
  gender: Gender
): Promise<string> => {
  const given = await generateGivenName('Irish', gender)
  const surname = await generateSurname('Irish')
  return renderGaelicName(given, surname)
}

export default generateIrishName
