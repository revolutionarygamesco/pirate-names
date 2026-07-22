import { type Gender } from '../../types/enums/gender.ts'
import generateGivenName from '../../given.ts'

const generateDutchPatronym = async (
  gender: Gender
): Promise<string> => {
  const father = await generateGivenName('Dutch', 'Masculine')
  const suffix = gender === 'Feminine' ? 'dochter' : 'zoon'
  return `${father}s${suffix}`
}

export default generateDutchPatronym
