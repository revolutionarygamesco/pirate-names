import { type Gender } from '../../types/enums/gender.ts'
import generateGivenName from '../../given.ts'

const generateKalinagoName = async (
  gender: Gender
): Promise<string> => {
  const personal = await generateGivenName('Kalinago', gender)
  const father = await generateGivenName('Kalinago', 'Masculine')
  return `${personal} ${father}`
}

export default generateKalinagoName
