import generateGivenName from '../../given.ts'
import generateFullSpanishSurname from './full-sur.ts'

const generateSpanishName = async (
  gender: Gender
): Promise<string> => {
  const given = await generateGivenName('Spanish', gender)
  const surname = await generateFullSpanishSurname()
  return `${given} ${surname}`
}

export default generateSpanishName
