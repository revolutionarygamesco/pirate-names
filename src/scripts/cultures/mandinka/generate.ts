import { type Gender } from '../../enums/gender.ts'
import pickCaste from './caste.ts'
import generateGivenName from '../../given.ts'
import generateJamu from './jamu.ts'

const generateMandinkaName = async (
  gender: Gender,
  circumstances?: Partial<BirthCircumstances>
): Promise<string> => {
  const caste = circumstances?.caste ?? await pickCaste()
  const given = await generateGivenName('Mandinka', gender)
  const jamu = await generateJamu(caste)
  return `${given} ${jamu}`
}

export default generateMandinkaName
