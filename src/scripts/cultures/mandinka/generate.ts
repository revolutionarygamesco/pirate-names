import { type Gender } from '../../enums/gender.ts'
import selectRandomMandinkaCaste from './caste.ts'
import generateGivenName from '../../given.ts'
import generateJamu from './jamu.ts'

const generateMandinkaName = async (
  gender: Gender,
  circumstances?: Partial<BirthCircumstances>
): Promise<string> => {
  const caste = circumstances?.caste ?? await selectRandomMandinkaCaste()
  const given = await generateGivenName('Mandinka', gender)
  const jamu = await generateJamu(caste)
  return `${given} ${jamu}`
}

export default generateMandinkaName
